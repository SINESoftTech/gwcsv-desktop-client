import { signtTourAxios } from './axios'

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

export async function sendToIdentify(identifyData) {
  try {
    const apiPath = '/upload.php'
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    let resultList = []
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
      resultList.push({
        'businessEntityTaxId': data.businessEntityTaxId,
        'ticketId': result.data['ticket'],
        'sourceFullPath': data.sourceFullPath,
        'sourceFileName': data.sourceFileName
      })
    }
    return resultList
  } catch (error) {
    throw new Error(error)
  }
}

export async function getIdentifyResult(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export async function sendConfirmedResult(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}
