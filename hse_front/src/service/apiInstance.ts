import axios from 'axios';

export const getApiInstance = () => {
    const instance = axios.create();
    instance.defaults.baseURL = window.runEnv.apiUrl || window.location.origin;

    /* Auth headers */

    /* Response interceptors - refresh token on 403, log errors */
    
    return instance;
};
