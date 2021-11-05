import SigoutourMapper, { reverseIndex, SIGOUTOUR_EVIDENCE_TYPE_REVERSE } from './sigoutour_mapper'


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
test('success SigoutourMapper toView 中華電信 5030', () => {
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

test('success SigoutourMapper toView A5001', () => {
  const a5001SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A5001',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_INVN',
            'name': 'invoiceNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_ZTSA',
            'name': 'zeroTaxSalesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '30',
            'key': 'KEY_FTSA',
            'name': 'freeTaxSalesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_TOTA',
            'name': 'totalAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM	',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

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
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)

  expect(result).toMatchObject({
    'evidenceType': '三聯式收銀機發票',
    'evidenceNumber': 'HK58985633',
    'evidenceDate': '20210112',
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
  const a5010SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A5010',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_COMN',
            'name': 'commonNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_TOTA',
            'name': 'totalAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM	',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

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
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)

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
  const a5020SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A5020',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_COMN',
            'name': 'commonNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_BASF',
            'name': 'basicFee',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_WTF',
            'name': 'waterFee',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_REB',
            'name': 'rebate',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '15',
            'key': 'KEY_OTHF',
            'name': 'otherFee',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_TOTA',
            'name': 'totalAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

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
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)
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
  const a5021SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A5021',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_COMN',
            'name': 'commonNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_BASF',
            'name': 'basicFee',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_WTF',
            'name': 'waterFee',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_REB',
            'name': 'rebate',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '15',
            'key': 'KEY_OTHF',
            'name': 'otherFee',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_TOTA',
            'name': 'totalAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

  const ticketId = 'a5021'
  const deductionType = 'a5021'
  const reportingPeriod = '11004'
  const evidenceType = 'A5021'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5021SigoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)
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
  const a5031SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A5031',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_COMN',
            'name': 'commonNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_ZTSA',
            'name': 'zeroTaxSalesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '30',
            'key': 'KEY_FTSA',
            'name': 'freeTaxSalesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '15',
            'key': 'KEY_OTHF',
            'name': 'otherFee',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_TOTA',
            'name': 'totalAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

  const ticketId = 'a5031'
  const deductionType = 'a5031'
  const reportingPeriod = '11010'
  const evidenceType = 'A5031'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5031SigoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)
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
  const a5032SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A5032',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_COMN',
            'name': 'commonNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_ZTSA',
            'name': 'zeroTaxSalesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '15',
            'key': 'KEY_OTHF',
            'name': 'otherFee',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

  const ticketId = 'a5032'
  const deductionType = 'a5032'
  const reportingPeriod = '11010'
  const evidenceType = 'A5032'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5032SigoutourJson)

  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)
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
  const a5033SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A5033',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_COMN',
            'name': 'commonNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_ZTSA',
            'name': 'zeroTaxSalesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '15',
            'key': 'KEY_OTHF',
            'name': 'otherFee',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }
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
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)
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
  const a5034SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A5034',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_COMN',
            'name': 'commonNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_ZTSA',
            'name': 'zeroTaxSalesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '15',
            'key': 'KEY_OTHF',
            'name': 'otherFee',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_TOTA',
            'name': 'totalAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }
  const ticketId = 'a5034'
  const deductionType = 'a5034'
  const reportingPeriod = '11006'
  const evidenceType = 'A5034'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a5034SigoutourJson)

  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)

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
  const a8001igoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A8001',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_COMN',
            'name': 'commonNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_ORDN',
            'name': 'orderNumber',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_FTSA',
            'name': 'freeTaxSalesAmount\t',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

  const ticketId = 'A8001'
  const deductionType = 'A8001'
  const reportingPeriod = '11006'
  const evidenceType = 'A8001'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a8001igoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)

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

//todo:SUBA3的值對應有問題
test('success SigoutourMapper toView A3001', () => {
  const a3001igoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A3001',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_SUBF1',
            'name': 'subFee1',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_SUBF2',
            'name': 'subFee2',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SUBA1',
            'name': 'subAmount1',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20',
            'key': 'KEY_SUBA2',
            'name': 'subAmount2',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_SUBA3',
            'name': 'subAmount3',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          },{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'remark',
            'key': 'KEY_REM',
            'name': 'remark',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

  const ticketId = 'A3001'
  const deductionType = 'A3001'
  const reportingPeriod = '11004'
  const evidenceType = 'A3001'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a3001igoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: evidenceType
  }
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)

  expect(result).toMatchObject({
    "evidenceType": "勞保",
    "evidenceDate": "20210112",
    "undefined": "50",
    "totalPayAmount": 1050,
    "remark": "remark",
    "taxType": "",
    "totalAmount": 0,
    "otherFee": 0,
    "businessTaxValue": 0,
    "taxableSalesValue": 0,
    "zeroTaxSalesValue": 0,
    "dutyFreeSalesValue": 0,
    "buyerTaxId": "",
    "sellerTaxId": "",
    "reportingPeriod": "11004",
    "deductionType": "A3001",
    "ticketId": "A3001",
    "gwEvidenceType": "勞保"
  })
})

test('success SigoutourMapper toView A2001', () => {
  const a2001SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A2001',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_INVN',
            'name': 'invoiceNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_TOTA',
            'name': 'totalAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          },
            {
              'x': 475,
              'y': 158,
              'w': 79,
              'h': 21,
              'text': 'remark',
              'key': 'KEY_REM	',
              'name': 'remark',
              'score': [0.99, 0.98, 0.97, 0.97]
            }
          ]
      }
      ]
    }
    ]
  }

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
  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)

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
  const a1001SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A1001',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result':
          [{
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': 'HK58985633',
            'key': 'KEY_INVN',
            'name': 'invoiceNumber',
            'score': [0.99, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0, 0.98, 1.0]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98, 0.96, 0.94]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TXT',
            'name': 'taxType',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
            'key': 'KEY_SALA',
            'name': 'salesAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '50',
            'key': 'KEY_TAXA',
            'name': 'taxAmount',
            'score': [0.99, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1050',
            'key': 'KEY_PAYA',
            'name': 'payAmount',
            'score': [0.99, 0.98, 0.97, 0.97]
          }
          ]
      }
      ]
    }
    ]
  }

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

  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)

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
test('verify failed toView A1001', () => {
  const a1001SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A1001',
        'x': 0,
        'y': 478,
        'w': 1239,
        'h': 947,
        'result': []
      }
      ]
    }
    ]
  }

  const ticketId = 'a1001failed'
  const deductionType = 'a1001failed'
  const reportingPeriod = '11006'
  const evidenceType = 'A1001'

  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a1001SigoutourJson)
  let expectObj = {
    reportingPeriod: reportingPeriod,
    deductionType: deductionType,
    ticketId: ticketId,
    evidenceType: ''
  }

  shareEvidenceBlankExpect(result)
  shareEvidenceNumericExpect(result)
  shareDirectValueMappingExpect(result, expectObj)

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

function shareEvidenceBlankExpect(result) {
  //欄位檢核
  expect(notUndefined(result.evidenceType)).toBeTruthy()
  expect(notUndefined(result.buyerTaxId)).toBeTruthy()
  expect(notUndefined(result.sellerTaxId)).toBeTruthy()
  expect(notUndefined(result.taxType)).toBeTruthy()
}

function shareEvidenceNumericExpect(result) {
  //數值欄位檢核
  isInstanceOfNumber(result.totalAmount)
  isInstanceOfNumber(result.totalPayAmount)
  isInstanceOfNumber(result.otherFee)
  isInstanceOfNumber(result.businessTaxValue)
  isInstanceOfNumber(result.taxableSalesValue)
  isInstanceOfNumber(result.zeroTaxSalesValue)
  isInstanceOfNumber(result.dutyFreeSalesValue)
}

function a5020TypeNumericExpect(result) {
  isInstanceOfNumber(result.waterFee)
  isInstanceOfNumber(result.basicFee)
}

function evidenceNumberModifierExpect(result, originEvidenceNumber, carrierNumber) {
  expect(result.evidenceNumber).toEqual(carrierNumber)
}

/**
 * A5030,A5031,A5032,A5033
 * @param result
 * @param expectTotalAmount
 */
function totalAmountSummaryExpect(result, expectTotalAmount) {
  let realTotalAmount =
    result.taxableSalesValue
    + result.businessTaxValue
    + result.zeroTaxSalesValue
    + result.dutyFreeSalesValue

  expect(realTotalAmount).toEqual(expectTotalAmount)
}

function shareDirectValueMappingExpect(result, expectObj) {
  let evidenceType = ''
  if (result.evidenceType) {
    evidenceType = SIGOUTOUR_EVIDENCE_TYPE_REVERSE[result.evidenceType]
  }
  let resultObj = {
    reportingPeriod: result.reportingPeriod,
    deductionType: result.deductionType,
    ticketId: result.ticketId,
    evidenceType: evidenceType
  }
  expect(resultObj).toMatchObject(expectObj)
}

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

function notUndefined(value) {
  return value != undefined
}

function isInstanceOfNumber(value) {
  let type = typeof value
  return type === 'number'
}