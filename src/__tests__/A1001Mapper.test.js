import { A1001ToGwObj } from '../react/Mapper/GwReqMapper/A1001Mapper';

test('success SigoutourMapper toDomainObj A1001', () => {
  const sigoutourJson = {
    ticket: '1115165557424798',
    pageList: [
      {
        page: '1115165557424798_1',
        photoList: [
          {
            photo: '1115165557424798_1_1',
            type: 'A1001',
            x: 1,
            y: 1,
            w: 2131,
            h: 1241,
            result: [
              {
                x: 84,
                y: 25,
                w: 275,
                h: 38,
                name: 'invoiceNumber',
                key: 'KEY_INVN',
                text: 'GD0051082903',
                score: null,
              },
              {
                x: 540,
                y: 237,
                w: 899,
                h: 36,
                name: 'invoiceDate',
                key: 'KEY_INVD',
                text: '10916',
                score: null,
              },
              {
                x: 96,
                y: 250,
                w: 551,
                h: 38,
                name: 'buyer',
                key: 'KEY_BUY',
                text: '12345678',
                score: null,
              },
              {
                x: 816,
                y: 859,
                w: 1055,
                h: 37,
                name: 'seller',
                key: 'KEY_SEL',
                text: '12345679',
                score: null,
              },
              {
                x: 626,
                y: 975,
                w: 765,
                h: 39,
                name: 'taxType',
                key: 'KEY_TXT',
                text: '1',
                score: null,
              },
              {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                name: 'salesAmount',
                key: 'KEY_SALA',
                text: '',
                score: [
                  0,
                ],
              },
              {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                name: 'zeroTaxSalesAmount',
                key: 'KEY_ZTSA',
                text: '',
                score: [
                  0,
                ],
              },
              {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                name: 'freeTaxSalesAmount',
                key: 'KEY_FTSA',
                text: '',
                score: [
                  0,
                ],
              },
              {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                name: 'taxAmount',
                key: 'KEY_TAXA',
                text: '',
                score: [
                  0,
                ],
              },
              {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                name: 'totalAmount',
                key: 'KEY_TOTA',
                text: '',
                score: [
                  0,
                ],
              },
              {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                name: 'payAmount',
                key: 'KEY_PAYA',
                text: '',
                score: [
                  0,
                ],
              },
              {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                name: 'remark',
                key: 'KEY_REM',
                text: '',
                score: [
                  0,
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const data = {
    reportingPeriod: '11002',
    deductionType: '1',
    gwEvidenceType: 'A1001',
    ticketId: '123',
    sourceFullPath: '',
    sourceFileName: '',
    status: 'completed',
    data: sigoutourJson,
  };
  const result = A1001ToGwObj(data);
  expect(result).toMatchObject({
    evidenceNumber: {
      result: 'GD0051082903', score: null,
    },
    evidenceDate: {
      result: '10916', score: null,
    },
    buyerTaxId: {
      result: '12345678', score: null,
    },
    sellerTaxId: {
      result: '12345679', score: null,
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
    otherFee: { result: 0, score: [-1] },
  });
});
