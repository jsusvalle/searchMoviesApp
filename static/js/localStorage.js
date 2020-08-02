export function checkLS() {
    let localS;
    if (localStorage.getItem('moviesFavs') === null) {
        localS = [];
    } else {
        localS = JSON.parse(localStorage.getItem('moviesFavs'));
    }

    return localS;
}

export function addToLocalstorage(idMovie) {
    let localS;
    localS = checkLS();
    localS.push(idMovie);
    localStorage.setItem('moviesFavs', JSON.stringify(localS));
}