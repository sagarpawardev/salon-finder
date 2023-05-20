export function getLocalAuth() {
    const auth =  localStorage.getItem('auth');
    if(auth) {
        const credentials = JSON.parse(auth);
        if(new Date(credentials.expireAt) > new Date()){
            return credentials;
        }
        else{
            removeLocalAuth();
        }
    }

    return undefined;
}

export function setLocalAuth(credentials) {
    localStorage.setItem('auth', JSON.stringify(credentials));
}

export function removeLocalAuth() {
    localStorage.removeItem('auth');
}
