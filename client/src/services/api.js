import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

export const createData = (entity, data) =>
    axios.post(`${BASE_URL}/data/${entity}`, data);

export const getData = (entity) => 
    axios.get(`${BASE_URL}/data/${entity}`);