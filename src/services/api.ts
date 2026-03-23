import axios from "axios";

const api = axios.create({
  baseURL: 'https://hope-green-api.vercel.app/'
});

export { api };
