import axios from 'axios';

const localUrl = 'http://localhost:55000';
const deployUrl = 'https://backmoda.onrender.com';

const axiosInstance = axios.create({
  baseURL: deployUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.error('Não autorizado, redirecionando para login...');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
