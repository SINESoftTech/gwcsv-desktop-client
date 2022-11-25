import SigoutourMapper from '../react/Mapper/gw_mapper';

test('success SigoutourMapper toView', () => {
  const data = {
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
  };

  const result = SigoutourMapper.toView(data, 123, 1);

  expect(result).toMatchObject({
    evidenceNumber: 'GD0051082903',
    evidenceDate: '10916',
    buyerTaxId: '12345678',
    sellerTaxId: '12345679',
    taxType: '1',
    taxableSalesValue: 0,
    zeroTaxSalesValue: 0,
    dutyFreeSalesValue: 0,
    businessTaxValue: 0,
    totalAmount: 0,
    totalPayAmount: 0,
    remark: '',
    reportingPeriod: '11002',
    deductionType: '1',
    ticketId: '123',
    errorMsg: '',
    gwEvidenceType: 'A1001',
    evidenceType: 'A1001',
    otherFee: 0,
    sn: 1,
    id: 123,
  });
});
