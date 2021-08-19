const SIGOUTOUR_FIELD_TYPE = {
  'KEY_INVN': 'evidenceNumber',
  'KEY_INVD': 'evidenceDate',
  'KEY_BUY': 'buyerTaxId',
  'KEY_SEL': 'sellerTaxId',
  'KEY_TXT': 'taxType',
  'KEY_SALA': 'taxableSalesValue',
  'KEY_ZTSA': 'zeroTaxSalesValue',
  'KEY_FTSA': 'dutyFreeSalesValue',
  'KEY_TAXA': 'businessTaxValue',
  'KEY_TOTA': 'totalAmount',
  'KEY_PAYA': 'totalPayAmount',
  'KEY_REM': 'remark'
}

const TAX_TYPE = {
  '1': {
    'name': '應稅',
    'value': 'TAXABLE'
  },
  '2': {
    'name': '零税',
    'value': 'ZERO_TAX'
  },
  '3': {
    'name': '免稅',
    'value': 'DUTY_FEE'
  },
  '9': {
    'name': '混合税',
    'value': 'COMPOUND_DUTY'
  }
}

const SIGOUTOUR_EVIDENCE_TYPE = {
  'A1001': {
    'name': '三聯式統一發票',
    'value': 'TRIPLE_GUI'
  },
  'A2001': {
    'name': '二聯式收銀發票',
    'value': 'DUPLICATE_CASH_REGISTER_GUI'
  },
  'A5001': {
    'name': '三聯式收銀機發票',
    'value': 'TRIPLE_CASH_REGISTER_GUI'
  },
  'A5002': {
    'name': '電子發票證明聯 格式一',
    'value': 'EGUI'
  },
  'A5003': {
    'name': '電子發票證明聯 格式二',
    'value': 'EGUI'
  },
  'A5010': {
    'name': '電力帳單',
    'value': 'ELECTRIC_BILL'
  },
  'A5020': {
    'name': '水費帳單-台灣自來水',
    'value': 'WATER_BILL'
  },
  'A5021': {
    'name': '水費帳單-台北自來水',
    'value': 'WATER_BILL'
  },
  'A5030': {
    'name': '電信費帳單-中華電信',
    'value': 'TELECOM_BILL'
  },
  'A5031': {
    'name': '電信費帳單-台灣大哥大',
    'value': 'TELECOM_BILL'
  },
  'A5032': {
    'name': '電信費帳單-遠傳',
    'value': 'TELECOM_BILL'
  },
  'A5033': {
    'name': '電信費帳單-台灣之星',
    'value': 'TELECOM_BILL'
  },
  'A5034': {
    'name': '電信費帳單-亞太',
    'value': 'TELECOM_BILL'
  },
  'A8001': {
    'name': '海關代徵營業稅繳納證',
    'value': 'CUSTOMS_TAXABLE_EVIDENCE'
  },
  'A3001': {
    'name': '勞保',
    'value': ''
  },
  'A3002': {
    'name': '勞退',
    'value': ''
  },
  'A4001': {
    'name': '健保',
    'value': ''
  }
}

export { SIGOUTOUR_FIELD_TYPE, SIGOUTOUR_EVIDENCE_TYPE, TAX_TYPE }