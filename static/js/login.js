//* IMPORTS
import { validateUserLocalStorage, createUserLocalStorage } from "./localStorage.js";
import { userExist } from "./init.js";

//* VARIABLES
const username = document.getElementById('name-user');
const password = document.getElementById('pass-user');
const login = document.getElementById('login');
const createUser = document.getElementById('create-account');

//* FUNCTIONS
//TODO 
export function errorMessage(message) {
    const messageDiv = document.getElementById('message-login');
    messageDiv.innerHTML = `<p>${message}</p>`;
    setTimeout(function() {
        messageDiv.innerHTML = "";
    }, 3000);
}

function validateLogin() {
    validateUserLocalStorage(username.value, password.value);
}

function validateCreateAccount() {
    if (username.value.length >= 5 && password.value.length >= 5) {
        createUserLocalStorage(username.value, password.value);
        userExist(1, username.value);
    } else {
        errorMessage("The user & password must be at least 5 characters");
    }
}

//* EVENT LISTENERS
login.addEventListener('click', validateLogin);
createUser.addEventListener('click', validateCreateAccount);