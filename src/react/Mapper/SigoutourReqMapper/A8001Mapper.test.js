import { A8001ToGwObj } from './A8001Mapper'

test('success SigoutourMapper toDomainObj A8001', () => {
  const data = {
    'reportingPeriod': '11002',
    'deductionType': '1',
    'gwEvidenceType': 'A8001',
    'ticketId': '123',
    'sourceFullPath': '',
    'sourceFileName': '',
    'status': 'completed',
    'data': {
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
              'score': null
            }, {
              'x': 475,
              'y': 158,
              'w': 79,
              'h': 21,
              'text': 'HK58985631',
              'key': 'KEY_ORDN',
              'name': 'orderNumber',
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
              'text': '1',
              'key': 'KEY_TXT',
              'name': 'taxType',
              'score': null
            }, {
              'x': 475,
              'y': 158,
              'w': 79,
              'h': 21,
              'text': 1,
              'key': 'KEY_OTHF',
              'name': 'otherFee',
              'score': null
            }, {
              'x': 475,
              'y': 158,
              'w': 79,
              'h': 21,
              'text': '1000',
              'key': 'KEY_SALA',
              'name': 'salesAmount',
              'score': null
            }, {
              'x': 475,
              'y': 158,
              'w': 79,
              'h': 21,
              'text': '20',
              'key': 'KEY_FTSA',
              'name': 'freeTaxSalesAmount',
              'score': null
            }, {
              'x': 475,
              'y': 158,
              'w': 79,
              'h': 21,
              'text': '50',
              'key': 'KEY_TAXA',
              'name': 'taxAmount',
              'score': null
            }, {
              'x': 475,
              'y': 158,
              'w': 79,
              'h': 21,
              'text': '1050',
              'key': 'KEY_PAYA',
              'name': 'payAmount',
              'score': null
            }, {
              'x': 475,
              'y': 158,
              'w': 79,
              'h': 21,
              'text': '1050',
              'key': 'KEY_TOTA',
              'name': 'totalAmount',
              'score': null
            }
            ]
        }
        ]
      }
      ]
    }
  }
  const result = A8001ToGwObj(data)
  console.log(result)
  expect(result).toMatchObject({
    declarationId: { result: 'HK58985631', score: null },
    evidenceDate: { result: '20210112', score: null },
    buyerTaxId: { result: '12345678', score: null },
    taxType: { result: '1', score: null },
    otherFee: { result: 1, score: null },
    taxableSalesValue: { result: 1000, score: null },
    dutyFreeSalesValue: { result: 20, score: null },
    businessTaxValue: { result: 50, score: null },
    totalPayAmount: { result: 1050, score: null },
    totalAmount: { result: 1050, score: null },
    reportingPeriod: { result: '11002', score: [-1] },
    deductionType: { result: '1', score: [-1] },
    ticketId: { result: '123', score: [-1] },
    errorMsg: { result: '', score: [-1] },
    gwEvidenceType: { result: 'A8001', score: [-1] },
    evidenceType: { result: 'A8001', score: [-1] },
    zeroTaxSalesValue: { result: 0, score: [-1] },
    evidenceNumber: { result: 'HK58985633', score: null }
  })
})