//Key: f52809e5
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=f52809e5

const MovieList = document.querySelector(".movies__list")
const searchForm = document.getElementById("search__form")
const movieInput = document.getElementById("movie__input")
let top6 = []

searchForm.addEventListener("submit", (event) => {
    (event).preventDefault() //stops from reloading
    const query = movieInput.value //gets value from movie__input
    if (query) {
        console.log("searching for: ", query)
        getMovieData(query) //calls getmoviedata function.
    }
})


async function getMovieData(query) { //function accepts "query" input ^
    MovieList.innerHTML = `<div class="loading__screen">
        <i class="fa-solid fa-spinner"></i>
        <p class="loading__text">Searching for ${query}</p>
    </div>` //sets html to loading screen
    try {
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=f52809e5`)
    // ^ sets "repsonse" to the answer from API
    const data = await response.json() //formats into html
    console.log("OMDB API Returned")
    
    if (data.Search) { //If the previous line has been returned..
        top6 = data.Search.slice(0, 6) //slice data to only 6
        const html = top6.map(movieHTML).join("") //replaces html w/ map
        let showMoreBtn = "" //showmore btn is blank... OR

        if (data.Search.length > 6) { //shows btn if >6
            showMoreBtn = `
            <div class="show__more--container">
                <button class="show__more">Show More</button>
            </div>`
        }

        console.log("Generated HTML:", html)
        MovieList.innerHTML = html + showMoreBtn //adds btn to html
    } else {
        MovieList.innerHTML = "<p>No results found</p>" 
    }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
}

function truncateTitle(title, maxLength) { //truncating title
    return title.length > maxLength
    ? title.slice(0, maxLength) + "..."
    : title
}

function filterMovies(event) { //aformentioned in html
    const sortOrder = event.target.value //gets values (newest to oldest)
    const sortedMovies = top6.slice()

    if (sortOrder === "NEWEST") {
        sortedMovies.sort((a, b) => {
            const yearA = parseInt(a.Year) //string to #
            const yearB = parseInt(b.Year) //string to #
            return yearB - yearA
        })
    } else if (sortOrder === "OLDEST") {
        sortedMovies.sort((a, b) => {
            const yearA = parseInt(a.Year) //string to #
            const yearB = parseInt(b.Year) //string to #
            return yearA - yearB
    })
    
    // .sort((a, b) => {
    //     const yearA = parseInt(a.Year)
    //     const yearB = parseInt(b.Year)
    //     console.log(sortOrder)
    //     return sortOrder === "NEWEST" ? yearB - yearA : yearA - yearB
        
    }
    const html = sortedMovies.map(movieHTML).join("")
    MovieList.innerHTML = html //updates html
}

function movieHTML(movie) { //movie card html
    const trimmedTitle = truncateTitle(movie.Title, 40) //calling function
    return `
    <div class="movie__card">
        <h4 class="movie__title">${trimmedTitle}</h4> 
        <p class="movie__year">${movie.Type}, ${movie.Year}</p>
    </div>`
} 

