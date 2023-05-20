export function apiBaseUrl() {
    const url = process.env.REACT_APP_API_SERVER_URL;
    if(!url){
        console.error('api server url not found in env');
    }
    return url;
}