import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://react.free.beeceptor.com',
  timeout: 10_000,
});
