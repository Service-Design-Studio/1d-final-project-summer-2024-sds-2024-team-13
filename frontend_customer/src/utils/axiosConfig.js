import axios from 'axios';

// Create  axios instance
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'  
    }
});

export const setAuthToken = token => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) {
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;
}

export default axiosInstance;
