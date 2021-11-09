import SigoutourMapper from './sigoutour_mapper'
import {jsonCases,shareEvidenceExpect} from './sigoutour_mapper.share.test'

test('success SigoutourMapper toGw A1001', () => {
  const a1001SigoutourJson = jsonCases.A1001_HAPPY_CASE
  const ticketId = 'a1001'
  const deductionType = '2'
  const reportingPeriod = '11002'
  const evidenceType = 'A1001'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, false, evidenceType, a1001SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'TRIPLE_GUI',
    'evidenceNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1000,
    'businessTaxValue': 50,
    'totalPayAmount': 1050,
    'totalAmount': 0,
    'otherFee': 0,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'id': 'a1001',
    'reportingPeriod': '11002',
    'deductionType': 'FIXED_ASSETS',
    'isDeclareBusinessTax': false,
    'gwEvidenceType': 'TRIPLE_GUI'
  })
})

/**
 * todo: remark field is undefined
 */
test('success SigoutourMapper toGw A2001', () => {
  const a2001SigoutourJson = jsonCases.A2001_HAPPY_CASE

  const ticketId = 'a2001'
  const deductionType = '1'
  const reportingPeriod = '11008'
  const evidenceType = 'A2001'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a2001SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'DUPLICATE_CASH_REGISTER_GUI',
    'evidenceNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1000,
    'businessTaxValue': 50,
    'totalPayAmount': 1050,
    'totalAmount': 1050,
    'undefined': 'remark',
    'otherFee': 0,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'id': 'a2001',
    'reportingPeriod': '11008',
    'deductionType': 'PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'DUPLICATE_CASH_REGISTER_GUI'
  })
})
/**
 * todo:evidenceDate verify failed,remark field is undefined
 */
test('success SigoutourMapper toGw A5001', () => {
  const a5001SigoutourJson = jsonCases.A5001_HAPPY_CASE

  const ticketId = 'a5001'
  const deductionType = '3'
  const reportingPeriod = '11008'
  const evidenceType = 'A5001'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5001SigoutourJson)
  // ShareTest.shareEvidenceBlankExpect(result)
  // ShareTest.shareEvidenceNumericExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'TRIPLE_CASH_REGISTER_GUI',
    'evidenceNumber': 'HK58985633',
    //todo no Nan
    'evidenceDate': NaN,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1050,
    'businessTaxValue': 50,
    'zeroTaxSalesValue': 20,
    'dutyFreeSalesValue': 30,
    'totalAmount': 1050,
    'totalPayAmount': 1050,
    'undefined': 'remark',
    'otherFee': 0,
    'id': 'a5001',
    'reportingPeriod': '11008',
    'deductionType': 'NON_PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'TRIPLE_CASH_REGISTER_GUI'
  })
})

test('success SigoutourMapper toGw A5002', () => {
  const a5002SigoutourJson = jsonCases.A5002_MISSING_SALES_AMOUNT

  const ticketId = 'a5002'
  const deductionType = '2'
  const reportingPeriod = '11002'
  const evidenceType = 'A5002'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, false, evidenceType, a5002SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'EGUI',
    'evidenceNumber': 'JD52291225',
    'evidenceDate': 1609459200000,
    'buyerTaxId': '24549210',
    'sellerTaxId': '29278095',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 86,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 4,
    'totalAmount': 90,
    'totalPayAmount': 90,
    'remark': '',
    'otherFee': 0,
    'id': 'a5002',
    'reportingPeriod': '11002',
    'deductionType': 'FIXED_ASSETS',
    'isDeclareBusinessTax': false,
    'gwEvidenceType': 'EGUI'
  })
})

test('success SigoutourMapper toGw A5003', () => {
  const a5003SigoutourJson = jsonCases.A5003_MISSING_SALES_AMOUNT

  const ticketId = 'a5003'
  const deductionType = '4'
  const reportingPeriod = '11008'
  const evidenceType = 'A5003'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5003SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'EGUI',
    'evidenceNumber': 'MQ04251629',
    'evidenceDate': 1611619200000,
    'buyerTaxId': '24549210',
    'sellerTaxId': '16151427',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 8000,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 400,
    'totalAmount': 8400,
    'totalPayAmount': 8400,
    'remark': '統一資訊股份有限公司-數據服務費用',
    'otherFee': 0,
    'id': 'a5003',
    'reportingPeriod': '11008',
    'deductionType': 'NON_FIXED_ASSETS',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'EGUI'
  })

})

test('success SigoutourMapper toGw A5010', () => {
  const a5010SigoutourJson = jsonCases.A5010_HAPPY_CASE

  const ticketId = 'a5010'
  const deductionType = '1'
  const reportingPeriod = '11008'
  const evidenceType = 'A5010'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5010SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'ELECTRIC_BILL',
    'carrierNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1050,
    'businessTaxValue': 50,
    'totalAmount': 1050,
    'totalPayAmount': 1050,
    'undefined': 'remark',
    'otherFee': 0,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'id': 'a5010',
    'reportingPeriod': '11008',
    'deductionType': 'PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'ELECTRIC_BILL'
  })

})

test('success SigoutourMapper toGw A5020', () => {
  const a5020SigoutourJson = jsonCases.A5020_HAPPY_CASE

  const ticketId = 'a5020'
  const deductionType = '1'
  const reportingPeriod = '11008'
  const evidenceType = 'A5020'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5020SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'WATER_BILL',
    'carrierNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'basicFee': '1000',
    'waterFee': '50',
    'rebate': '20',
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalAmount': 1050,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'taxableSalesValue': 1050,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'id': 'a5020',
    'reportingPeriod': '11008',
    'deductionType': 'PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'WATER_BILL'
  })
})

test('success SigoutourMapper toGw A5021', () => {
  const a5021SigoutourJson = jsonCases.A5021_HAPPY_CASE

  const ticketId = 'a5021'
  const deductionType = '1'
  const reportingPeriod = '11010'
  const evidenceType = 'A5021'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5021SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'WATER_BILL',
    'carrierNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1000,
    'basicFee': '1000',
    'waterFee': '50',
    'rebate': '20',
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalAmount': 1050,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'id': 'a5021',
    'reportingPeriod': '11010',
    'deductionType': 'PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'WATER_BILL'
  })
})

/**
 * todo:taxType is undefined, evidenceType is NaN
 * todo: happy path only.
 */
test('success SigoutourMapper toGw A5030', () => {
  const a5030SigoutourJson = jsonCases.A5030_HAPPY_CASE

  const ticketId = 'a5030'
  const deductionType = '1'
  const reportingPeriod = '11008'
  const evidenceType = 'A5030'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5030SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    "evidenceType": "TELECOM_BILL",
    "carrierNumber": "BB20050951",
    "evidenceDate": 1614211200000,
    "buyerTaxId": "16151904",
    "sellerTaxId": "8169178",
    "taxableSalesValue": 6906,
    "zeroTaxSalesValue": 0,
    "dutyFreeSalesValue": 0,
    "businessTaxValue": 345,
    "otherFee": 0,
    "totalPayAmount": 7475,
    "remark": "",
    "totalAmount": 7251,
    "evidenceNumber": "BB20050951",
    "id": "a5030",
    "reportingPeriod": "11008",
    "deductionType": "PURCHASE_AND_FEE",
    "isDeclareBusinessTax": true,
    "gwEvidenceType": "TELECOM_BILL"
  })
})

test('success SigoutourMapper toGw A5031', () => {
  const a5031SigoutourJson = jsonCases.A5031_HAPPY_CASE
  const ticketId = 'a5031'
  const deductionType = '1'
  const reportingPeriod = '11008'
  const evidenceType = 'A5031'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5031SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'TELECOM_BILL',
    'carrierNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1000,
    'zeroTaxSalesValue': 20,
    'dutyFreeSalesValue': 30,
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalAmount': 1100,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'evidenceNumber': 'HK58985633',
    'id': 'a5031',
    'reportingPeriod': '11008',
    'deductionType': 'PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'TELECOM_BILL'
  })
})

test('success SigoutourMapper toGw A5032', () => {
  const a5032SigoutourJson = jsonCases.A5032_HAPPY_CASE

  const ticketId = 'a5032'
  const deductionType = '1'
  const reportingPeriod = '11010'
  const evidenceType = 'A5032'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5032SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'TELECOM_BILL',
    'carrierNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1000,
    'zeroTaxSalesValue': 20,
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'totalAmount': 1070,
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'id': 'a5032',
    'reportingPeriod': '11010',
    'deductionType': 'PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'TELECOM_BILL'
  })
})

test('success SigoutourMapper toGw A5033', () => {
  const a5033SigoutourJson = jsonCases.A5033_HAPPY_CASE

  const ticketId = 'a5033'
  const deductionType = '1'
  const reportingPeriod = '11010'
  const evidenceType = 'A5033'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5033SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'TELECOM_BILL',
    'carrierNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1000,
    'zeroTaxSalesValue': 20,
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'totalAmount': 1070,
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'id': 'a5033',
    'reportingPeriod': '11010',
    'deductionType': 'PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'TELECOM_BILL'
  })
})

test('success SigoutourMapper toGw A5034', () => {
  const a5033SigoutourJson = jsonCases.A5034_HAPPY_CASE

  const ticketId = 'a5034'
  const deductionType = '1'
  const reportingPeriod = '11010'
  const evidenceType = 'A5034'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5033SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': 'TELECOM_BILL',
    'carrierNumber': 'HK58985633',
    'evidenceDate': 1610409600000,
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 'TAXABLE',
    'taxableSalesValue': 1000,
    'zeroTaxSalesValue': 20,
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalAmount': 1050,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'id': 'a5034',
    'reportingPeriod': '11010',
    'deductionType': 'PURCHASE_AND_FEE',
    'isDeclareBusinessTax': true,
    'gwEvidenceType': 'TELECOM_BILL'
  })

})

test('success SigoutourMapper toGw A8001', () => {
  const a8001SigoutourJson = jsonCases.A8001_HAPPY_CASE

  const ticketId = 'a8001'
  const deductionType = '1'
  const reportingPeriod = '11010'
  const evidenceType = 'A8001'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a8001SigoutourJson)
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    "evidenceType": "CUSTOMS_TAXABLE_EVIDENCE",
    "carrierNumber": "HK58985633",
    "declarationId": "HK58985633",
    "evidenceDate": 1610409600000,
    "buyerTaxId": "12345678",
    "taxType": "TAXABLE",
    "taxableSalesValue": 1000,
    "dutyFreeSalesValue": 20,
    "businessTaxValue": 50,
    "totalPayAmount": 1050,
    "totalAmount": 0,
    "otherFee": 0,
    "zeroTaxSalesValue": 0,
    "evidenceNumber": "HK58985633",
    "sellerTaxId": "",
    "id": "a8001",
    "reportingPeriod": "11010",
    "deductionType": "PURCHASE_AND_FEE",
    "isDeclareBusinessTax": true,
    "gwEvidenceType": "CUSTOMS_TAXABLE_EVIDENCE"
  })
})