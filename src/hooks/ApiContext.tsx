import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * AxiosProvider creates an Axios instance with a base URL and optional token for authorization.
 * It also includes an interceptor to handle specific authentication error messages
 * and redirect the user to the login page when necessary.
 *
 * @param {any} token - Optional JWT token for authentication.
 * @returns {AxiosInstance} Configured Axios instance.
 */

const AxiosProvider = (token?: any): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL || 'http://localhost:5005',
  });

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Response interceptor to catch authentication-related errors
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorMessage = error.response?.data?.message;

      if (
        errorMessage === 'Token has expired' ||
        errorMessage === 'Invalid token' ||
        errorMessage === 'Failed to authenticate token'
      ) {
        const navigate = useNavigate();
        navigate('/login');

        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default AxiosProvider;
