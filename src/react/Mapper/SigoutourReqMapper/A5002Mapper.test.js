import { A5002ToGwObj } from './A5002Mapper'

test('success SigoutourMapper toDomainObj 5002', () => {
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
  const data = {
    'reportingPeriod': '11002',
    'deductionType': '1',
    'gwEvidenceType': 'A5002',
    'ticketId': '123',
    'sourceFullPath': '',
    'sourceFileName': '',
    'status': 'completed',
    'data': sigoutourJson
  }
  const result = A5002ToGwObj(data)

  expect(result).toMatchObject({
    evidenceNumber: { result: 'JD52291225', score: null },
    evidenceDate: { result: '20210101', score: null },
    buyerTaxId: { result: '24549210', score: null },
    sellerTaxId: { result: '29278095', score: null },
    taxType: { result: 1, score: null },
    taxableSalesValue: { result: 86, score: null },
    zeroTaxSalesValue: { result: 0, score: null },
    dutyFreeSalesValue: { result: 0, score: null },
    businessTaxValue: { result: 4, score: null },
    totalAmount: { result: 90, score: null },
    totalPayAmount: { result: 90, score: null },
    remark: { result: '', score: null },
    reportingPeriod: { result: '11002', score: [-1] },
    deductionType: { result: '1', score: [-1] },
    ticketId: { result: '123', score: [-1] },
    errorMsg: { result: '', score: [-1] },
    gwEvidenceType: { result: 'A5002', score: [-1] },
    evidenceType: { result: 'A5002', score: [-1] },
    otherFee: { result: 0, score: [-1] }
  })
})