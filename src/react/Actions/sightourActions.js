import { signtTourAxios } from './axios'
import axios from 'axios'

const R = require('ramda')

const getToken = (id, psw) => {
  try {
    const apiPath = '/requestToken.php'
    const req = {
      'id': id,
      'psw': psw
    }
    const result = signtTourAxios.post(apiPath, JSON.stringify(req))
    console.log(result)
  } catch (error) {
    //TODO error handle
  }
}

export async function sendToIdentify(dispatch, fileObjectList) {
  console.log(fileObjectList)
  try {

  } catch (error) {
  }
}

export async function getIdentifyResult(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export async function sendConfirmedResult(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export const handleSendImageToIdentify = (data) => {
  //FIXME
  const blob = data[0].imageUrl
  const fileName = data[0].fileName
  const file = new File([blob], fileName)
  //FIXME add value
  const bodyFormData = new FormData()
  bodyFormData.append('file', file)
  bodyFormData.append('type', 'A5001')
  bodyFormData.append('agent', '00000000')
  bodyFormData.append('company', '00000000')
  bodyFormData.append('token', '2olhx7gwv10z')
  //todo upload
  console.log(bodyFormData)
  uploadFileToSightour(bodyFormData)
}
export const uploadFileToSightour = (formData) => {
  //FIXME
  const url = 'http://aiocr.sightour.com/gateweb/api/upload.php'
  axios.post(url, formData).then(r => {
    console.log(r)
  })
}
