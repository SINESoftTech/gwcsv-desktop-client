import { signtTourAxios } from './axios'
import axios from 'axios'
import { forEach } from 'ramda'

const R = require('ramda')

const getToken = async (id, psw) => {
  try {
    const apiPath = '/requestToken.php'
    const formData = new FormData()
    formData.append('id', id)
    formData.append('psw', psw)
    const result = await signtTourAxios.post(apiPath, formData)
    return result.data['token']
  } catch (error) {
    //TODO error handle
  }
}

export async function sendToIdentify(dispatch, identifyData) {
  console.log('sendToIdentify dispatch', dispatch)
  console.log('sendToIdentify fileObj', identifyData)
  try {
    const apiPath = '/upload.php'
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    for (let i = 0; i < identifyData.length; i++) {
      const data = identifyData[i]
      const token = await getToken('gateweb1', 'qwe123')
      const formData = new FormData()
      formData.append('file', data.fileBlob)
      formData.append('type', data.evidenceType)
      formData.append('agent', data.accountingfirmTaxId)
      formData.append('company', data.businessEntityTaxId)
      formData.append('token', token)
      const result = await signtTourAxios.post(apiPath, formData, config)
      const ticketId = result.data['ticket']
    }

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
