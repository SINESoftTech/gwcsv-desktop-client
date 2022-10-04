import { useAppDispatch } from '../Context';
import { loginUser, logout, uploadToGw } from './gwActions';
import { gwAxios as axios } from './axios';

jest.mock('./axios');

const dispatchData = [];

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');

  return {
    ...ActualReact,
    useContext: () => (function (obj) {
      dispatchData.push(obj);
    }), // what you want to return when useContext get fired goes here
  };
});

afterEach(() => {
  localStorage.removeItem('currentUser');
  const currentUser = localStorage.getItem('currentUser');
  expect(currentUser).toBeNull();
  while (dispatchData.length > 0) {
    dispatchData.pop();
  }
  expect(dispatchData).toEqual([]);
});

test('login successful', async () => {
  // arrange
  const loginPayload = { taxId: '24549210', username: 'string123' };

  axios.post.mockImplementationOnce(() => Promise.resolve({
    data: {
      result: true,
      token: '1234',
    },
  }));
  const dispatch = useAppDispatch();

  // act
  const result = await loginUser(dispatch, loginPayload);

  // assert
  const user = localStorage.getItem('currentUser');
  expect(user).toEqual(JSON.stringify({ taxId: '24549210', username: 'string123', token: '1234' }));
  expect(dispatchData).toEqual([
    { type: 'REQUEST_LOGIN' },
    {
      type: 'LOGIN_SUCCESS',
      payload: { taxId: '24549210', username: 'string123', token: '1234' },
    },
  ]);
});

test('login error', async () => {
  // arrange
  const loginPayload = { taxId: '24549210', username: 'string123' };

  axios.post.mockImplementationOnce(() => Promise.resolve({
    data: {
      result: false,
    },
  }));
  const dispatch = useAppDispatch();

  // act
  const result = await loginUser(dispatch, loginPayload);
  const user = localStorage.getItem('currentUser');
  expect(user).toBeNull();
  expect(dispatchData[0]).toHaveProperty('type', 'REQUEST_LOGIN');
  expect(dispatchData[1]).toHaveProperty('type', 'LOGIN_ERROR');
});

test('logout', async () => {
  localStorage.setItem('currentUser', JSON.stringify({
    taxId: '24549210',
    username: 'string123',
    token: '1234',
  }));
  localStorage.setItem('token', '123456');

  const dispatch = useAppDispatch();
  await logout(dispatch);

  const currentUser = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  expect(dispatchData[0]).toHaveProperty('type', 'LOGOUT');
  expect(currentUser).toBeNull();
  expect(token).toBeNull();
});

test('uploadToGw:uploadStrategy:GUI', async () => {
  const commonGUI = {
    buyerTaxId: 'buyerTaxId',
    reportingPeriod: 'reportingPeriod',
    deductionType: 'deductionType',
    isDeclareBusinessTax: true,
    sellerTaxId: 'sellerTaxId',
    taxType: 'taxType',
    taxableSalesValue: 0,
    zeroTaxSalesValue: 0,
    dutyFreeSalesValue: 0,
    businessTaxValue: 0,
    totalAmount: 0,
    evidenceDate: 'date',
    evidenceNumber: 'evidenceNumber',
    remark: 'remark',
  };
  const tripleGUI = { ...commonGUI };
  tripleGUI.gwEvidenceType = 'TRIPLE_GUI';

  const duplicateCashRegisterGUI = { ...commonGUI };
  duplicateCashRegisterGUI.gwEvidenceType = 'DUPLICATE_CASH_REGISTER_GUI';

  const tripleCashRegisterGUI = { ...commonGUI };
  tripleCashRegisterGUI.gwEvidenceType = 'TRIPLE_CASH_REGISTER_GUI';

  const eGUI = { ...commonGUI };
  eGUI.gwEvidenceType = 'EGUI';

  const payload = [{
    json: tripleGUI,
    image: '',
  }, {
    json: duplicateCashRegisterGUI,
    image: '',
  }, {
    json: tripleCashRegisterGUI,
    image: '',
  }, {
    json: eGUI,
    image: '',
  }];

  const ajaxCallArr = [];
  axios.post.mockImplementationOnce((url, bodyFormData, config) => {
    ajaxCallArr.push({
      url,
      bodyFormData,
      config,
    });
  });

  const result = await uploadToGw(payload, '', '');

  ajaxCallArr.forEach((ajaxCall, index) => {
    const input = JSON.parse(ajaxCall.bodyFormData.get('input'));
    commonEvidenceExpected(input, payload[index].json);
    expect(input).toHaveProperty('inputOutputType', 'INPUT');
    expect(input).toHaveProperty('guiId', payload[index].json.evidenceNumber);
    expect(input).toHaveProperty('commentType', 'WHITE_SPACE');
    expect(input).toHaveProperty('clearanceType', 'BLANK');
    expect(ajaxCall).toHaveProperty('url', '/evidence/gui');
  });
});

test('uploadToGw:uploadStrategy:BILL', async () => {
  const commonBill = {
    buyerTaxId: 'buyerTaxId',
    reportingPeriod: 'reportingPeriod',
    deductionType: 'deductionType',
    isDeclareBusinessTax: false,
    sellerTaxId: 'sellerTaxId',
    taxType: 'taxType',
    taxableSalesValue: 0,
    zeroTaxSalesValue: 0,
    dutyFreeSalesValue: 0,
    withoutTaxAmount: 0,
    businessTaxValue: 0,
    otherFee: 0,
    totalAmount: 0,
    totalPayAmount: 0,
    evidenceTimestamp: 'evidenceDate',
    evidenceId: 'carrierNumber',
    remarkText: 'remark',
  };

  const electricalBill = { ...commonBill };
  electricalBill.gwEvidenceType = 'ELECTRIC_BILL';

  const waterBill = { ...commonBill };
  waterBill.gwEvidenceType = 'WATER_BILL';

  const telecomBill = { ...commonBill };
  telecomBill.gwEvidenceType = 'TELECOM_BILL';
  const payload = [{
    json: electricalBill,
    image: '',
  }, {
    json: waterBill,
    image: '',
  }, {
    json: telecomBill,
    image: '',
  }];

  const ajaxCallArr = [];
  axios.post.mockImplementationOnce((url, bodyFormData, config) => {
    ajaxCallArr.push({
      url,
      bodyFormData,
      config,
    });
  });

  const result = await uploadToGw(payload, '', '');

  ajaxCallArr.forEach((ajaxCall, index) => {
    const input = JSON.parse(ajaxCall.bodyFormData.get('input'));
    commonEvidenceExpected(input, payload[index].json);
    expect(ajaxCall).toHaveProperty('url', '/evidence/bill');
  });
});

test('uploadToGw:uploadStrategy:CUSTOMS', async () => {
  const payload = [{
    json: {
      gwEvidenceType: 'CUSTOMS_TAXABLE_EVIDENCE',
      buyerTaxId: 'buyerTaxId',
      reportingPeriod: 'reportingPeriod',
      deductionType: 'deductionType',
      isDeclareBusinessTax: true,
      taxType: 'taxType',
      taxableSalesValue: 0,
      dutyFreeSalesValue: 0,
      zeroTaxSalesValue: 0,
      businessTaxValue: 0,
      otherFee: 0,
      totalAmount: 0,
      totalPayAmount: 0,
      evidenceDate: 'date',
      carrierNumber: 'carrierNumber',
      declarationId: 'declarationId',
      groupName: 'groupName',
      remarkText: 'remarkText',
    },
    image: '',
  }];

  const ajaxCallArr = [];
  axios.post.mockImplementationOnce((url, bodyFormData, config) => {
    ajaxCallArr.push({
      url,
      bodyFormData,
      config,
    });
  });

  const result = await uploadToGw(payload, '', '');

  ajaxCallArr.forEach((ajaxCall) => {
    const input = ajaxCall.bodyFormData.get('input');
    expect(ajaxCall).toHaveProperty('url', '/evidence/customs');
    const expectedObj = {
      businessEntityTaxId: 'buyerTaxId',
      evidenceType: 'CUSTOMS_TAXABLE_EVIDENCE',
      reportingPeriod: 'reportingPeriod',
      deductionType: 'deductionType',
      isDeclareBusinessTax: true,
      buyerTaxId: 'buyerTaxId',
      taxType: 'taxType',
      taxableSalesValue: 0,
      zeroTaxSalesValue: null,
      dutyFreeSalesValue: 0,
      withoutTaxAmount: 0,
      businessTaxValue: 0,
      otherFee: 0,
      totalAmount: 0,
      totalPayAmount: 0,
      evidenceTimestamp: 'date',
      declarationId: 'declarationId',
    };
    expect(input).toEqual(JSON.stringify(expectedObj));
  });
});

test('uploadToGw successful', async () => {
  const commonGUI = {
    buyerTaxId: 'buyerTaxId',
    reportingPeriod: 'reportingPeriod',
    deductionType: 'deductionType',
    isDeclareBusinessTax: true,
    sellerTaxId: 'sellerTaxId',
    taxType: 'taxType',
    taxableSalesValue: 0,
    zeroTaxSalesValue: 0,
    dutyFreeSalesValue: 0,
    businessTaxValue: 0,
    totalAmount: 0,
    evidenceDate: 'date',
    evidenceNumber: 'evidenceNumber',
    remark: 'remark',
  };
  const eGUI = { ...commonGUI };
  eGUI.gwEvidenceType = 'EGUI';

  const payload = [{
    json: eGUI,
    image: '',
  }];
  axios.post.mockImplementationOnce(() => {

  });
  const result = await uploadToGw(payload, '', '');
  expect(result[0]).toHaveProperty('status', true);
});

test('uploadToGw error', async () => {
  const commonGUI = {
    buyerTaxId: 'buyerTaxId',
    reportingPeriod: 'reportingPeriod',
    deductionType: 'deductionType',
    isDeclareBusinessTax: true,
    sellerTaxId: 'sellerTaxId',
    taxType: 'taxType',
    taxableSalesValue: 0,
    zeroTaxSalesValue: 0,
    dutyFreeSalesValue: 0,
    businessTaxValue: 0,
    totalAmount: 0,
    evidenceDate: 'date',
    evidenceNumber: 'evidenceNumber',
    remark: 'remark',
  };
  const eGUI = { ...commonGUI };
  eGUI.gwEvidenceType = 'EGUI';

  const payload = [{
    json: eGUI,
    image: '',
  }];
  axios.post.mockImplementationOnce(() => {
    // throw new UserException('throw');
  });
  const result = await uploadToGw(payload, '', '');
  expect(result[0]).toHaveProperty('status', false);
});

function commonEvidenceExpected(input, source) {
  expect(input).toHaveProperty('businessEntityTaxId', source.buyerTaxId);
  expect(input).toHaveProperty('evidenceType', source.gwEvidenceType);
  expect(input).toHaveProperty('reportingPeriod', source.reportingPeriod);
  expect(input).toHaveProperty('deductionType', source.deductionType);
  expect(input).toHaveProperty('buyerTaxId', source.buyerTaxId);
  expect(input).toHaveProperty('sellerTaxId', source.sellerTaxId);
  expect(input).toHaveProperty('taxType', source.taxType);
  expect(input).toHaveProperty('isDeclareBusinessTax', source.isDeclareBusinessTax);
  expect(input).toHaveProperty('taxableSalesValue', source.taxableSalesValue);
  expect(input).toHaveProperty(
    'withoutTaxAmount',
    parseInt(source.taxableSalesValue) + parseInt(source.zeroTaxSalesValue) + parseInt(source.dutyFreeSalesValue),
  );
  expect(input).toHaveProperty('zeroTaxSalesValue', source.zeroTaxSalesValue);
  expect(input).toHaveProperty('dutyFreeSalesValue', source.dutyFreeSalesValue);
  expect(input).toHaveProperty('businessTaxValue', source.businessTaxValue);
  expect(input).toHaveProperty('totalAmount', source.totalAmount);
  expect(input).toHaveProperty('evidenceTimestamp', source.evidenceDate);
}
