import axios from 'axios';
import { redirect } from 'next/navigation';

import { refreshTokens } from './api/mutations';
import { getCookies } from './serverActions';

export const externalApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

externalApiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getCookies('access_token');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

externalApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        const oldRefreshToken = await getCookies('refresh_token');

        if (!oldRefreshToken) {
          console.warn('No refresh token available.');

          return Promise.reject(error);
        }

        const { data } = await refreshTokens(oldRefreshToken);

        const { accessToken, refreshToken } = data;

        await axios.post(
          '/set-tokens',
          {
            accessToken,
            refreshToken,
          },
          {
            baseURL: 'http://localhost:8000/api',
          },
        );

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        const response = await axios(originalRequest);

        return response;
      } catch (refreshError) {
        await axios.post(
          '/logout',
          {},
          {
            baseURL: 'http://localhost:8000/api',
          },
        );

        redirect('/auth/login');
      }
    }

    return Promise.reject(error);
  },
);
