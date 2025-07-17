import axios from 'axios';

const API = 'https://word-api-hmlg.vercel.app';

export const getDifficulties = () => axios.get(`${API}/api/difficulties`);
export const getSession = (id) => axios.get(`${API}/api/difficulties/${id}`);
export const checkWord = (body) => axios.post(`${API}/api/checkWord`, body);
