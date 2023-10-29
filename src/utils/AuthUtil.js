export function getLocalAuth() {
    const auth =  localStorage.getItem('auth');
    if(auth) {
        const credentials = JSON.parse(auth);

        //TODO: Enable this after expireAt is added in api
        // if(new Date(credentials.expireAt) > new Date()){
        //     return credentials;
        // }
        // else{
        //     removeLocalAuth();
        // }

        return credentials;
    }

    return undefined;
}

export function setLocalAuth(credentials) {
    localStorage.setItem('auth', JSON.stringify(credentials));
}

export function removeLocalAuth() {
    localStorage.removeItem('auth');
}
