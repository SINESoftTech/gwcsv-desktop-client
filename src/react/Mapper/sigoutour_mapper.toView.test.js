import SigoutourMapper from './sigoutour_mapper'
import {jsonCases,shareEvidenceExpect,totalAmountSummaryExpect,a5020TypeNumericExpect} from './sigoutour_mapper.share.test'


test('success SigoutourMapper toView 中華電信 5030', () => {
  const ticketId = '123'
  const deductionType = '123'
  const reportingPeriod = '11002'
  const sigoutourJson = jsonCases.A5030_MISSING_TAX_TYPE
  const evidenceType = 'A5030'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, sigoutourJson)

  expect(result).toMatchObject({
    evidenceType: '電信費帳單-中華電信',
    carrierNumber: 'BB20050951',
    evidenceDate: undefined,
    buyerTaxId: '16151904',
    sellerTaxId: '8169178',
    taxType: '',
    taxableSalesValue: 6906,
    zeroTaxSalesValue: 0,
    dutyFreeSalesValue: 0,
    businessTaxValue: 345,
    otherFee: 0,
    totalPayAmount: 7475,
    remark: '',
    totalAmount: 7251,
    evidenceNumber: 'BB20050951',
    reportingPeriod: '11002',
    deductionType: '123',
    ticketId: '123',
    errorMsg: undefined
  })
})

test('success SigoutourMapper toView 5003', () => {
  const ticketId = '123'
  const deductionType = '123'
  const reportingPeriod = '11002'
  const sigoutourJson = jsonCases.A5003_MISSING_SALES_AMOUNT
  const evidenceType = 'A5003'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, sigoutourJson)
  expect(result).toMatchObject({
    evidenceType: '電子發票證明聯-格式二',
    evidenceNumber: 'MQ04251629',
    evidenceDate: '20210126',
    buyerTaxId: '24549210',
    sellerTaxId: '16151427',
    taxType: 1,
    taxableSalesValue: 8000,
    zeroTaxSalesValue: 0,
    dutyFreeSalesValue: 0,
    businessTaxValue: 400,
    totalAmount: 8400,
    totalPayAmount: 8400,
    remark: '統一資訊股份有限公司-數據服務費用',
    otherFee: 0,
    reportingPeriod: '11002',
    deductionType: '123',
    ticketId: '123',
    errorMsg: undefined
  })
})

test('success SigoutourMapper toView A5001', () => {
  const a5001SigoutourJson = jsonCases.A5001_HAPPY_CASE

  const ticketId = 'a5001'
  const deductionType = 'a5001'
  const reportingPeriod = '11008'
  const evidenceType = 'A5001'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5001SigoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': '三聯式收銀機發票',
    'evidenceNumber': 'HK58985633',
    'evidenceDate': '',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
    'taxableSalesValue': 1050,
    'businessTaxValue': 50,
    'zeroTaxSalesValue': 20,
    'dutyFreeSalesValue': 30,
    'totalAmount': 1050,
    'totalPayAmount': 1050,
    'undefined': 'remark',
    'otherFee': 0,
    'reportingPeriod': '11008',
    'deductionType': 'a5001',
    'ticketId': 'a5001',
    'gwEvidenceType': '三聯式收銀機發票'
  })
})

test('success SigoutourMapper toView A5010', () => {
  const a5010SigoutourJson = jsonCases.A5010_HAPPY_CASE

  const ticketId = 'a5010'
  const deductionType = 'a5010'
  const reportingPeriod = '11008'
  const evidenceType = 'A5010'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5010SigoutourJson)

  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': '電力帳單',
    'carrierNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
    'taxableSalesValue': 1050,
    'businessTaxValue': 50,
    'totalAmount': 1050,
    'totalPayAmount': 1050,
    'undefined': 'remark',
    'otherFee': 0,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'reportingPeriod': '11008',
    'deductionType': 'a5010',
    'ticketId': 'a5010',
    'gwEvidenceType': '電力帳單'
  })
})

test('success SigoutourMapper toView A5020', () => {
  const a5020SigoutourJson = jsonCases.A5020_HAPPY_CASE

  const ticketId = 'a5020'
  const deductionType = 'a5020'
  const reportingPeriod = '11004'
  const evidenceType = 'A5020'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5020SigoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceExpect(result)
  a5020TypeNumericExpect(result)

  expect(result).toMatchObject({
    'evidenceType': '水費帳單-台灣自來水',
    'carrierNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
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
    'reportingPeriod': '11004',
    'deductionType': 'a5020',
    'ticketId': 'a5020',
    'gwEvidenceType': '水費帳單-台灣自來水'
  })
})

test('success SigoutourMapper toView A5021', () => {
  const a5021SigoutourJson = jsonCases.A5021_HAPPY_CASE

  const ticketId = 'a5021'
  const deductionType = 'a5021'
  const reportingPeriod = '11004'
  const evidenceType = 'A5021'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5021SigoutourJson)
  shareEvidenceExpect(result)
  a5020TypeNumericExpect(result)

  expect(result).toMatchObject({
    'evidenceType': '水費帳單-台北自來水',
    'carrierNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
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
    'reportingPeriod': '11004',
    'deductionType': 'a5021',
    'ticketId': 'a5021',
    'gwEvidenceType': '水費帳單-台北自來水'
  })
})

test('success SigoutourMapper toView A5031', () => {
  const a5031SigoutourJson = jsonCases.A5031_HAPPY_CASE

  const ticketId = 'a5031'
  const deductionType = 'a5031'
  const reportingPeriod = '11010'
  const evidenceType = 'A5031'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5031SigoutourJson)
  shareEvidenceExpect(result)
  totalAmountSummaryExpect(result, 1100)

  expect(result).toMatchObject({
    'evidenceType': '電信費帳單-台灣大哥大',
    'carrierNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
    'taxableSalesValue': 1000,
    'zeroTaxSalesValue': 20,
    'dutyFreeSalesValue': 30,
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalAmount': 1100,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'evidenceNumber': 'HK58985633',
    'reportingPeriod': '11010',
    'deductionType': 'a5031',
    'ticketId': 'a5031',
    'gwEvidenceType': '電信費帳單-台灣大哥大'
  })

})

test('success SigoutourMapper toView A5032', () => {
  const a5032SigoutourJson = jsonCases.A5032_HAPPY_CASE

  const ticketId = 'a5032'
  const deductionType = 'a5032'
  const reportingPeriod = '11010'
  const evidenceType = 'A5032'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5032SigoutourJson)

  shareEvidenceExpect(result)
  totalAmountSummaryExpect(result, 1070)

  expect(result).toMatchObject({
    'evidenceType': '電信費帳單-遠傳',
    'carrierNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
    'taxableSalesValue': 1000,
    'zeroTaxSalesValue': 20,
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'totalAmount': 1070,
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'reportingPeriod': '11010',
    'deductionType': 'a5032',
    'ticketId': 'a5032',
    'gwEvidenceType': '電信費帳單-遠傳'
  })

})

test('success SigoutourMapper toView A5033', () => {
  const a5033SigoutourJson = jsonCases.A5033_HAPPY_CASE
  const ticketId = 'a5033'
  const deductionType = 'a5033'
  const reportingPeriod = '11010'
  const evidenceType = 'A5033'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5033SigoutourJson)

  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceExpect(result)
  totalAmountSummaryExpect(result, 1070)

  expect(result).toMatchObject({
    'evidenceType': '電信費帳單-台灣之星',
    'carrierNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
    'taxableSalesValue': 1000,
    'zeroTaxSalesValue': 20,
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'totalAmount': 1070,
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'reportingPeriod': '11010',
    'deductionType': 'a5033',
    'ticketId': 'a5033',
    'gwEvidenceType': '電信費帳單-台灣之星'
  })

})

test('success SigoutourMapper toView A5034', () => {
  const a5034SigoutourJson = jsonCases.A5034_HAPPY_CASE
  const ticketId = 'a5034'
  const deductionType = 'a5034'
  const reportingPeriod = '11006'
  const evidenceType = 'A5034'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5034SigoutourJson)

  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': '電信費帳單-亞太',
    'carrierNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
    'taxableSalesValue': 1000,
    'zeroTaxSalesValue': 20,
    'businessTaxValue': 50,
    'otherFee': 15,
    'totalAmount': 1050,
    'totalPayAmount': 1050,
    'remark': 'remark',
    'dutyFreeSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'reportingPeriod': '11006',
    'deductionType': 'a5034',
    'ticketId': 'a5034',
    'gwEvidenceType': '電信費帳單-亞太'
  })
})

test('success SigoutourMapper toView A8001', () => {
  const a8001igoutourJson = jsonCases.A8001_HAPPY_CASE

  const ticketId = 'A8001'
  const deductionType = 'A8001'
  const reportingPeriod = '11006'
  const evidenceType = 'A8001'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a8001igoutourJson)

  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': '海關代徵營業稅繳納證',
    'carrierNumber': 'HK58985633',
    'declarationId': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'taxType': 1,
    'taxableSalesValue': 1000,
    'dutyFreeSalesValue': 20,
    'businessTaxValue': 50,
    'totalPayAmount': 1050,
    'totalAmount': 0,
    'otherFee': 0,
    'zeroTaxSalesValue': 0,
    'evidenceNumber': 'HK58985633',
    'sellerTaxId': '',
    'reportingPeriod': '11006',
    'deductionType': 'A8001',
    'ticketId': 'A8001',
    'gwEvidenceType': '海關代徵營業稅繳納證'
  })
})

test('success SigoutourMapper toView A2001', () => {
  const a2001SigoutourJson = jsonCases.A2001_HAPPY_CASE

  const ticketId = '123'
  const deductionType = '123'
  const reportingPeriod = '11002'
  const evidenceType = 'A2001'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a2001SigoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'evidenceType': '二聯式收銀發票',
    'evidenceNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
    'taxableSalesValue': 1000,
    'businessTaxValue': 50,
    'totalPayAmount': 1050,
    'totalAmount': 1050,
    'undefined': 'remark',
    'otherFee': 0,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'reportingPeriod': '11002',
    'deductionType': '123',
    'ticketId': '123',
    'gwEvidenceType': '二聯式收銀發票'
  })
})

test('success SigoutourMapper toView A1001', () => {
  const a1001SigoutourJson = jsonCases.A1001_HAPPY_CASE

  const ticketId = '123'
  const deductionType = '123'
  const reportingPeriod = '11002'
  const evidenceType = 'A1001'

  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a1001SigoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }

  shareEvidenceExpect(result)

  /**
   * specific case mapping
   */
  expect(result).toMatchObject({
    'evidenceType': '三聯式統一發票',
    'evidenceNumber': 'HK58985633',
    'evidenceDate': '20210112',
    'buyerTaxId': '12345678',
    'sellerTaxId': '12345679',
    'taxType': 1,
    'taxableSalesValue': 1000,
    'businessTaxValue': 50,
    'totalPayAmount': 1050,
    'totalAmount': 0,
    'otherFee': 0,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'reportingPeriod': '11002',
    'deductionType': '123',
    'ticketId': '123',
    'gwEvidenceType': '三聯式統一發票'
  })
})

/**
 * todo: 如果辨識結果中一個欄位都沒有出現，則evidenceType連原來給的也不會帶回來
 */
test('verify failed empty result toView A1001', () => {
  const a1001SigoutourJson = jsonCases.A1001_FAIL_CASE_1

  const ticketId = 'a1001failed'
  const deductionType = 'a1001failed'
  const reportingPeriod = '11006'
  const evidenceType = 'A1001'

  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a1001SigoutourJson)

  shareEvidenceExpect(result)

  expect(result).toMatchObject({
    'sellerTaxId': '',
    'buyerTaxId': '',
    'taxType': '',
    'evidenceType': '',
    'reportingPeriod': '11006',
    'deductionType': 'a1001failed',
    'ticketId': 'a1001failed',
    'gwEvidenceType': '三聯式統一發票'
  })
})

test('success toSigoutour 5002', () => {
  const editData = {
    evidenceType: '電子發票證明聯-格式一',
    evidenceNumber: 'JD52291226',
    evidenceDate: '20210101',
    buyerTaxId: '24549210',
    sellerTaxId: '29278095',
    taxType: 1,
    taxableSalesValue: 86,
    zeroTaxSalesValue: 0,
    dutyFreeSalesValue: 0,
    businessTaxValue: 4,
    totalAmount: 90,
    totalPayAmount: 90,
    remark: '',
    otherFee: 0,
    reportingPeriod: '11002',
    deductionType: '123',
    ticketId: '123',
    errorMsg: undefined
  }
  const sigoutourJson = jsonCases.A5002_MISSING_SALES_AMOUNT
  const result = SigoutourMapper.toSigoutour(sigoutourJson, editData)
  expect(result).toMatchObject({
    'ticket': '0818085909997119',
    'pageList': [
      {
        'page': '0818085909997119_1',
        'photoList': [
          {
            'photo': '0818085909997119_1_1',
            'type': 'A5002',
            'x': 0,
            'y': 87,
            'w': 677,
            'h': 2101,
            'result': [
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'invoiceNumber',
                'key': 'KEY_INVN',
                'text': 'JD52291226',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'invoiceDate',
                'key': 'KEY_INVD',
                'text': '20210101',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'buyer',
                'key': 'KEY_BUY',
                'text': '24549210',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'seller',
                'key': 'KEY_SEL',
                'text': '29278095',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'taxType',
                'key': 'KEY_TXT',
                'text': 1,
                'score': null
              },
              {
                'x': 31,
                'y': 1211,
                'w': 204,
                'h': 35,
                'name': 'salesAmount',
                'key': 'KEY_SALA',
                'text': 86,
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'zeroTaxSalesAmount',
                'key': 'KEY_ZTSA',
                'text': 0,
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'freeTaxSalesAmount',
                'key': 'KEY_FTSA',
                'text': 0,
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'taxAmount',
                'key': 'KEY_TAXA',
                'text': 4,
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'totalAmount',
                'key': 'KEY_TOTA',
                'text': 90,
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'payAmount',
                'key': 'KEY_PAYA',
                'text': 90,
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'remark',
                'key': 'KEY_REM',
                'text': '',
                'score': null
              }
            ]
          }
        ]
      }
    ]
  })
})
test('success toSigoutour 中華電信', () => {
  const editData = {
    'evidenceType': '電信費帳單-中華電信',
    'carrierNumber': 'BB20050952',
    'evidenceDate': '1090225',
    'buyerTaxId': '16151904',
    'sellerTaxId': '8169178',
    'taxType': '',
    'taxableSalesValue': 6906,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 345,
    'otherFee': 0,
    'totalPayAmount': 7475,
    'remark': '',
    'totalAmount': 7251,
    'evidenceNumber': 'BB20050952',
    'reportingPeriod': '11002',
    'deductionType': '1',
    'ticketId': '0907175959174992',
    'cellHighlight': ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'taxType', 'businessTaxValue', 'totalAmount', 'otherFee', 'totalPayAmount', 'sellerTaxId', 'buyerTaxId', 'evidenceDate'],
    'sn': 1,
    'id': '0907175959174992'
  }
  const sigoutourJson = {
    'ticket': '0907175959174992', 'pageList': [{
      'page': '0907175959174992_1', 'photoList': [{
        'photo': '0907175959174992_1_1',
        'type': 'A5030',
        'x': 1,
        'y': 1,
        'w': 2422,
        'h': 2807,
        'result': [{
          'x': 1077,
          'y': 307,
          'w': 319,
          'h': 36,
          'name': 'commonNumber',
          'key': 'KEY_COMN',
          'text': 'BB20050951',
          'score': [1, 0.86, 1, 0.986, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.686, 1, 0.972]
        }, {
          'x': 614,
          'y': 423,
          'w': 176,
          'h': 39,
          'name': 'invoiceDate',
          'key': 'KEY_INVD',
          'text': '1090225',
          'score': [0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98]
        }, {
          'x': 46,
          'y': 1145,
          'w': 474,
          'h': 35,
          'name': 'buyer',
          'key': 'KEY_BUY',
          'text': '16151904',
          'score': [1, 1, 1, 1, 1, 1, 0.998, 1]
        }, {
          'x': 1062,
          'y': 177,
          'w': 334,
          'h': 35,
          'name': 'seller',
          'key': 'KEY_SEL',
          'text': '8169178',
          'score': [1, 1, 0.977, 1, 1, 1, 1]
        }, {
          'x': 0,
          'y': 0,
          'w': 0,
          'h': 0,
          'name': 'taxType',
          'key': 'KEY_TXT',
          'text': '',
          'score': [0]
        }, {
          'x': 124,
          'y': 2498,
          'w': 379,
          'h': 31,
          'name': 'salesAmount',
          'key': 'KEY_SALA',
          'text': 6906,
          'score': [1, 1, 1, 0.999]
        }, {
          'x': 0,
          'y': 0,
          'w': 0,
          'h': 0,
          'name': 'zeroTaxSalesAmount',
          'key': 'KEY_ZTSA',
          'text': 0,
          'score': [0]
        }, {
          'x': 0,
          'y': 0,
          'w': 0,
          'h': 0,
          'name': 'freeTaxSalesAmount',
          'key': 'KEY_FTSA',
          'text': 0,
          'score': [0]
        }, {
          'x': 124,
          'y': 2531,
          'w': 809,
          'h': 29,
          'name': 'taxAmount',
          'key': 'KEY_TAXA',
          'text': 345,
          'score': [0.98, 0.98, 0.98]
        }, {
          'x': 1158,
          'y': 2497,
          'w': 300,
          'h': 33,
          'name': 'otherFee',
          'key': 'KEY_OTHF',
          'text': 0,
          'score': [1]
        }, {
          'x': 182,
          'y': 426,
          'w': 210,
          'h': 44,
          'name': 'payAmount',
          'key': 'KEY_PAYA',
          'text': 7475,
          'score': [1, 1, 1, 1]
        }, { 'x': 0, 'y': 0, 'w': 0, 'h': 0, 'name': 'remark', 'key': 'KEY_REM', 'text': '', 'score': [0] }]
      }]
    }]
  }
  const result = SigoutourMapper.toSigoutour(sigoutourJson, editData)
  expect(result).toMatchObject({
      "ticket": "0907175959174992",
      "pageList": [
        {
          "page": "0907175959174992_1",
          "photoList": [
            {
              "photo": "0907175959174992_1_1",
              "type": "A5030",
              "x": 1,
              "y": 1,
              "w": 2422,
              "h": 2807,
              "result": [
                {
                  "x": 1077,
                  "y": 307,
                  "w": 319,
                  "h": 36,
                  "name": "commonNumber",
                  "key": "KEY_COMN",
                  "text": "BB20050952",
                  "score": [
                    1,
                    0.86,
                    1,
                    0.986,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    0.686,
                    1,
                    0.972
                  ]
                },
                {
                  "x": 614,
                  "y": 423,
                  "w": 176,
                  "h": 39,
                  "name": "invoiceDate",
                  "key": "KEY_INVD",
                  "text": "1090225",
                  "score": [
                    0.98,
                    0.98,
                    0.98,
                    0.98,
                    0.98,
                    0.98,
                    0.98
                  ]
                },
                {
                  "x": 46,
                  "y": 1145,
                  "w": 474,
                  "h": 35,
                  "name": "buyer",
                  "key": "KEY_BUY",
                  "text": "16151904",
                  "score": [
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    0.998,
                    1
                  ]
                },
                {
                  "x": 1062,
                  "y": 177,
                  "w": 334,
                  "h": 35,
                  "name": "seller",
                  "key": "KEY_SEL",
                  "text": "8169178",
                  "score": [
                    1,
                    1,
                    0.977,
                    1,
                    1,
                    1,
                    1
                  ]
                },
                {
                  "x": 0,
                  "y": 0,
                  "w": 0,
                  "h": 0,
                  "name": "taxType",
                  "key": "KEY_TXT",
                  "text": "",
                  "score": [
                    0
                  ]
                },
                {
                  "x": 124,
                  "y": 2498,
                  "w": 379,
                  "h": 31,
                  "name": "salesAmount",
                  "key": "KEY_SALA",
                  "text": 6906,
                  "score": [
                    1,
                    1,
                    1,
                    0.999
                  ]
                },
                {
                  "x": 0,
                  "y": 0,
                  "w": 0,
                  "h": 0,
                  "name": "zeroTaxSalesAmount",
                  "key": "KEY_ZTSA",
                  "text": 0,
                  "score": [
                    0
                  ]
                },
                {
                  "x": 0,
                  "y": 0,
                  "w": 0,
                  "h": 0,
                  "name": "freeTaxSalesAmount",
                  "key": "KEY_FTSA",
                  "text": 0,
                  "score": [
                    0
                  ]
                },
                {
                  "x": 124,
                  "y": 2531,
                  "w": 809,
                  "h": 29,
                  "name": "taxAmount",
                  "key": "KEY_TAXA",
                  "text": 345,
                  "score": [
                    0.98,
                    0.98,
                    0.98
                  ]
                },
                {
                  "x": 1158,
                  "y": 2497,
                  "w": 300,
                  "h": 33,
                  "name": "otherFee",
                  "key": "KEY_OTHF",
                  "text": 0,
                  "score": [
                    1
                  ]
                },
                {
                  "x": 182,
                  "y": 426,
                  "w": 210,
                  "h": 44,
                  "name": "payAmount",
                  "key": "KEY_PAYA",
                  "text": 7475,
                  "score": [
                    1,
                    1,
                    1,
                    1
                  ]
                },
                {
                  "x": 0,
                  "y": 0,
                  "w": 0,
                  "h": 0,
                  "name": "remark",
                  "key": "KEY_REM",
                  "text": "",
                  "score": [
                    0
                  ]
                },
                {
                  "key": "KEY_EVIDENCE_DATE",
                  "text": "1090225"
                }
              ]
            }
          ]
        }
      ]
    }
  )
})
