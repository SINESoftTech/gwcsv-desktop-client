import { A1001ToGwObj } from './A1001Mapper'

test('success SigoutourMapper toDomainObj A1001', () => {
  const sigoutourJson = {
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
            'text': '',
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
  const data = {
    'reportingPeriod': '11002',
    'deductionType': '1',
    'gwEvidenceType': 'A1001',
    'ticketId': '123',
    'sourceFullPath': '',
    'sourceFileName': '',
    'status': 'completed',
    'data': sigoutourJson
  }
  const result = A1001ToGwObj(data)
  console.log(result)
  expect(result).toMatchObject({
    evidenceNumber: {
      result: 'GD0051082903', score: null
    },
    evidenceDate: {
      result: '10916', score: null
    },
    buyerTaxId: {
      result: '12345678', score: null
    },
    sellerTaxId: {
      result: '12345679', score: null
    },
    taxType: { result: '1', score: null },
    taxableSalesValue: { result: 0, score: [0] },
    zeroTaxSalesValue: { result: 0, score: [0] },
    dutyFreeSalesValue: { result: 0, score: [0] },
    businessTaxValue: { result: 0, score: [0] },
    totalAmount: { result: 0, score: [0] },
    totalPayAmount: { result: 0, score: [0] },
    remark: { result: '', score: [0] },
    reportingPeriod: { result: '11002', score: [-1] },
    deductionType: { result: '1', score: [-1] },
    ticketId: { result: '123', score: [-1] },
    errorMsg: { result: '', score: [-1] },
    gwEvidenceType: { result: 'A1001', score: [-1] },
    evidenceType: { result: 'A1001', score: [-1] },
    otherFee: { result: 0, score: [-1] }
  })
})