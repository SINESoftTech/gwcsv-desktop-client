import { A2001ToGwObj } from './A2001Mapper'

test('success SigoutourMapper toDomainObj A2001', () => {
  const sigoutourJson = {
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
            'score': null
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '20210112',
            'key': 'KEY_INVD',
            'name': 'invoiceDate',
            'score': null
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345678',
            'key': 'KEY_BUY',
            'name': 'buyer',
            'score': null
          }, {
            'x': 475,
            'y': 158,
            'w': 79,
            'h': 21,
            'text': '12345679',
            'key': 'KEY_SEL',
            'name': 'seller',
            'score': null
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
  const data = {
    'reportingPeriod': '11002',
    'deductionType': '1',
    'gwEvidenceType': 'A2001',
    'ticketId': '123',
    'sourceFullPath': '',
    'sourceFileName': '',
    'status': 'completed',
    'data': sigoutourJson
  }
  const result = A2001ToGwObj(data)
  console.log(result)
  expect(result).toMatchObject({
    evidenceNumber: {
      result: 'HK58985633', score: null
    },
    evidenceDate: {
      result: '20210112', score: null
    },
    buyerTaxId: {
      result: '12345678', score: null
    },
    sellerTaxId: {
      result: '12345679', score: null
    },
    taxType: { result: '1', score: [0.99] },
    taxableSalesValue: { result: 1000, score: [0.99, 0.98, 0.97, 0.97] },
    zeroTaxSalesValue: { result: 0, score: [-1] },
    dutyFreeSalesValue: { result: 0, score: [-1] },
    businessTaxValue: { result: 50, score: [0.99,0.98] },
    totalAmount: { result: 1050, score: [ 0.99, 0.98, 0.97, 0.97 ]},
    totalPayAmount: { result: 1050, score: [ 0.99, 0.98, 0.97, 0.97 ]},
    // remark: { result: '', score: [0] },
    reportingPeriod: { result: '11002', score: [-1] },
    deductionType: { result: '1', score: [-1] },
    ticketId: { result: '123', score: [-1] },
    errorMsg: { result: '', score: [-1] },
    gwEvidenceType: { result: 'A2001', score: [-1] },
    evidenceType: { result: 'A2001', score: [-1] },
    otherFee: { result: 0, score: [-1] }
  })
})