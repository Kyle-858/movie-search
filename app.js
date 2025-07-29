//Key: f52809e5
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=f52809e5

const MovieList = document.querySelector(".movies__list")
const searchForm = document.getElementById("search__form")
const movieInput = document.getElementById("movie__input")

searchForm.addEventListener("submit", (event) => {
    (event).preventDefault() //stops from reloading
    const query = movieInput.value
    if (query) {
        console.log("searching for: ", query)
        getMovieData(query)
    }
})


async function getMovieData(query) {
    MovieList.innerHTML = `<div class="loading__screen">
        <i class="fa-solid fa-spinner"></i>
        <p class="loading__text">Searching for ${query}</p>
    </div>`
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=f52809e5`)
    const data = await response.json()
    console.log("OMDB API Returned")
    
    if (data.Search) {
        const top6 = data.Search.slice(0, 6)
        const html = top6.map(movieHTML).join("")
        let showMoreBtn = ""

        if (data.Search.length > 6) {
            showMoreBtn = `
            <div class="show__more--container">
                <button class="show__more">Show More</button>
            </div>`
        }

        console.log("Generated HTML:", html)
        MovieList.innerHTML = html + showMoreBtn
    } else {
        MovieList.innerHTML = "<p>No results found</p>"
    }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
}

function truncateTitle(title, maxLength) {
    return title.length > maxLength
    ? title.slice(0, maxLength) + "..."
    : title
}

function movieHTML(movie) {
    const trimmedTitle = truncateTitle(movie.Title, 40)
    return `
    <div class="movie__card">
        <h4 class="movie__title">${trimmedTitle}</h4>
        <p class="movie__year">${movie.Type}, ${movie.Year}</p>
    </div>`
} 

function filterMovies(event) {
    getMovieData(movie.Year)
}