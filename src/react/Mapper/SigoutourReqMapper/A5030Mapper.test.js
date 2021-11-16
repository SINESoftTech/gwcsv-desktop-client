import {A5030ToGwObj} from "./A5030Mapper";

test('success SigoutourMapper toDomainObj 5030', () => {
    const data = {
        'reportingPeriod': '11002',
        'deductionType': '1',
        'gwEvidenceType': 'A5020',
        'ticketId': '123',
        'sourceFullPath': '',
        'sourceFileName': '',
        'status': 'completed',
        'data': {
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
                        'score': null
                    }, {
                        'x': 614,
                        'y': 423,
                        'w': 176,
                        'h': 39,
                        'name': 'invoiceDate',
                        'key': 'KEY_INVD',
                        'text': '1090225',
                        'score': null
                    }, {
                        'x': 46,
                        'y': 1145,
                        'w': 474,
                        'h': 35,
                        'name': 'buyer',
                        'key': 'KEY_BUY',
                        'text': '16151904',
                        'score': null
                    }, {
                        'x': 1062,
                        'y': 177,
                        'w': 334,
                        'h': 35,
                        'name': 'seller',
                        'key': 'KEY_SEL',
                        'text': '8169178',
                        'score': null
                    }, {
                        'x': 0,
                        'y': 0,
                        'w': 0,
                        'h': 0,
                        'name': 'taxType',
                        'key': 'KEY_TXT',
                        'text': '',
                        'score': null
                    }, {
                        'x': 124,
                        'y': 2498,
                        'w': 379,
                        'h': 31,
                        'name': 'salesAmount',
                        'key': 'KEY_SALA',
                        'text': 6906,
                        'score': null
                    }, {
                        'x': 0,
                        'y': 0,
                        'w': 0,
                        'h': 0,
                        'name': 'zeroTaxSalesAmount',
                        'key': 'KEY_ZTSA',
                        'text': 0,
                        'score': null
                    }, {
                        'x': 0,
                        'y': 0,
                        'w': 0,
                        'h': 0,
                        'name': 'freeTaxSalesAmount',
                        'key': 'KEY_FTSA',
                        'text': 1,
                        'score': null
                    }, {
                        'x': 124,
                        'y': 2531,
                        'w': 809,
                        'h': 29,
                        'name': 'taxAmount',
                        'key': 'KEY_TAXA',
                        'text': 345,
                        'score': null
                    }, {
                        'x': 1158,
                        'y': 2497,
                        'w': 300,
                        'h': 33,
                        'name': 'otherFee',
                        'key': 'KEY_OTHF',
                        'text': 0,
                        'score': null
                    }, {
                        'x': 182,
                        'y': 426,
                        'w': 210,
                        'h': 44,
                        'name': 'payAmount',
                        'key': 'KEY_PAYA',
                        'text': 7475,
                        'score': null
                    }, {'x': 0, 'y': 0, 'w': 0, 'h': 0, 'name': 'remark', 'key': 'KEY_REM', 'text': '', 'score': null}]
                }]
            }]
        }
    }
    const result = A5030ToGwObj(data)
    console.log(result)
    expect(result).toMatchObject({
        evidenceNumber: {result: 'BB20050951', score: null},
        evidenceDate: {result: '', score: [-1]},
        buyerTaxId: {result: '16151904', score: null},
        sellerTaxId: {result: '8169178', score: null},
        taxType: {result: '', score: null},
        taxableSalesValue: {result: 6906, score: null},
        zeroTaxSalesValue: {result: 0, score: null},
        dutyFreeSalesValue: {result: 1, score: null},
        businessTaxValue: {result: 345, score: null},
        totalAmount: {result: 6907, score: [-1]},
        totalPayAmount: {result: 7475, score: null},
        remark: {result: '', score: null},
        reportingPeriod: {result: '11002', score: [-1]},
        deductionType: {result: '1', score: [-1]},
        ticketId: {result: '123', score: [-1]},
        errorMsg: {result: '', score: [-1]},
        gwEvidenceType: {result: 'A5020', score: [-1]},
        evidenceType: {result: 'A5030', score: [-1]},
        otherFee: {result: 0, score: null}
    })
})