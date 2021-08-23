import { gwAxios, gwAxios as axios } from './axios'
import actionTypes from '../Actions/actionTypes'

const ROOT_URL = 'http://test.gwis.com.tw:8596'

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload)
  }

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
  try {
    const taxableSalesValue = payload.taxableSalesValue === '' ? 0 : payload.taxableSalesValue
    const zeroTaxSalesValue = payload.zeroTaxSalesValue === '' ? 0 : payload.zeroTaxSalesValue
    const dutyFreeSalesValue = payload.dutyFreeSalesValue === '' ? 0 : payload.dutyFreeSalesValue
    const timestamp = new Date(payload.evidenceDate.substring(0, 4) + '-' + payload.evidenceDate.substring(4, 6) + '-' + payload.evidenceDate.substring(6, 8)).getTime()
    const req = {
      'businessEntityTaxId': payload.buyerTaxId,
      'evidenceType': payload.evidenceType,
      'reportingPeriod': '11002',
      'deductionType': 'PURCHASE_AND_FEE',
      'isDeclareBusinessTax': true,
      'buyerTaxId': payload.buyerTaxId,
      'sellerTaxId': payload.sellerTaxId,
      'taxType': payload.taxType,
      'taxableSalesValue': taxableSalesValue,
      'zeroTaxSalesValue': zeroTaxSalesValue,
      'dutyFreeSalesValue': dutyFreeSalesValue,
      'withoutTaxAmount': parseInt(taxableSalesValue) + parseInt(zeroTaxSalesValue) + parseInt(dutyFreeSalesValue),
      'businessTaxValue': payload.businessTaxValue,
      'totalAmount': payload.totalAmount,
      'evidenceTimestamp': timestamp,
      'guiId': payload.evidenceNumber,
      'commentType': 'WHITE_SPACE',
      'summaryCount': 1,
      'groupName': null,
      'remarkText': payload.remark
    }
    const url = ROOT_URL + '/evidence/gui'
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
    const result = await gwAxios.post(url, bodyFormData, config)
    return true
  } catch (error) {
    return false
  }
}

//TODO
async function uploadBill(payload, accountingFirmTaxId, token) {
  try {

  } catch (error) {

  }
}

//TODO
async function uploadCustoms(payload, accountingFirmTaxId, token) {
  try {

  } catch (error) {

  }
}

export async function uploadToGw(payload, accountingFirmTaxId, token) {
  const result = []
  for (let i = 0; i < payload.length; i++) {
    const data = payload[i]
    console.log('uploadToGw', data)
    const uploadResult = await uploadToGwStrategy[data['json'].evidenceType](data['json'], data['jpg'], accountingFirmTaxId, token)
    if (uploadResult) {
      result.push({
        'status': true,
        'imageFullPath': data['imageFullPath'],
        'jsonFullPath': data['jsonFullPath']
      })
    } else {
      result.push({
        'status': false,
        'imageFullPath': data['imageFullPath'],
        'jsonFullPath': data['jsonFullPath']
      })
    }
  }
  return result
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
