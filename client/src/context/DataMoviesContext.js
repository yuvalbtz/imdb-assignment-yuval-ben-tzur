import React, {createContext, useState, useEffect} from 'react'
import {findQmonth} from '../util/findQmonth'

export const MoviesDataContext = createContext()


export default function DataMoviesContext(props){
    
    const [moviesList, setMoviesList] = useState([])
    
    async function getData(){
        await fetch("http://localhost:3000/")
       .then(res => res.json())
       .then(data => setMoviesList(data))
       .catch(err => console.log(err))
    }
     
    useEffect(() => {
       getData()
    },[])

   
const sortByCWG = (a,b) => a.CWGnumber - b.CWGnumber
const sortByROI = (a,b) => parseFloat(a.ROI) - parseFloat(b.ROI)
const sortByX = (a,b) => parseFloat(a.x) - parseFloat(b.x) //when x should be a Number
     
//movie length name   
function lengthMovieDiagram(){
const data = [];
    moviesList.sort(sortByCWG).map(movie => 
    data.push(
        {
        name:movie.title,
        x:movie.title.split("(")[0].trim().length.toString()+" len",
        avgRainfall:isNaN(movie.CWGnumber) ? "Not Found" : movie.CWGnumber
        }
        )
    )
//console.log("length name",data)
return data.sort(sortByX)  
}

//rating diagram
function ratingDataDiagram(){
const data = [];
    moviesList.sort(sortByROI).map(movie => 
    data.push(
        {
        name:movie.title,
        x:movie.rating + '/10',
        avgRainfall:isNaN(parseFloat(movie.ROI)) ? "Not Found" : parseFloat(movie.ROI)
        }
        )
    )
//console.log("rating diagram",data)
return data.sort(sortByX)
}

//release Quarter diagram
function releaseQuarterDiagram(){
const data = []
    moviesList.map(movie => 
    data.push(
        {
        name:movie.title,
        x:findQmonth(movie.releaseDate.split(" ")[1]) === "Not Found" ? 
        findQmonth(movie.releaseDate.split(" ")[0]) : findQmonth(movie.releaseDate.split(" ")[1]),// Q1,Q2,Q3,Q4
        avgRainfall:isNaN(parseFloat(movie.ROI)) ? "Not Found" : parseFloat(movie.ROI)
        }
        )
    )
//console.log("release Quarter diagram",data)
 return data.sort((a, b) => a.x.split("")[1]  - b.x.split("")[1])
}

// Runtime diagram
function runtimeMovieDiagram() {
 const data = []
    moviesList.map(movie => 
    data.push(
        {
            name:movie.title,
            x:movie.movieDuration+" min",
            avgRainfall:isNaN(parseFloat(movie.ROI)) ? "Not Found" : parseFloat(movie.ROI)
            }
        )
    )
 //console.log("Runtime diagram",data)
  return data.sort(sortByX)
}



 // Type diagram
 function typeDiagram(){
 const data = []
    moviesList.map(movie => 
    data.push(
        {
        name:movie.title,
        x:movie.movieCategory,
        avgRainfall:isNaN(parseFloat(movie.ROI)) ? "Not Found" : parseFloat(movie.ROI)
        }
        )
    )
//console.log("Type diagram",data)
 return data
}


// Numbers of Types diagram
function NumbertypesDiagram(){
    const data = []
       moviesList.map(movie => 
       data.push(
           {
           name:movie.title,
           x:movie.movieCategory.split(",").length.toString()+" genres",
           avgRainfall:isNaN(parseFloat(movie.ROI)) ? "Not Found" : parseFloat(movie.ROI)
           }
           )
       )
   //console.log("Numbers of Types diagram",data)
    return data.sort((a,b) => parseFloat(a.x.split("")[0]) - parseFloat(b.x.split("")[0]))
   }





    return (<MoviesDataContext.Provider value={{
             lengthMovieDiagram,
             ratingDataDiagram,
             releaseQuarterDiagram,
             runtimeMovieDiagram,
             typeDiagram,
             NumbertypesDiagram}} 
             {...props}
             />);
}



 