import axios from "axios";
const SIGHT_TOUR_ROOT_URL = 'http://aiocr.sightour.com/gateweb/api'
const GW_ROOT_URL = 'http://localhost:8080'
const gwAxios = axios.create({
  baseURL: GW_ROOT_URL,
  headers: {'Content-Type': 'application/json'}
})


const signtTourAxios = axios.create({
  baseURL: SIGHT_TOUR_ROOT_URL
})

export {gwAxios, signtTourAxios}