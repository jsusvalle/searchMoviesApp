//TODO IMPORTS
import { checkLS, addToLocalstorage } from "./localStorage.js";

//* GLOBALS VARIABLES 
const btnSearch = document.getElementById('btn-search');
const containerMovies = document.getElementById('movies-container');
const modal = document.getElementById('info-modal');
const numberFav = document.getElementById('number-fav');

//* Functions
//* CHECK THE LOCALSTORAGE
function checkLocalStorage() {
    let resultLS;
    resultLS = checkLS();
    numberFav.innerText = resultLS.length;
}

//* RESULTS OF SEARCH MOVIES
function chargeMovies(e) {
    e.preventDefault();
    const textSearch = document.getElementById('search').value;
    consultApi(textSearch);
}

async function consultApi(title) {
    const response = await fetch(`//www.omdbapi.com/?s=${title}&apikey=1e13fde`);
    const resultsSearch = await response.json();
    if (resultsSearch.Response === "True") {
        renderResults(resultsSearch.Search);
        renderMessage("These are the results of", title);
    } else {
        containerMovies.innerHTML = "";
        renderMessage(":( There are no results for", title);
    }
}

function renderMessage(message, title) {
    const divMessage = document.getElementById('message-search');
    divMessage.innerHTML = `<p> ${message} "${title}"</p>`;
}

function renderResults(results) {
    containerMovies.innerHTML = results.map(movie =>
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
        </div>`
    ).join('');
}

//* MODAL INFO MOVIE
async function consultApiModal(idMovie) {
    const response = await fetch(`//www.omdbapi.com/?i=${idMovie}&apikey=1e13fde`);
    const resultInfo = await response.json();
    renderResultModal(resultInfo);
}

export function openModal(e) {
    const btnViewMore = e.target.parentElement;
    if (btnViewMore.classList.contains('view-more')) {
        consultApiModal(btnViewMore.getAttribute("id"));
    }
}

function renderResultModal(movie) {
    modal.innerHTML = `
            <div class="modal-content">
                <div class="close">
                    <p class="title">${movie.Title}</p>
                    <button class="close-info"><i class="fas fa-times close-button"></i></button>
                </div>
                <div class="info-movie">
                    <img src="${movie.Poster}" alt="">

                    <p class="genre">${movie.Genre}</p>
                    <div class="icons-bar">
                        <p><i class="fas fa-clock"></i> ${movie.Runtime}</p>
                        <p><i class="fas fa-comments"></i> ${movie.Language}</p>
                        <p class="imdbRating"><i class="fab fa-imdb"></i> ${movie.imdbRating}</p>
                    </div>
                    <div class="info-create-movie">
                        <p><span>Director: </span>${movie.Director}</p>
                        <p><span>Actors: </span>${movie.Actors}</p>
                        <p><span>Writers: </span>${movie.Writer}</p>
                        <p><span>About: </span> ${movie.Plot}</p>
                    </div>
                    <button class="favourite" value="${movie.imdbID}">Add to favourite <i class="fas fa-heart"></i></button>
                </div>
            </div>
    `;

    modal.classList.add("show");
}

function closeModal(e) {
    if (e.target.classList.contains('close-button') || e.target.classList.contains('close-info')) {
        modal.classList.remove("show");
    }
}

//* ADD MOVIE TO FAVOURITES
function addToFavourites(e) {
    if (e.target.classList.contains('favourite')) {
        addToLocalstorage(e.target.getAttribute('value'));
    }
}

//* EVENT LISTENERS
document.addEventListener('DOMContentLoaded', checkLocalStorage);
btnSearch.addEventListener('click', chargeMovies);
containerMovies.addEventListener('click', openModal);
document.addEventListener('click', closeModal);
document.addEventListener('click', addToFavourites);