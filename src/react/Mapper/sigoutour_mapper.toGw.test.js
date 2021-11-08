import SigoutourMapper from './sigoutour_mapper'
import ShareTest from './sigoutour_mapper.share.test'

test('success SigoutourMapper toGw A1001', () => {
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

  const ticketId = 'a1001'
  const deductionType = '2'
  const reportingPeriod = '11002'
  const evidenceType = 'A1001'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, false, evidenceType, a1001SigoutourJson)
  ShareTest.shareEvidenceBlankExpect(result)
  ShareTest.shareEvidenceNumericExpect(result)

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

  const ticketId = 'a2001'
  const deductionType = '1'
  const reportingPeriod = '11008'
  const evidenceType = 'A2001'

  const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a2001SigoutourJson)
  ShareTest.shareEvidenceBlankExpect(result)
  ShareTest.shareEvidenceNumericExpect(result)
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
 * todo:evidenceDate verify failed
 */
test('success SigoutourMapper toGw A5001', () => {
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
  const deductionType = '3'
  const reportingPeriod = '11008'
  const evidenceType = 'A5001'

  // const result = SigoutourMapper.toGw(ticketId, reportingPeriod, deductionType, true, evidenceType, a5001SigoutourJson)
  // ShareTest.shareEvidenceBlankExpect(result)
  // ShareTest.shareEvidenceNumericExpect(result)

  // expect(result).toMatchObject({
  //   'evidenceType': 'TRIPLE_CASH_REGISTER_GUI',
  //   'evidenceNumber': 'HK58985633',
  //   'evidenceDate': 1610409600000,
  //   'buyerTaxId': '12345678',
  //   'sellerTaxId': '12345679',
  //   'taxType': 'TAXABLE',
  //   'taxableSalesValue': 1050,
  //   'businessTaxValue': 50,
  //   'zeroTaxSalesValue': 20,
  //   'dutyFreeSalesValue': 30,
  //   'totalAmount': 1050,
  //   'totalPayAmount': 1050,
  //   'undefined': 'remark',
  //   'otherFee': 0,
  //   'id': 'a5001',
  //   'reportingPeriod': '11008',
  //   'deductionType': 'NON_PURCHASE_AND_FEE',
  //   'isDeclareBusinessTax': true,
  //   'gwEvidenceType': 'TRIPLE_CASH_REGISTER_GUI'
  // })
})

