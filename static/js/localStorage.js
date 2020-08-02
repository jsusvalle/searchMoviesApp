import { errorMessage } from "./login.js";
import { userExist } from "./init.js";

function validateLocalStorage() {
    let localS;

    if (localStorage.getItem('userMovieSearch') === null) {
        localS = [];
    } else {
        localS = JSON.parse(localStorage.getItem('userMovieSearch'));
    }

    return localS;
}

export function createUserLocalStorage(username, password) {
    const userLS = {
        user: username,
        pass: password
    };

    let localS = validateLocalStorage();
    localS.push(userLS);
    localStorage.setItem('userMovieSearch', JSON.stringify(localS));
}

export function validateUserLocalStorage(username, password) {
    const userLS = {
        user: username,
        pass: password
    };
    let localS = validateLocalStorage();

    if (Object.entries(localS).length >= 1) {
        localS.forEach((localS, index) => {
            if (localS.user === userLS.user) {
                if (localS.pass === userLS.pass) {
                    userExist(1);
                } else {
                    errorMessage("The password is wrong");
                }
            }
        });
    } else {
        errorMessage("You must create account");
    }
}