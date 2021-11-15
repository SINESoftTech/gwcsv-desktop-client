import { A5001ToGwObj } from './A5001Mapper'

test('success SigoutourMapper toDomainObj 5001', () => {
  const sigoutourJson = {
    "ticket": "1115175301444303",
    "pageList": [
      {
        "page": "1115175301444303_1",
        "photoList": [
          {
            "photo": "1115175301444303_1_1",
            "type": "A5001",
            "x": 1,
            "y": 1,
            "w": 885,
            "h": 1669,
            "result": [
              {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "name": "taxType",
                "key": "KEY_TXT",
                "text": "1",
                "score": null
              },
              {
                "x": 77,
                "y": 138,
                "w": 746,
                "h": 55,
                "name": "invoiceNumber",
                "key": "KEY_INVN",
                "text": "GE21880284",
                "score": null
              },
              {
                "x": 295,
                "y": 289,
                "w": 208,
                "h": 44,
                "name": "seller",
                "key": "KEY_SEL",
                "text": "55796002",
                "score": null
              },
              {
                "x": 279,
                "y": 451,
                "w": -77,
                "h": 42,
                "name": "invoiceDate",
                "key": "KEY_INVD",
                "text": "2020\/12\/22",
                "score": null
              },
              {
                "x": 103,
                "y": 509,
                "w": 626,
                "h": 36,
                "name": "buyer",
                "key": "KEY_BUY",
                "text": "16151904",
                "score": null
              },
              {
                "x": 669,
                "y": 783,
                "w": 113,
                "h": 46,
                "name": "taxAmount",
                "key": "KEY_TAXA",
                "text": "40",
                "score": null
              },
              {
                "x": 676,
                "y": 841,
                "w": 55,
                "h": 44,
                "name": "totalAmount",
                "key": "KEY_TOTA",
                "text": "838",
                "score": null
              },
              {
                "x": 676,
                "y": 841,
                "w": 55,
                "h": 44,
                "name": "payAmount",
                "key": "KEY_PAYA",
                "text": "838",
                "score": null
              },
              {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "name": "salesAmount",
                "key": "KEY_SALA",
                "text": "",
                "score": null
              },
              {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "name": "zeroTaxSalesAmount",
                "key": "KEY_ZTSA",
                "text": "",
                "score": null
              },
              {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0,
                "name": "remark",
                "key": "KEY_REM",
                "text": "",
                "score": null
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
    'gwEvidenceType': 'A5001',
    'ticketId': '123',
    'sourceFullPath': '',
    'sourceFileName': '',
    'status': 'completed',
    'data': sigoutourJson
  }
  const result = A5001ToGwObj(data)
  console.log(result)
  expect(result).toMatchObject({
    evidenceNumber: {
      result: '', score: null
    },
    evidenceDate: {
      result: '109', score: null
    },
    buyerTaxId: {
      result: '', score: null
    },
    sellerTaxId: {
      result: '12345679', score: null
    },
    taxType: { result: '1', score: null },
    taxableSalesValue: { result: 0, score: null },
    zeroTaxSalesValue: { result: 0, score: null },
    dutyFreeSalesValue: { result: 0, score: null },
    businessTaxValue: { result: 0, score: null },
    totalAmount: { result: 0, score: null },
    totalPayAmount: { result: 0, score: null },
    remark: { result: '', score: null},
    reportingPeriod: { result: '11002', score: [-1] },
    deductionType: { result: '1', score: [-1] },
    ticketId: { result: '123', score: [-1] },
    errorMsg: { result: '', score: [-1] },
    gwEvidenceType: { result: 'A1001', score: [-1] },
    evidenceType: { result: 'A1001', score: [-1] },
    otherFee: { result: 0, score: [-1] }
  })
})