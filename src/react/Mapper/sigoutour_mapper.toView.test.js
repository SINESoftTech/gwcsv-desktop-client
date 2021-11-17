import SigoutourMapper from './sigoutour_mapper'
import {jsonCases,shareEvidenceExpect,totalAmountSummaryExpect,a5020TypeNumericExpect} from './sigoutour_mapper.share.test'

test('success SigoutourMapper toView A8001', () => {
  const a8001igoutourJson = jsonCases.A8001_HAPPY_CASE

  const ticketId = 'A8001'
  const deductionType = 'A8001'
  const reportingPeriod = '11006'
  const evidenceType = 'A8001'
  const result = SigoutourMapper.toView(ticketId, deductionType, reportingPeriod, evidenceType, a8001igoutourJson)

  shareEvidenceExpect(result)

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


/**
 * todo: 如果辨識結果中一個欄位都沒有出現，則evidenceType連原來給的也不會帶回來
 */
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
      "ticket": "0907175959174992",
      "pageList": [
        {
          "page": "0907175959174992_1",
          "photoList": [
            {
              "photo": "0907175959174992_1_1",
              "type": "A5030",
              "x": 1,
              "y": 1,
              "w": 2422,
              "h": 2807,
              "result": [
                {
                  "x": 1077,
                  "y": 307,
                  "w": 319,
                  "h": 36,
                  "name": "commonNumber",
                  "key": "KEY_COMN",
                  "text": "BB20050952",
                  "score": [
                    1,
                    0.86,
                    1,
                    0.986,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    0.686,
                    1,
                    0.972
                  ]
                },
                {
                  "x": 614,
                  "y": 423,
                  "w": 176,
                  "h": 39,
                  "name": "invoiceDate",
                  "key": "KEY_INVD",
                  "text": "1090225",
                  "score": [
                    0.98,
                    0.98,
                    0.98,
                    0.98,
                    0.98,
                    0.98,
                    0.98
                  ]
                },
                {
                  "x": 46,
                  "y": 1145,
                  "w": 474,
                  "h": 35,
                  "name": "buyer",
                  "key": "KEY_BUY",
                  "text": "16151904",
                  "score": [
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    0.998,
                    1
                  ]
                },
                {
                  "x": 1062,
                  "y": 177,
                  "w": 334,
                  "h": 35,
                  "name": "seller",
                  "key": "KEY_SEL",
                  "text": "8169178",
                  "score": [
                    1,
                    1,
                    0.977,
                    1,
                    1,
                    1,
                    1
                  ]
                },
                {
                  "x": 0,
                  "y": 0,
                  "w": 0,
                  "h": 0,
                  "name": "taxType",
                  "key": "KEY_TXT",
                  "text": "",
                  "score": [
                    0
                  ]
                },
                {
                  "x": 124,
                  "y": 2498,
                  "w": 379,
                  "h": 31,
                  "name": "salesAmount",
                  "key": "KEY_SALA",
                  "text": 6906,
                  "score": [
                    1,
                    1,
                    1,
                    0.999
                  ]
                },
                {
                  "x": 0,
                  "y": 0,
                  "w": 0,
                  "h": 0,
                  "name": "zeroTaxSalesAmount",
                  "key": "KEY_ZTSA",
                  "text": 0,
                  "score": [
                    0
                  ]
                },
                {
                  "x": 0,
                  "y": 0,
                  "w": 0,
                  "h": 0,
                  "name": "freeTaxSalesAmount",
                  "key": "KEY_FTSA",
                  "text": 0,
                  "score": [
                    0
                  ]
                },
                {
                  "x": 124,
                  "y": 2531,
                  "w": 809,
                  "h": 29,
                  "name": "taxAmount",
                  "key": "KEY_TAXA",
                  "text": 345,
                  "score": [
                    0.98,
                    0.98,
                    0.98
                  ]
                },
                {
                  "x": 1158,
                  "y": 2497,
                  "w": 300,
                  "h": 33,
                  "name": "otherFee",
                  "key": "KEY_OTHF",
                  "text": 0,
                  "score": [
                    1
                  ]
                },
                {
                  "x": 182,
                  "y": 426,
                  "w": 210,
                  "h": 44,
                  "name": "payAmount",
                  "key": "KEY_PAYA",
                  "text": 7475,
                  "score": [
                    1,
                    1,
                    1,
                    1
                  ]
                },
                {
                  "x": 0,
                  "y": 0,
                  "w": 0,
                  "h": 0,
                  "name": "remark",
                  "key": "KEY_REM",
                  "text": "",
                  "score": [
                    0
                  ]
                },
                {
                  "key": "KEY_EVIDENCE_DATE",
                  "text": "1090225"
                }
              ]
            }
          ]
        }
      ]
    }
  )
})
