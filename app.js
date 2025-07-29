//Key: f52809e5
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=f52809e5

const MovieList = document.querySelector(".movies__list")
const searchForm = document.getElementById("search__form")
const movieInput = document.getElementById("movie__input")

searchForm.addEventListener("submit", (event) => {
    (event).preventDefault()
    const query = movieInput.value.trim()
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
        console.log("Generated HTML:", html)
        MovieList.innerHTML = html
    } else {
        MovieList.innerHTML = "<p>No results found</p>"
    }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
}

function movieHTML(movie) {
    return `
    <div class="movie__card">
                        <h4 class="movie__title">${movie.Title}</h4>
                        <p class="movie__year">${movie.Year}</p>
                    </div>`
} 
