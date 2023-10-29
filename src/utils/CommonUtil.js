export function apiBaseUrl() {
    // const url = process.env.REACT_APP_API_SERVER_URL;
    const url = "http://127.0.0.1:8080";
    if(!url){
        console.error('api server url not found in env');
    }
    return url;
}