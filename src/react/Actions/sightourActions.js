import { signtTourAxios } from './axios'


const getToken = async (id, psw) => {
  try {
    const apiPath = '/requestToken.php'
    const formData = new FormData()
    formData.append('id', id)
    formData.append('psw', psw)
    const result = await signtTourAxios.post(apiPath, formData)
    return result.data['token']
  } catch (error) {
    throw new Error(error)
  }
}

export async function sendToIdentify(identifyData) {
  const apiPath = '/upload.php'
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  let resultList = []
  for (let i = 0; i < identifyData.length; i++) {
    const data = identifyData[i]
    try {
      const token = await getToken('gateweb1', 'qwe123')
      const formData = new FormData()
      formData.append('file', data.fileBlob)
      formData.append('type', data.evidenceType)
      formData.append('agent', data.accountingfirmTaxId)
      formData.append('company', data.businessEntityTaxId)
      formData.append('token', token)
      const result = await signtTourAxios.post(apiPath, formData, config)
      if (result.data['result'] === 0) {
        console.log('sendToIdentify', data)
        resultList.push({
          'result': true,
          'businessEntityTaxId': data.businessEntityTaxId,
          'ticketId': result.data['ticket'],
          'sourceFullPath': data.sourceFullPath,
          'sourceFileName': data.sourceFileName
        })
      } else {
        resultList.push({
          'result': false,
          'businessEntityTaxId': data.businessEntityTaxId,
          'sourceFullPath': data.sourceFullPath,
          'sourceFileName': data.sourceFileName
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  return resultList
}

export async function getIdentifyResult(fileObj) {
  try {
    const apiPath = '/check.php'
    const token = await getToken('gateweb1', 'qwe123')
    const ticketId = fileObj.filename.split('_')[5].split('.')[0]
    const formData = new FormData()
    formData.append('token', token)
    formData.append('ticket', ticketId)
    const result = await signtTourAxios.post(apiPath, formData)
    if (result.data.result === undefined) {
      return {
        'sourceFullPath': fileObj.fullPath,
        'sourceFileName': fileObj.filename,
        'status': 'completed',
        'data': result.data
      }
    }
    return {
      'sourceFullPath': fileObj.fullPath,
      'sourceFileName': fileObj.filename,
      'status': 'failed'
    }
  } catch (error) {
    throw new Error(error)
  }
}

export async function sendConfirmedResult(payload) {
  console.log('sendConfirmedResult', payload)
  try {
    const apiPath = '/feedbackResult.php'
    const token = await getToken('gateweb1', 'qwe123')
    const data = [payload.data]
    const photoId = payload.photoId
    const formData = new FormData()
    formData.append('token', token)
    formData.append('data', JSON.stringify(data))
    formData.append('photo', photoId)
    const result = await signtTourAxios.post(apiPath, formData)
    return result.data['token']
  } catch (error) {
    throw new Error(error)
  }
}
