import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createData = (entity, data) =>
    axios.post(`${BASE_URL}/data/${entity}`, data);

export const getData = (entity) => 
    axios.get(`${BASE_URL}/data/${entity}`);