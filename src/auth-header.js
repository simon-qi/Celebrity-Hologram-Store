export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata,
        'Accept': 'application/json',
        'Content-Type': 'application/json' };
    } else {
        return {};
    }
}
