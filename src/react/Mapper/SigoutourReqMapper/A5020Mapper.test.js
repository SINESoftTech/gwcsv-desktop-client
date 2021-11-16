import { A5020ToGwObj } from './A5020Mapper'

test('success SigoutourMapper toDomainObj 5020', () => {
  const data = {
    'reportingPeriod': '11002',
    'deductionType': '1',
    'gwEvidenceType': 'A5010',
    'ticketId': '123',
    'sourceFullPath': '',
    'sourceFileName': '',
    'status': 'completed',
    'data': {
      'ticket': '201202_095956_254241',
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
              'text': '20210112',
              'key': 'KEY_EVIDENCE_DATE'
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
  }
  const result = A5020ToGwObj(data)
  console.log(result)
  expect(result).toMatchObject({
    evidenceNumber: { result: 'BB20050951', score: null },
    evidenceDate: { result: '20210126', score: null },
    buyerTaxId: { result: '12345678', score: null },
    sellerTaxId: { result: '8169178', score: null },
    taxType: { result: '1', score: null },
    taxableSalesValue: { result: 6906, score: null },
    zeroTaxSalesValue: { result: 0, score: null },
    dutyFreeSalesValue: { result: 0, score: [-1] },
    businessTaxValue: { result: 50, score: null },
    totalAmount: { result: 7475, score: null },
    totalPayAmount: { result: 7251, score: null },
    remark: { result: '', score: null },
    reportingPeriod: { result: '11002', score: [-1] },
    deductionType: { result: '1', score: [-1] },
    ticketId: { result: '123', score: [-1] },
    errorMsg: { result: '', score: [-1] },
    gwEvidenceType: { result: 'A5010', score: [-1] },
    evidenceType: { result: 'A5010', score: [-1] },
    otherFee: { result: 0, score: [-1] }
  })
})