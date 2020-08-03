//TODO IMPORTS
import { checkLS, removeToLocalstorage } from "./localStorage.js";

//* GLOBALS VARIABLES 
const numberFav = document.getElementById('number-fav');
const containerMovies = document.getElementById('movies-container');
const modal = document.getElementById('info-modal');

//* FUNCTIONS 
function checkLocalStorage() {
    let resultLS;
    resultLS = checkLS();
    numberFav.innerText = resultLS.length;
    containerMovies.innerHTML = "";
    readToLocalStorage(resultLS);
}

//* RENDERS FAVS IN THE DOM
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
    movies.map(movie => consultApi(movie));
}

//* MODAL INFO MOVIE
async function consultApiModal(idMovie) {
    const response = await fetch(`//www.omdbapi.com/?i=${idMovie}&apikey=1e13fde`);
    const resultInfo = await response.json();
    renderResultModal(resultInfo);
}

function openModal(e) {
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
                    <button class="delete favourite" value="${movie.imdbID}">Remove to favourites <i class="fas fa-heart"></i></button>
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

//* REMOVE TO FAVOURITES
function removeToFavourites(e) {
    if (e.target.classList.contains('favourite')) {
        removeToLocalstorage(e.target.getAttribute('value'));
        modal.classList.remove("show");
        checkLocalStorage();
    }
}

//* EVENT LISTENERS
document.addEventListener('DOMContentLoaded', checkLocalStorage);
containerMovies.addEventListener('click', openModal);
document.addEventListener('click', closeModal);
document.addEventListener('click', removeToFavourites);