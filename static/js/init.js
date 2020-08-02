export function userExist(exist = 0, username) {
    if (exist === 1) {
        window.location.href = `${window.location.origin}/index.html`;
    } else {
        window.location.href = `${window.location.origin}/login.html`;
    }
}