import { A5003ToGwObj } from './A5003Mapper'

test('success SigoutourMapper toDomainObj 5003', () => {
  const data = {
    'reportingPeriod': '11002',
    'deductionType': '1',
    'gwEvidenceType': 'A5003',
    'ticketId': '123',
    'sourceFullPath': '',
    'sourceFileName': '',
    'status': 'completed',
    'data': {
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
                  'score': null
                },
                {
                  'x': 571,
                  'y': 211,
                  'w': 129,
                  'h': 26,
                  'name': 'invoiceDate',
                  'key': 'KEY_INVD',
                  'text': '20210126',
                  'score': null
                },
                {
                  'x': 63,
                  'y': 265,
                  'w': 207,
                  'h': 27,
                  'name': 'buyer',
                  'key': 'KEY_BUY',
                  'text': '24549210',
                  'score': null
                },
                {
                  'x': 874,
                  'y': 1599,
                  'w': 255,
                  'h': 26,
                  'name': 'seller',
                  'key': 'KEY_SEL',
                  'text': '16151427',
                  'score': null
                },
                {
                  'x': 0,
                  'y': 0,
                  'w': 0,
                  'h': 0,
                  'name': 'taxType',
                  'key': 'KEY_TXT',
                  'text': '1',
                  'score': null
                },
                {
                  'x': 875,
                  'y': 1527,
                  'w': 318,
                  'h': 25,
                  'name': 'salesAmount',
                  'key': 'KEY_SALA',
                  'text': '8000',
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
                  'text': '400',
                  'score': null
                },
                {
                  'x': 0,
                  'y': 0,
                  'w': 0,
                  'h': 0,
                  'name': 'totalAmount',
                  'key': 'KEY_TOTA',
                  'text': '8400',
                  'score': null
                },
                {
                  'x': 0,
                  'y': 0,
                  'w': 0,
                  'h': 0,
                  'name': 'payAmount',
                  'key': 'KEY_PAYA',
                  'text': '8400',
                  'score': null
                },
                {
                  'x': 0,
                  'y': 0,
                  'w': 0,
                  'h': 0,
                  'name': 'remark',
                  'key': 'KEY_REM',
                  'text': '統一資訊股份有限公司-數據服務費用',
                  'score': null
                }
              ]
            }
          ]
        }
      ]
    }
  }
  const result = A5003ToGwObj(data)

  expect(result).toMatchObject({
    evidenceNumber: { result: 'MQ04251629', score: null },
    evidenceDate: { result: '20210126', score: null },
    buyerTaxId: { result: '24549210', score: null },
    sellerTaxId: { result: '16151427', score: null },
    taxType: { result: "1", score: null },
    taxableSalesValue: { result: 8000, score: null },
    zeroTaxSalesValue: { result: 0, score: null },
    dutyFreeSalesValue: { result: 0, score: null },
    businessTaxValue: { result: 400, score: null },
    totalAmount: { result: 8400, score: null },
    totalPayAmount: { result: 8400, score: null },
    remark: { result: '統一資訊股份有限公司-數據服務費用', score: null },
    reportingPeriod: { result: '11002', score: [-1] },
    deductionType: { result: '1', score: [-1] },
    ticketId: { result: '123', score: [-1] },
    errorMsg: { result: '', score: [-1] },
    gwEvidenceType: { result: 'A5003', score: [-1] },
    evidenceType: { result: 'A5003', score: [-1] },
    otherFee: { result: 0, score: [-1] }
  })
})