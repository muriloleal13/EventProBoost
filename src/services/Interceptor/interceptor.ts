import axios from 'axios';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
  },
});

// Request interceptor for API calls
instance.interceptors.request.use(
  async (config) => {
    const token = auth.storeAuthTokenGetter;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;
    // const refToken = auth.storeAuthRefreshGetter;
    // if (refToken && error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const response = await AuthService.AtualizarToken({ token: refToken });
    //   const { accessToken, refreshToken } = response.data;
    //   auth.storageAuthTokenSave({ accessToken, refreshToken });
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    //   return axios(originalRequest);
    // }
    return Promise.reject(error);
  }
);

export { instance };
