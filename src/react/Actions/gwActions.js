import { gwAxios as axios } from './axios'
import actionTypes from '../Actions/actionTypes'

export async function loginUser(dispatch, loginPayload) {
  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(loginPayload)
  // }

  try {
    dispatch({ type: 'REQUEST_LOGIN' })
    let response = await axios.post('/auth/login', JSON.stringify(loginPayload)) //await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    let data = response.data
    let user = { taxId: loginPayload.taxId, username: loginPayload.username }
    if (data.token) {
      user.token = data.token
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      localStorage.setItem('currentUser', JSON.stringify(user))
      return user
    }

    dispatch({ type: 'LOGIN_ERROR', error: response.data })
    console.log('error response', response.data)
    return
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error.response.data })
    console.log(error)
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem('currentUser')
  localStorage.removeItem('token')
}

const uploadToGwStrategy = {
  'TRIPLE_GUI': async function(payload, imageBlob, accountingFirmTaxId, token) {
    return await uploadGUI(payload, imageBlob, accountingFirmTaxId, token)
  },
  'DUPLICATE_CASH_REGISTER_GUI': async function(payload, imageBlob, accountingFirmTaxId, token) {
    return await uploadGUI(payload, imageBlob, accountingFirmTaxId, token)
  },
  'TRIPLE_CASH_REGISTER_GUI': async function(payload, imageBlob, accountingFirmTaxId, token) {
    return await uploadGUI(payload, imageBlob, accountingFirmTaxId, token)
  },
  'EGUI': async function(payload, imageBlob, accountingFirmTaxId, token) {
    return await uploadGUI(payload, imageBlob, accountingFirmTaxId, token)
  },
  'ELECTRIC_BILL': async function(payload, imageBlob, accountingFirmTaxId, token) {
    return await uploadBill(payload, imageBlob, accountingFirmTaxId, token)
  },
  'WATER_BILL': async function(payload, imageBlob, accountingFirmTaxId, token) {
    return await uploadBill(payload, imageBlob, accountingFirmTaxId, token)
  },
  'TELECOM_BILL': async function(payload, imageBlob, accountingFirmTaxId, token) {
    return await uploadBill(payload, imageBlob, accountingFirmTaxId, token)
  },
  'CUSTOMS_TAXABLE_EVIDENCE': async function(payload, imageBlob, accountingFirmTaxId, token) {
    return await uploadCustoms(payload, imageBlob, accountingFirmTaxId, token)
  }
}

async function uploadGUI(payload, imageBlob, accountingFirmTaxId, token) {
  console.log('uploadGUI', payload)
  try {
    const req = {
      'inputOutputType': 'INPUT',
      'businessEntityTaxId': payload.buyerTaxId,
      'evidenceType': payload.gwEvidenceType,
      'reportingPeriod': payload.reportingPeriod,
      'deductionType': payload.deductionType,
      'isDeclareBusinessTax': payload.isDeclareBusinessTax,
      'buyerTaxId': payload.buyerTaxId,
      'sellerTaxId': payload.sellerTaxId,
      'taxType': payload.taxType,
      'taxableSalesValue': payload.taxableSalesValue,
      'zeroTaxSalesValue': payload.zeroTaxSalesValue,
      'dutyFreeSalesValue': payload.dutyFreeSalesValue,
      'withoutTaxAmount': parseInt(payload.taxableSalesValue) + parseInt(payload.zeroTaxSalesValue) + parseInt(payload.dutyFreeSalesValue),
      'businessTaxValue': payload.businessTaxValue,
      'totalAmount': payload.totalAmount,
      'evidenceTimestamp': payload.evidenceDate,
      'guiId': payload.evidenceNumber,
      'commentType': 'WHITE_SPACE',
      'summaryCount': 1,
      'clearanceType': 'BLANK'
    }
    const url = '/evidence/gui'
    let bodyFormData = new FormData()
    bodyFormData.append('input', JSON.stringify(req))
    bodyFormData.append('file', imageBlob)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'taxId': accountingFirmTaxId,
        'Authorization': token
      }
    }
    await axios.post(url, bodyFormData, config)
    return {
      'status': true,
      'errorMsg': ''
    }
  } catch (error) {
    let errorMsg = ''
    if (error.response === undefined) {
      errorMsg = '網路錯誤'
    } else {
      errorMsg = error.response.data.errorMsg
    }
    return {
      'status': false,
      'errorMsg': errorMsg
    }
  }
}

async function uploadBill(payload, imageBlob, accountingFirmTaxId, token) {
  try {
    const req = {
      'businessEntityTaxId': payload.buyerTaxId,
      'evidenceType': payload.gwEvidenceType,
      'reportingPeriod': payload.reportingPeriod,
      'deductionType': payload.deductionType,
      'isDeclareBusinessTax': payload.isDeclareBusinessTax,
      'buyerTaxId': payload.buyerTaxId,
      'sellerTaxId': payload.sellerTaxId,
      'taxType': payload.taxType,
      'taxableSalesValue': payload.taxableSalesValue,
      'zeroTaxSalesValue': payload.zeroTaxSalesValue,
      'dutyFreeSalesValue': payload.dutyFreeSalesValue,
      'withoutTaxAmount': parseInt(payload.taxableSalesValue) + parseInt(payload.zeroTaxSalesValue) + parseInt(payload.dutyFreeSalesValue),
      'businessTaxValue': payload.businessTaxValue,
      'otherFee': payload.otherFee,
      'totalAmount': payload.totalAmount,
      'totalPayAmount': payload.totalPayAmount,
      'evidenceTimestamp': payload.evidenceDate,
      'evidenceId': payload.evidenceNumber,
      'commentType': 'WHITE_SPACE',
      'summaryCount': 1
    }
    const url = '/evidence/bill'
    let bodyFormData = new FormData()
    bodyFormData.append('input', JSON.stringify(req))
    bodyFormData.append('file', imageBlob)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'taxId': accountingFirmTaxId,
        'Authorization': token
      }
    }
    const result = await axios.post(url, bodyFormData, config)
    return {
      'status': true,
      'errorMsg': ''
    }
  } catch (error) {
    let errorMsg = ''
    if (error.response === undefined) {
      errorMsg = '網路錯誤'
    } else {
      errorMsg = error.response.data.errorMsg
    }
    return {
      'status': false,
      'errorMsg': errorMsg
    }
  }
}

//TODO
async function uploadCustoms(payload, imageBlob, accountingFirmTaxId, token) {
  try {
    const req = {
      'businessEntityTaxId': payload.buyerTaxId,
      'evidenceType': payload.gwEvidenceType,
      'reportingPeriod': payload.reportingPeriod,
      'deductionType': payload.deductionType,
      'isDeclareBusinessTax': payload.isDeclareBusinessTax,
      'buyerTaxId': payload.buyerTaxId,
      'taxType': payload.taxType,
      'taxableSalesValue': payload.taxableSalesValue,
      'zeroTaxSalesValue': null,
      'dutyFreeSalesValue': payload.dutyFreeSalesValue,
      'withoutTaxAmount': parseInt(payload.taxableSalesValue) + parseInt(payload.zeroTaxSalesValue) + parseInt(payload.dutyFreeSalesValue),
      'businessTaxValue': payload.businessTaxValue,
      'otherFee': payload.otherFee,
      'totalAmount': payload.totalAmount,
      'totalPayAmount': payload.totalPayAmount,
      'evidenceTimestamp': payload.evidenceDate,
      'evidenceId': payload.evidenceNumber,
      'declarationId': payload.declarationId
    }
    const url = '/evidence/customs'
    let bodyFormData = new FormData()
    bodyFormData.append('input', JSON.stringify(req))
    bodyFormData.append('file', imageBlob)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'taxId': accountingFirmTaxId,
        'Authorization': token
      }
    }
    const result = await axios.post(url, bodyFormData, config)
    return {
      'status': true,
      'errorMsg': ''
    }
  } catch (error) {
    let errorMsg = ''
    if (error.response === undefined) {
      errorMsg = '網路錯誤'
    } else {
      errorMsg = error.response.data.errorMsg
    }
    return {
      'status': false,
      'errorMsg': errorMsg
    }
  }
}

export async function uploadToGw(payload, accountingFirmTaxId, token) {
  const result = []
  for (let i = 0; i < payload.length; i++) {
    // payload, imageBlob, accountingFirmTaxId, token
    const data = payload[i]
    const uploadResult = await uploadToGwStrategy[data['json']['gwEvidenceType']](data['json'], data['image'], accountingFirmTaxId, token)
    if (uploadResult.status) {
      result.push({
        'status': true,
        'json': data['json'],
        'errorMsg': ''
      })
    } else {
      data['json']['errorMsg'] = uploadResult.errorMsg
      result.push({
        'status': false,
        'json': data['json']
      })
    }
  }
  return result
}

//{
//   "version": "56bbb47702cc861db0d4e02dd1a5151dc31276caa1a4868e04138659ba82300c"
// }
const getYearAssignVersion = async () => {
  try {
    const response = await axios.get('/assign/year/version')
    return {
      'status': 'success',
      'version': response.data['version']
    }
  } catch (e) {
    return {
      'status': 'failed'
    }
  }
}

export const getAssign = async (yearAssignVersion) => {
  try {
    const versionRes = await getYearAssignVersion()
    if (versionRes.status === 'failed' || (versionRes.status === 'success' && versionRes.version !== yearAssignVersion)) {
      const response = await axios.get('/assign/year')
      return {
        'status': 'success',
        'version': versionRes.version,
        'data': response.data
      }
    }
    return {
      'status': 'noChange'
    }
  } catch (error) {
    return {
      'status': 'failed'
    }
  }
}

export const getAllClientList = async (dispatch, username, taxId, token) => {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json', 'Authorization': token, taxId: taxId }
  }

  const result = await axios.get(`/businessEntity/${taxId}`, requestOptions).catch((error) => {
    // TODO Error handling, logout or re-login?
    console.log('getAllClientList error', JSON.stringify(error))
    dispatch({ type: actionTypes.GET_CLIENT_LIST_FAILED, payload: error })
  })
  console.log('getAllClientList result', result)
  if (result) {
    dispatch({ type: actionTypes.GET_CLIENT_LIST_SUCCESS, payload: result.data })
  }
}
