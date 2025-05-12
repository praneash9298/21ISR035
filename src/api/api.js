import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDI5NzAyLCJpYXQiOjE3NDcwMjk0MDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA0NzZmNTVjLTE2NTUtNGVmZS05ZjM2LTZjY2I5YmI1OWFmYiIsInN1YiI6InByYW5lYXNobWcuMjFtc2NAa29uZ3UuZWR1In0sImVtYWlsIjoicHJhbmVhc2htZy4yMW1zY0Brb25ndS5lZHUiLCJuYW1lIjoicHJhbmVhc2ggbWciLCJyb2xsTm8iOiIyMWlzcjAzNSIsImFjY2Vzc0NvZGUiOiJqbXBaYUYiLCJjbGllbnRJRCI6IjA0NzZmNTVjLTE2NTUtNGVmZS05ZjM2LTZjY2I5YmI1OWFmYiIsImNsaWVudFNlY3JldCI6ImFqa0pzbUNyZFdlQUd2VVIifQ.0HAOMCAMuimNxO2jEwfzE2yAkpCKETem9ljSZz7oa2Y",'; 

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
});
export const getStocksList = () => api.get('/stocks');

export const getStockPrices = (ticker, minutes = 50) => api.get(`/stocks/${ticker}?minutes=${minutes}`);