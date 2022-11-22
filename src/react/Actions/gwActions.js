import {gwAxios} from './axios';
import actionTypes from './actionTypes';
import {userLogin} from "../../usecases/userLogin";
import {isMatchLocalVersion, getServerHistoryAssignLog} from "../../usecases/getHistoryAssignLog";


export async function loginUser(dispatch, loginPayload) {
  dispatch({type: actionTypes.REQUEST_LOGIN});
  const loginResult = await userLogin(loginPayload);
  if (loginResult.success) {
    dispatch({type: 'LOGIN_SUCCESS', payload: loginResult.data});
    localStorage.setItem('currentUser', JSON.stringify(loginResult.data));
    return loginResult.data;
  } else {
    dispatch({type: actionTypes.LOGIN_ERROR, error: loginResult.error.message});
  }

}

export async function logout(dispatch) {
  dispatch({type: 'LOGOUT'});
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

export const getHistoryAssignLog = async (localVersion) => {
  let result = {
    success: false,
    data: {},
    error: {
      code: '',
      message: ''
    }
  }
  const compareResult = await isMatchLocalVersion(localVersion)
  if (!compareResult.isMatch) {
    result = await getServerHistoryAssignLog(compareResult.remoteVersion)
  }
  return result
}

const uploadToGwStrategy = {
  'TRIPLE_GUI': uploadGUI,
  'DUPLICATE_CASH_REGISTER_GUI': uploadGUI,
  'TRIPLE_CASH_REGISTER_GUI': uploadGUI,
  'EGUI': uploadGUI,
  'ELECTRIC_BILL': uploadBill,
  'WATER_BILL': uploadBill,
  'TELECOM_BILL': uploadBill,
  'CUSTOMS_TAXABLE_EVIDENCE': uploadCustoms,
};

async function uploadGUI(payload, imageBlob, accountingFirmTaxId, token) {
  console.log('uploadGUI', payload);
  try {
    const req = {
      inputOutputType: 'INPUT',
      businessEntityTaxId: payload.buyerTaxId,
      evidenceType: payload.gwEvidenceType,
      reportingPeriod: payload.reportingPeriod,
      deductionType: payload.deductionType,
      isDeclareBusinessTax: payload.isDeclareBusinessTax,
      buyerTaxId: payload.buyerTaxId,
      sellerTaxId: payload.sellerTaxId,
      taxType: payload.taxType,
      taxableSalesValue: payload.taxableSalesValue,
      zeroTaxSalesValue: payload.zeroTaxSalesValue,
      dutyFreeSalesValue: payload.dutyFreeSalesValue,
      withoutTaxAmount: parseInt(payload.taxableSalesValue)
        + parseInt(payload.zeroTaxSalesValue)
        + parseInt(payload.dutyFreeSalesValue),
      businessTaxValue: payload.businessTaxValue,
      totalAmount: payload.totalAmount,
      evidenceTimestamp: payload.evidenceDate,
      guiId: payload.evidenceNumber,
      commentType: 'WHITE_SPACE',
      summaryCount: 1,
      clearanceType: 'BLANK',
    };
    const url = '/evidence/gui';
    const bodyFormData = new FormData();
    bodyFormData.append('input', JSON.stringify(req));
    bodyFormData.append('file', imageBlob);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        taxId: accountingFirmTaxId,
        Authorization: token,
      },
    };
    await gwAxios.post(url, bodyFormData, config);
    return {
      status: true,
      errorMsg: '',
    };
  } catch (error) {
    let errorMsg = '';
    if (error.response === undefined) {
      errorMsg = '網路錯誤';
    } else {
      errorMsg = error.response.data.errorMsg;
    }
    return {
      status: false,
      errorMsg,
    };
  }
}

async function uploadBill(payload, imageBlob, accountingFirmTaxId, token) {
  try {
    const req = {
      businessEntityTaxId: payload.buyerTaxId,
      evidenceType: payload.gwEvidenceType,
      reportingPeriod: payload.reportingPeriod,
      deductionType: payload.deductionType,
      isDeclareBusinessTax: payload.isDeclareBusinessTax,
      buyerTaxId: payload.buyerTaxId,
      sellerTaxId: payload.sellerTaxId,
      taxType: payload.taxType,
      taxableSalesValue: payload.taxableSalesValue,
      zeroTaxSalesValue: payload.zeroTaxSalesValue,
      dutyFreeSalesValue: payload.dutyFreeSalesValue,
      withoutTaxAmount: parseInt(payload.taxableSalesValue)
        + parseInt(payload.zeroTaxSalesValue)
        + parseInt(payload.dutyFreeSalesValue),
      businessTaxValue: payload.businessTaxValue,
      otherFee: payload.otherFee,
      totalAmount: payload.totalAmount,
      totalPayAmount: payload.totalPayAmount,
      evidenceTimestamp: payload.evidenceDate,
      evidenceId: payload.evidenceNumber,
      commentType: 'WHITE_SPACE',
      summaryCount: 1,
    };
    const url = '/evidence/bill';
    const bodyFormData = new FormData();
    bodyFormData.append('input', JSON.stringify(req));
    bodyFormData.append('file', imageBlob);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        taxId: accountingFirmTaxId,
        Authorization: token,
      },
    };
    const result = await gwAxios.post(url, bodyFormData, config);
    return {
      status: true,
      errorMsg: '',
    };
  } catch (error) {
    let errorMsg = '';
    if (error.response === undefined) {
      errorMsg = '網路錯誤';
    } else {
      errorMsg = error.response.data.errorMsg;
    }
    return {
      status: false,
      errorMsg,
    };
  }
}

// TODO
async function uploadCustoms(payload, imageBlob, accountingFirmTaxId, token) {
  try {
    const req = {
      businessEntityTaxId: payload.buyerTaxId,
      evidenceType: payload.gwEvidenceType,
      reportingPeriod: payload.reportingPeriod,
      deductionType: payload.deductionType,
      isDeclareBusinessTax: payload.isDeclareBusinessTax,
      buyerTaxId: payload.buyerTaxId,
      taxType: payload.taxType,
      taxableSalesValue: payload.taxableSalesValue,
      zeroTaxSalesValue: null,
      dutyFreeSalesValue: payload.dutyFreeSalesValue,
      withoutTaxAmount: parseInt(payload.taxableSalesValue)
        + parseInt(payload.zeroTaxSalesValue)
        + parseInt(payload.dutyFreeSalesValue),
      businessTaxValue: payload.businessTaxValue,
      otherFee: payload.otherFee,
      totalAmount: payload.totalAmount,
      totalPayAmount: payload.totalPayAmount,
      evidenceTimestamp: payload.evidenceDate,
      evidenceId: payload.evidenceNumber,
      declarationId: payload.declarationId,
    };
    const url = '/evidence/customs';
    const bodyFormData = new FormData();
    bodyFormData.append('input', JSON.stringify(req));
    bodyFormData.append('file', imageBlob);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        taxId: accountingFirmTaxId,
        Authorization: token,
      },
    };
    const result = await gwAxios.post(url, bodyFormData, config);
    return {
      status: true,
      errorMsg: '',
    };
  } catch (error) {
    let errorMsg = '';
    if (error.response === undefined) {
      errorMsg = '網路錯誤';
    } else {
      errorMsg = error.response.data.errorMsg;
    }
    return {
      status: false,
      errorMsg,
    };
  }
}

export async function uploadToGw(payload, accountingFirmTaxId, token) {
  const result = [];
  for (let i = 0; i < payload.length; i++) {
    // payload, imageBlob, accountingFirmTaxId, token
    const data = payload[i];
    const uploadResult = await uploadToGwStrategy[data.json.gwEvidenceType](data.json, data.image, accountingFirmTaxId, token);
    if (uploadResult.status) {
      result.push({
        status: true,
        json: data.json,
        errorMsg: '',
      });
    } else {
      data.json.errorMsg = uploadResult.errorMsg;
      result.push({
        status: false,
        json: data.json,
      });
    }
  }
  return result;
}

export const getAllClientList = async (dispatch, username, taxId, token) => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'accountingfirmTaxId': taxId,
      'Authorization': `Bearer ${token}`
    },
  };

  const result = await gwAxios.get('/vat/api/v1/businessEntity', requestOptions).catch((error) => {
    // TODO Error handling, logout or re-login?
    console.log('getAllClientList error', JSON.stringify(error));
    dispatch({type: actionTypes.GET_CLIENT_LIST_FAILED, payload: error});
  });
  console.log('getAllClientList result', result);
  if (result) {
    dispatch({type: actionTypes.GET_CLIENT_LIST_SUCCESS, payload: result.data});
  }
};
