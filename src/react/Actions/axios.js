import axios from 'axios';

const GW_ROOT_URL = 'http://104.155.204.250:8080/';
const gwAxios = axios.create({
  baseURL: GW_ROOT_URL,
  headers: {'Content-Type': 'application/json'},
});

const gwVatAxios = axios.create({
  baseURL: 'http://34.80.79.216:8082',
  headers: {'Content-Type': 'application/json'},
})

export {gwAxios, gwVatAxios};
