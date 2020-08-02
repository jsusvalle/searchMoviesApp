//TODO IMPORTS
import { checkLS, addToLocalstorage } from "./localStorage.js";
// import { openModal } from "./main.js";

//* GLOBALS VARIABLES 
const numberFav = document.getElementById('number-fav');
const containerMovies = document.getElementById('movies-container');
const modal = document.getElementById('info-modal');

//* FUNCTIONS 
function checkLocalStorage() {
    let resultLS;
    resultLS = checkLS();
    numberFav.innerText = resultLS.length;

    readToLocalStorage(resultLS);
}

function renderResult(movie) {
    containerMovies.innerHTML +=
        `<div class="movie">
            <div class="img-movie">
                <img src="${movie.Poster}" alt="">
                <button class="view-more" id="${movie.imdbID}">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
            <div class="text">
                <div class="title">
                    <p>${movie.Title}</p>
                </div>
                <p class="year">${movie.Year} - <span class="type">${movie.Type}</span> </p>
            </div>
        </div>`;
}

async function consultApi(idMovie) {
    const response = await fetch(`//www.omdbapi.com/?i=${idMovie}&apikey=1e13fde`);
    const resultMovie = await response.json();
    if (resultMovie.Response === "True") {
        renderResult(resultMovie);
    }
}

function readToLocalStorage(movies) {
    movies.map(movie => consultApi(movie))
}

//* EVENT LISTENERS
document.addEventListener('DOMContentLoaded', checkLocalStorage);
// containerMovies.addEventListener('click', openModal);
// document.addEventListener('click', closeModal);