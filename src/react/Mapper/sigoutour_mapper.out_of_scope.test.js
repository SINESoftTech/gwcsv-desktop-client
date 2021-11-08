import SigoutourMapper from './sigoutour_mapper'
import ShareTest from './sigoutour_mapper.share.test'

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
  ShareTest.shareEvidenceBlankExpect(result)
  ShareTest.shareEvidenceNumericExpect(result)
  ShareTest.shareToViewDirectValueMappingExpect(result, expectObj)

  expect(result).toMatchObject({
    'evidenceType': '勞保',
    'evidenceDate': '20210112',
    'undefined': '50',
    'totalPayAmount': 1050,
    'remark': 'remark',
    'taxType': '',
    'totalAmount': 0,
    'otherFee': 0,
    'businessTaxValue': 0,
    'taxableSalesValue': 0,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'buyerTaxId': '',
    'sellerTaxId': '',
    'reportingPeriod': '11004',
    'deductionType': 'A3001',
    'ticketId': 'A3001',
    'gwEvidenceType': '勞保'
  })
})

test('success SigoutourMapper toView A3002', () => {
  const a3002SigoutourJson = {
    'result': 0,
    'ticket': '201202_095956_254241',
    'agent': 'T10001',
    'company': '54704907',
    'pageList': [{
      'page': '201202_095956_254241_1',
      'photoList': [{
        'photo': '201202_095956_254241_1_1',
        'type': 'A3002',
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
            'key': 'KEY_OTHF',
            'name': 'otherFee',
            'score': [0.99, 0.98, 0.97, 0.97, 0.95, 0.97, 1.0, 0.98]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1',
            'key': 'KEY_TOTA',
            'name': 'totalAmount',
            'score': [0.99]
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '1000',
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

  const ticketId = 'A3002'
  const deductionType = 'A3002'
  const reportingPeriod = '11006'
  const evidenceType = 'A3002'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a3002SigoutourJson)
  ShareTest.shareEvidenceBlankExpect(result)
  ShareTest.shareEvidenceNumericExpect(result)
  // shareDirectValueMappingExpect(result, a3002SigoutourJson)
})

test('success SIgoutourMapper toView A4001', () => {

})