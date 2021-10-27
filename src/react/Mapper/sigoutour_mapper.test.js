import SigoutourMapper, { reverseIndex } from './sigoutour_mapper'


test('success reverseIndex', () => {
  const json = {
    'key': 'value'
  }
  const result = reverseIndex(json)
  expect(result).toMatchObject({
    'value': 'key'
  })
})

test('success SigoutourMapper toView 5002', () => {
  const ticketId = '123'
  const deductionType = '123'
  const reportingPeriod = '11002'
  const sigoutourJson = {
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
                'text': 'JD52291225',
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
                'text': '86',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'zeroTaxSalesAmount',
                'key': 'KEY_ZTSA',
                'text': '',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'freeTaxSalesAmount',
                'key': 'KEY_FTSA',
                'text': '',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'taxAmount',
                'key': 'KEY_TAXA',
                'text': '4',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'totalAmount',
                'key': 'KEY_TOTA',
                'text': '90',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'payAmount',
                'key': 'KEY_PAYA',
                'text': '90',
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
  }
  const evidenceType = 'A5002'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, sigoutourJson)

  expect(result).toMatchObject({
    evidenceType: '電子發票證明聯-格式一',
    evidenceNumber: 'JD52291225',
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
  })
})
test('success SigoutourMapper toView 中華電信', () => {
  const ticketId = '123'
  const deductionType = '123'
  const reportingPeriod = '11002'
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
  const evidenceType = 'A5030'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, sigoutourJson)

  expect(result).toMatchObject({
    evidenceType: '電信費帳單-中華電信',
    carrierNumber: 'BB20050951',
    evidenceDate: '1090225',
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
  const sigoutourJson = {
    'ticket': '0825151837533806',
    'pageList': [
      {
        'page': '0825151837533806_1',
        'photoList': [
          {
            'photo': '0825151837533806_1_1',
            'type': 'A5003',
            'x': 1,
            'y': 1,
            'w': 2481,
            'h': 3506,
            'result': [
              {
                'x': 63,
                'y': 208,
                'w': 239,
                'h': 26,
                'name': 'invoiceNumber',
                'key': 'KEY_INVN',
                'text': 'MQ04251629',
                'score': [
                  1,
                  1,
                  0.94,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0.999,
                  1
                ]
              },
              {
                'x': 571,
                'y': 211,
                'w': 129,
                'h': 26,
                'name': 'invoiceDate',
                'key': 'KEY_INVD',
                'text': '20210126',
                'score': [
                  1,
                  0.993,
                  1,
                  0.999,
                  1,
                  0.988,
                  0.947,
                  1,
                  1,
                  0.965
                ]
              },
              {
                'x': 63,
                'y': 265,
                'w': 207,
                'h': 27,
                'name': 'buyer',
                'key': 'KEY_BUY',
                'text': '24549210',
                'score': [
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0.999
                ]
              },
              {
                'x': 874,
                'y': 1599,
                'w': 255,
                'h': 26,
                'name': 'seller',
                'key': 'KEY_SEL',
                'text': '16151427',
                'score': [
                  0.636,
                  1,
                  0.806,
                  1,
                  0.974,
                  1,
                  1,
                  1
                ]
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'taxType',
                'key': 'KEY_TXT',
                'text': '1',
                'score': [
                  0.98
                ]
              },
              {
                'x': 875,
                'y': 1527,
                'w': 318,
                'h': 25,
                'name': 'salesAmount',
                'key': 'KEY_SALA',
                'text': '8000',
                'score': [
                  1,
                  1,
                  0.995,
                  0.816
                ]
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'zeroTaxSalesAmount',
                'key': 'KEY_ZTSA',
                'text': '',
                'score': [
                  0
                ]
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'freeTaxSalesAmount',
                'key': 'KEY_FTSA',
                'text': '',
                'score': [
                  0
                ]
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'taxAmount',
                'key': 'KEY_TAXA',
                'text': '400',
                'score': [
                  0.98
                ]
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'totalAmount',
                'key': 'KEY_TOTA',
                'text': '8400',
                'score': [
                  0.98,
                  0.98,
                  0.98,
                  0.98
                ]
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'payAmount',
                'key': 'KEY_PAYA',
                'text': '8400',
                'score': [
                  0.98,
                  0.98,
                  0.98,
                  0.98
                ]
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'remark',
                'key': 'KEY_REM',
                'text': '統一資訊股份有限公司-數據服務費用',
                'score': [
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98,
                  0.98
                ]
              }
            ]
          }
        ]
      }
    ]
  }
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
  const sigoutourJson = {
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
                'text': 'JD52291225',
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
                'text': '86',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'zeroTaxSalesAmount',
                'key': 'KEY_ZTSA',
                'text': '',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'freeTaxSalesAmount',
                'key': 'KEY_FTSA',
                'text': '',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'taxAmount',
                'key': 'KEY_TAXA',
                'text': '4',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'totalAmount',
                'key': 'KEY_TOTA',
                'text': '90',
                'score': null
              },
              {
                'x': 0,
                'y': 0,
                'w': 0,
                'h': 0,
                'name': 'payAmount',
                'key': 'KEY_PAYA',
                'text': '90',
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
  }
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
          'text': 'BB20050952',
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
  })
})