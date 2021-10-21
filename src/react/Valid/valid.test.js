import { validSigoutourData } from './valid'

const assignMap = {
  '21': {
    '11002': [
      'JC'
    ],
    '11004': [
      'KX'
    ],
    '11006': [
      'MS'
    ],
    '11008': [
      'PM'
    ],
    '11010': [
      'RG'
    ],
    '11012': [
      'TB'
    ]
  },
  '22': {
    '11002': [
      'JE',
      'JF',
      'JG',
      'JH',
      'JJ',
      'JK'
    ],
    '11004': [
      'KZ',
      'LA',
      'LB',
      'LC',
      'LD',
      'LE'
    ],
    '11006': [
      'MU',
      'MV',
      'MW',
      'MX',
      'MY',
      'MZ'
    ],
    '11008': [
      'PP',
      'PQ',
      'PR',
      'PS',
      'PT',
      'PU'
    ],
    '11010': [
      'RJ',
      'RK',
      'RL',
      'RM',
      'RN',
      'RP'
    ],
    '11012': [
      'TD',
      'TE',
      'TF',
      'TG',
      'TH',
      'TJ'
    ]
  },
  '25': {
    '11002': [
      'JD',
      'JL',
      'JM',
      'JN',
      'JP',
      'JQ',
      'JR',
      'JS',
      'JT',
      'JU',
      'JV',
      'JW',
      'JX',
      'JY',
      'JZ',
      'KA',
      'KB',
      'KC',
      'KD',
      'KE',
      'KF',
      'KG',
      'KH',
      'KJ',
      'KK',
      'KL',
      'KM',
      'KN',
      'KP',
      'KQ',
      'KR',
      'KS',
      'KT',
      'KU',
      'KV',
      'UX',
      'VD'
    ],
    '11004': [
      'KY',
      'LF',
      'LG',
      'LH',
      'LJ',
      'LK',
      'LL',
      'LM',
      'LN',
      'LP',
      'LQ',
      'LR',
      'LS',
      'LT',
      'LU',
      'LV',
      'LW',
      'LX',
      'LY',
      'LZ',
      'MA',
      'MB',
      'MC',
      'MD',
      'ME',
      'MF',
      'MG',
      'MH',
      'MJ',
      'MK',
      'ML',
      'MM',
      'MN',
      'MP',
      'MQ',
      'UY',
      'VE'
    ],
    '11006': [
      'MT',
      'NA',
      'NB',
      'NC',
      'ND',
      'NE',
      'NF',
      'NG',
      'NH',
      'NJ',
      'NK',
      'NL',
      'NM',
      'NN',
      'NP',
      'NQ',
      'NR',
      'NS',
      'NT',
      'NU',
      'NV',
      'NW',
      'NX',
      'NY',
      'NZ',
      'PA',
      'PB',
      'PC',
      'PD',
      'PE',
      'PF',
      'PG',
      'PH',
      'PJ',
      'PK',
      'UZ',
      'VF'
    ],
    '11008': [
      'PN',
      'PV',
      'PW',
      'PX',
      'PY',
      'PZ',
      'QA',
      'QB',
      'QC',
      'QD',
      'QE',
      'QF',
      'QG',
      'QH',
      'QJ',
      'QK',
      'QL',
      'QM',
      'QN',
      'QP',
      'QQ',
      'QR',
      'QS',
      'QT',
      'QU',
      'QV',
      'QW',
      'QX',
      'QY',
      'QZ',
      'RA',
      'RB',
      'RC',
      'RD',
      'RE',
      'VA',
      'VG'
    ],
    '11010': [
      'RH',
      'RQ',
      'RR',
      'RS',
      'RT',
      'RU',
      'RV',
      'RW',
      'RX',
      'RY',
      'RZ',
      'SA',
      'SB',
      'SC',
      'SD',
      'SE',
      'SF',
      'SG',
      'SH',
      'SJ',
      'SK',
      'SL',
      'SM',
      'SN',
      'SP',
      'SQ',
      'SR',
      'SS',
      'ST',
      'SU',
      'SV',
      'SW',
      'SX',
      'SY',
      'SZ',
      'VB',
      'VH'
    ],
    '11012': [
      'TC',
      'TK',
      'TL',
      'TM',
      'TN',
      'TP',
      'TQ',
      'TR',
      'TS',
      'TT',
      'TU',
      'TV',
      'TW',
      'TX',
      'TY',
      'TZ',
      'UA',
      'UB',
      'UC',
      'UD',
      'UE',
      'UF',
      'UG',
      'UH',
      'UJ',
      'UK',
      'UL',
      'UM',
      'UN',
      'UP',
      'UQ',
      'UR',
      'US',
      'UT',
      'UU',
      'VC',
      'VJ'
    ]
  },
  '26': {
    '11002': [
      'JC'
    ],
    '11004': [
      'KX'
    ],
    '11006': [
      'MS'
    ],
    '11008': [
      'PM'
    ],
    '11010': [
      'RG'
    ],
    '11012': [
      'TB'
    ]
  },
  '27': {
    '11002': [
      'JE',
      'JF',
      'JG',
      'JH',
      'JJ',
      'JK'
    ],
    '11004': [
      'KZ',
      'LA',
      'LB',
      'LC',
      'LD',
      'LE'
    ],
    '11006': [
      'MU',
      'MV',
      'MW',
      'MX',
      'MY',
      'MZ'
    ],
    '11008': [
      'PP',
      'PQ',
      'PR',
      'PS',
      'PT',
      'PU'
    ],
    '11010': [
      'RJ',
      'RK',
      'RL',
      'RM',
      'RN',
      'RP'
    ],
    '11012': [
      'TD',
      'TE',
      'TF',
      'TG',
      'TH',
      'TJ'
    ]
  },
  '31': {
    '11002': [
      'JC'
    ],
    '11004': [
      'KX'
    ],
    '11006': [
      'MS'
    ],
    '11008': [
      'PM'
    ],
    '11010': [
      'RG'
    ],
    '11012': [
      'TB'
    ]
  },
  '32': {
    '11002': [
      'JE',
      'JF',
      'JG',
      'JH',
      'JJ',
      'JK'
    ],
    '11004': [
      'KZ',
      'LA',
      'LB',
      'LC',
      'LD',
      'LE'
    ],
    '11006': [
      'MU',
      'MV',
      'MW',
      'MX',
      'MY',
      'MZ'
    ],
    '11008': [
      'PP',
      'PQ',
      'PR',
      'PS',
      'PT',
      'PU'
    ],
    '11010': [
      'RJ',
      'RK',
      'RL',
      'RM',
      'RN',
      'RP'
    ],
    '11012': [
      'TD',
      'TE',
      'TF',
      'TG',
      'TH',
      'TJ'
    ]
  },
  '35': {
    '11002': [
      'JD',
      'JL',
      'JM',
      'JN',
      'JP',
      'JQ',
      'JR',
      'JS',
      'JT',
      'JU',
      'JV',
      'JW',
      'JX',
      'JY',
      'JZ',
      'KA',
      'KB',
      'KC',
      'KD',
      'KE',
      'KF',
      'KG',
      'KH',
      'KJ',
      'KK',
      'KL',
      'KM',
      'KN',
      'KP',
      'KQ',
      'KR',
      'KS',
      'KT',
      'KU',
      'KV',
      'UX',
      'VD'
    ],
    '11004': [
      'KY',
      'LF',
      'LG',
      'LH',
      'LJ',
      'LK',
      'LL',
      'LM',
      'LN',
      'LP',
      'LQ',
      'LR',
      'LS',
      'LT',
      'LU',
      'LV',
      'LW',
      'LX',
      'LY',
      'LZ',
      'MA',
      'MB',
      'MC',
      'MD',
      'ME',
      'MF',
      'MG',
      'MH',
      'MJ',
      'MK',
      'ML',
      'MM',
      'MN',
      'MP',
      'MQ',
      'UY',
      'VE'
    ],
    '11006': [
      'MT',
      'NA',
      'NB',
      'NC',
      'ND',
      'NE',
      'NF',
      'NG',
      'NH',
      'NJ',
      'NK',
      'NL',
      'NM',
      'NN',
      'NP',
      'NQ',
      'NR',
      'NS',
      'NT',
      'NU',
      'NV',
      'NW',
      'NX',
      'NY',
      'NZ',
      'PA',
      'PB',
      'PC',
      'PD',
      'PE',
      'PF',
      'PG',
      'PH',
      'PJ',
      'PK',
      'UZ',
      'VF'
    ],
    '11008': [
      'PN',
      'PV',
      'PW',
      'PX',
      'PY',
      'PZ',
      'QA',
      'QB',
      'QC',
      'QD',
      'QE',
      'QF',
      'QG',
      'QH',
      'QJ',
      'QK',
      'QL',
      'QM',
      'QN',
      'QP',
      'QQ',
      'QR',
      'QS',
      'QT',
      'QU',
      'QV',
      'QW',
      'QX',
      'QY',
      'QZ',
      'RA',
      'RB',
      'RC',
      'RD',
      'RE',
      'VA',
      'VG'
    ],
    '11010': [
      'RH',
      'RQ',
      'RR',
      'RS',
      'RT',
      'RU',
      'RV',
      'RW',
      'RX',
      'RY',
      'RZ',
      'SA',
      'SB',
      'SC',
      'SD',
      'SE',
      'SF',
      'SG',
      'SH',
      'SJ',
      'SK',
      'SL',
      'SM',
      'SN',
      'SP',
      'SQ',
      'SR',
      'SS',
      'ST',
      'SU',
      'SV',
      'SW',
      'SX',
      'SY',
      'SZ',
      'VB',
      'VH'
    ],
    '11012': [
      'TC',
      'TK',
      'TL',
      'TM',
      'TN',
      'TP',
      'TQ',
      'TR',
      'TS',
      'TT',
      'TU',
      'TV',
      'TW',
      'TX',
      'TY',
      'TZ',
      'UA',
      'UB',
      'UC',
      'UD',
      'UE',
      'UF',
      'UG',
      'UH',
      'UJ',
      'UK',
      'UL',
      'UM',
      'UN',
      'UP',
      'UQ',
      'UR',
      'US',
      'UT',
      'UU',
      'VC',
      'VJ'
    ]
  },
  '37': {
    '11002': [
      'JE',
      'KW'
    ],
    '11004': [
      'KZ',
      'MR'
    ],
    '11006': [
      'MU',
      'PL'
    ],
    '11008': [
      'PP',
      'RF'
    ],
    '11010': [
      'RJ',
      'TA'
    ],
    '11012': [
      'TD',
      'UV'
    ]
  }
}

test('valid buyerTaxId error', () => {
  const data = {
    'gwEvidenceType': '電信費帳單-中華電信',
    'evidenceType': '電信費帳單-中華電信',
    'carrierNumber': 'BB20050951',
    'evidenceDate': '20210101',
    'buyerTaxId': '16151904',
    'sellerTaxId': '24549210',
    'taxType': '1',
    'taxableSalesValue': 6906,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 345,
    'otherFee': 0,
    'totalPayAmount': 7251,
    'remark': '',
    'totalAmount': 7251,
    'evidenceNumber': 'BB20050951',
    'reportingPeriod': '11002',
    'deductionType': '1',
    'ticketId': '0907175959174992',
    'cellHighlight': [],
    'sn': 1,
    'id': '0907175959174992'
  }
  const validResult = validSigoutourData('24549210', data, assignMap)
  console.log(validResult)
  expect(validResult.cellHighlight).toMatchObject(['buyerTaxId','sn'])
})

test('valid sellerTaxId error', () => {
  const data = {
    'gwEvidenceType': '電信費帳單-中華電信',
    'evidenceType': '電信費帳單-中華電信',
    'carrierNumber': 'BB20050951',
    'evidenceDate': '20210101',
    'buyerTaxId': '24549210',
    'sellerTaxId': '2454921',
    'taxType': '1',
    'taxableSalesValue': 6906,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 345,
    'otherFee': 0,
    'totalPayAmount': 7251,
    'remark': '',
    'totalAmount': 7251,
    'evidenceNumber': 'BB20050951',
    'reportingPeriod': '11002',
    'deductionType': '1',
    'ticketId': '0907175959174992',
    'cellHighlight': [],
    'sn': 1,
    'id': '0907175959174992'
  }
  const validResult = validSigoutourData('24549210', data, assignMap)
  expect(validResult.cellHighlight).toMatchObject(['sellerTaxId','sn'])
})

test('valid taxType empty', () => {
  const data = {
    'gwEvidenceType': '電信費帳單-中華電信',
    'evidenceType': '電信費帳單-中華電信',
    'carrierNumber': 'BB20050951',
    'evidenceDate': '20210101',
    'buyerTaxId': '24549210',
    'sellerTaxId': '24549210',
    'taxType': '',
    'taxableSalesValue': 6906,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 345,
    'otherFee': 0,
    'totalPayAmount': 7251,
    'remark': '',
    'totalAmount': 7251,
    'evidenceNumber': 'BB20050951',
    'reportingPeriod': '11002',
    'deductionType': '1',
    'ticketId': '0907175959174992',
    'cellHighlight': [],
    'sn': 1,
    'id': '0907175959174992'
  }
  const validResult = validSigoutourData('24549210', data, assignMap)
  expect(validResult.cellHighlight).toContain('taxType')
  expect(validResult.cellHighlight).toContain('taxableSalesValue')
  expect(validResult.cellHighlight).toContain('zeroTaxSalesValue')
  expect(validResult.cellHighlight).toContain('dutyFreeSalesValue')
  expect(validResult.cellHighlight).toContain('businessTaxValue')
})

test('valid taxType 2 error', () => {
  const data = {
    'gwEvidenceType': '電信費帳單-中華電信',
    'evidenceType': '電信費帳單-中華電信',
    'carrierNumber': 'BB20050951',
    'evidenceDate': '20210101',
    'buyerTaxId': '24549210',
    'sellerTaxId': '24549210',
    'taxType': '2',
    'taxableSalesValue': 6906,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 345,
    'otherFee': 0,
    'totalPayAmount': 7251,
    'remark': '',
    'totalAmount': 7251,
    'evidenceNumber': 'BB20050951',
    'reportingPeriod': '11002',
    'deductionType': '1',
    'ticketId': '0907175959174992',
    'cellHighlight': [],
    'sn': 1,
    'id': '0907175959174992'
  }
  const validResult = validSigoutourData('24549210', data, assignMap)

  expect(validResult.cellHighlight).toContain('taxableSalesValue')
  expect(validResult.cellHighlight).toContain('businessTaxValue')
})

test('valid taxType 3 error', () => {
  const data = {
    'gwEvidenceType': '電信費帳單-中華電信',
    'evidenceType': '電信費帳單-中華電信',
    'carrierNumber': 'BB20050951',
    'evidenceDate': '20210101',
    'buyerTaxId': '24549210',
    'sellerTaxId': '24549210',
    'taxType': '3',
    'taxableSalesValue': 6906,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 345,
    'otherFee': 0,
    'totalPayAmount': 7251,
    'remark': '',
    'totalAmount': 7251,
    'evidenceNumber': 'BB20050951',
    'reportingPeriod': '11002',
    'deductionType': '1',
    'ticketId': '0907175959174992',
    'cellHighlight': [],
    'sn': 1,
    'id': '0907175959174992'
  }
  const validResult = validSigoutourData('24549210', data, assignMap)

  expect(validResult.cellHighlight).toContain('taxableSalesValue')
  expect(validResult.cellHighlight).toContain('businessTaxValue')
})

test('valid evidenceType 5030', () => {
  const data = {
    'gwEvidenceType': '電信費帳單-中華電信',
    'evidenceType': '電信費帳單-中華電信',
    'carrierNumber': 'BB21050951',
    'evidenceDate': '20210101',
    'buyerTaxId': '24549210',
    'sellerTaxId': '24549210',
    'taxType': '1',
    'taxableSalesValue': 6906,
    'zeroTaxSalesValue': 0,
    'dutyFreeSalesValue': 0,
    'businessTaxValue': 345,
    'otherFee': 0,
    'totalPayAmount': 7251,
    'remark': '',
    'totalAmount': 7251,
    'evidenceNumber': 'BA20050951',
    'reportingPeriod': '11002',
    'deductionType': '1',
    'ticketId': '0907175959174992',
    'cellHighlight': [],
    'sn': 1,
    'id': '0907175959174992'
  }
  const validResult = validSigoutourData('24549210', data, assignMap)

  expect(validResult.cellHighlight).toContain('evidenceNumber')
})