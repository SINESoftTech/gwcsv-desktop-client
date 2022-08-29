import axios from 'axios'

const SIGHT_TOUR_ROOT_URL = ''//no use
const GW_ROOT_URL = 'http://104.155.204.250:8080' //uat //34.80.79.216(dev)
const gwAxios = axios.create({
  baseURL: GW_ROOT_URL,
  headers: { 'Content-Type': 'application/json' }
})


const signtTourAxios = axios.create({
  baseURL: SIGHT_TOUR_ROOT_URL
})

export { gwAxios, signtTourAxios }