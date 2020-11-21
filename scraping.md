title = $('div[class="title_wrapper"] > h1').text().trim()
rating = $('div[class="ratingValue"] > strong > span').text().trim()
releaseDate = $('a[title="See more release dates"]').text().trim()
movieDuration =  $('div[class="txt-block"]').text().split("Runtime:")[1].trim().split(" ")[0]
movieCategory = $('div[class="see-more inline canwrap"] > a').text().trim().split(" ").filter(char => /[zA-Z]/.test(char)).join() 
budgetMovie =  $('div[class="txt-block"]').text().split("Budget:")[1].trim().split(" ")[0]
CWG = $('div[class="txt-block"]').text().split("Cumulative Worldwide Gross:")[1].trim().split(" ")[0]

/////
budgetMovieNumber = $('div[class="txt-block"]').text().split("Budget:")[1].trim().split(" ")[0].trim().split("").filter(c => !isNaN(c)).join("")
CWGnumber = $('div[class="txt-block"]').text().split("Cumulative Worldwide Gross:")[1].trim().split(" ")[0].trim().split("").filter(c => !isNaN(c)).join("")