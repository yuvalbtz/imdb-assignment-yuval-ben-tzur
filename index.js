const express = require("express")
const app = express()

const cors = require("cors")

const cheerio = require("cheerio");

const request = require("request")

const fs = require("fs"); 

const movies = require("./moviesLinks")

const imdbMovies = require("./imdbMovies.json"); // when removing this file don't forget to uncomment this line...

app.use(cors())


app.get("/", (req, res) =>{
      
    res.send(imdbMovies) 
})

const ConverToNumber = (str) => parseInt(str, 10) 

//creating a json file with the movies Data if the file isn't exist
if(!fs.existsSync('./imdbMovies.json')){
    
    (async() => {
        const imdbMovies = [] 
        for(let movie of movies){
    
             await request(movie, (error, response , html) => {
             
             if(!error && response.statusCode == 200){
                 const $ = cheerio.load(html)
                 
                 let title = $('div[class="title_wrapper"] > h1').text().trim()
                 let rating = $('div[class="ratingValue"] > strong > span').text().trim()
                 let releaseDate = $('a[title="See more release dates"]').text().trim()
                 let movieDuration =  $('div[class="txt-block"]').text().split("Runtime:")[1].trim().split(" ")[0]
                 let movieCategory = $('div[class="see-more inline canwrap"] > a').text().trim().split(" ").filter(char => /[zA-Z]/.test(char)).join() 
                 let budgetMovie =  $('div[class="txt-block"]').text().split("Budget:")[1]
                 let CWG = $('div[class="txt-block"]').text().split("Cumulative Worldwide Gross:")[1]
                 let ROI;   
                 
                 let budgetMovieNumber;
                 let CWGnumber;
                 
                 if(budgetMovie === undefined || CWG  === undefined ){
                     budgetMovie = "Not found"
                     CWG = "Not found"
                 
                }else{
                     budgetMovie =  $('div[class="txt-block"]').text().split("Budget:")[1].trim().split(" ")[0].trim() 
                     CWG = $('div[class="txt-block"]').text().split("Cumulative Worldwide Gross:")[1].trim().split(" ")[0]
                     
                     budgetMovieNumber = $('div[class="txt-block"]').text().split("Budget:")[1].trim().split(" ")[0].trim().split("").filter(c => !isNaN(c)).join("")
                     CWGnumber = $('div[class="txt-block"]').text().split("Cumulative Worldwide Gross:")[1].trim().split(" ")[0].trim().split("").filter(c => !isNaN(c)).join("")
                   
                     budgetMovieNumber = ConverToNumber(budgetMovieNumber) 
                     CWGnumber = ConverToNumber(CWGnumber)     
                    
                     ROI = (((CWGnumber-budgetMovieNumber)/budgetMovieNumber)*100).toFixed(2)} //ROI value as percentage
                 
                imdbMovies.push({
                     title,
                     rating,
                     releaseDate,
                     movieDuration,
                     movieCategory,
                     budgetMovie,
                     CWG,
                     ROI,
                     budgetMovieNumber,
                     CWGnumber
                     });
                 
         let data = JSON.stringify(imdbMovies, null, 2);
         fs.writeFile('imdbMovies.json', data, (err) => {
         if (err) throw err;
         console.log('Data written to file successfully!');
         });
             
              }
             
           })
         };
        
    })();  
}else{
     
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`server is running at port: ${port}`))
}










