const SIGOUTOUR_FIELD_TYPE = {
  'KEY_INVN': 'evidenceNumber',
  'KEY_INVD': 'evidenceDate',
  'KEY_ORDN': 'declarationId',
  'KEY_COMN': 'carrierNumber',
  'KEY_BUY': 'buyerTaxId',
  'KEY_SEL': 'sellerTaxId',
  'KEY_TXT': 'taxType',
  'KEY_BASF': 'basicFee',
  'KEY_WTF': 'waterFee',
  'KEY_REB': 'rebate',
  'KEY_OTHF': 'otherFee',
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
    'number': 1,
    'value': 'TAXABLE'
  },
  '2': {
    'name': '零税',
    'number': 2,
    'value': 'ZERO_TAX'
  },
  '3': {
    'name': '免稅',
    'number': 3,
    'value': 'DUTY_FEE'
  },
  '9': {
    'name': '混合税',
    'value': 'COMPOUND_DUTY'
  }
}


const DEDUCTION_TYPE = {
  '1': 'PURCHASE_AND_FEE',
  '2': 'FIXED_ASSETS',
  '3': 'NON_PURCHASE_AND_FEE',
  '4': 'NON_FIXED_ASSETS'
}

const SIGOUTOUR_EVIDENCE_TYPE = {
  'A1001': {
    'id': '21',
    'name': '三聯式統一發票',
    'value': 'TRIPLE_GUI'
  },
  'A2001': {
    'id': '22',
    'name': '二聯式收銀發票',
    'value': 'DUPLICATE_CASH_REGISTER_GUI'
  },
  'A5001': {
    'id': '25',
    'name': '三聯式收銀機發票',
    'value': 'TRIPLE_CASH_REGISTER_GUI'
  },
  'A5002': {
    'id': '25',
    'name': '電子發票證明聯-格式一',
    'value': 'EGUI'
  },
  'A5003': {
    'id': '25',
    'name': '電子發票證明聯-格式二',
    'value': 'EGUI'
  },
  'A5010': {
    'id': '25',
    'name': '電力帳單',
    'value': 'ELECTRIC_BILL'
  },
  'A5020': {
    'id': '25',
    'name': '水費帳單-台灣自來水',
    'value': 'WATER_BILL'
  },
  'A5021': {
    'id': '25',
    'name': '水費帳單-台北自來水',
    'value': 'WATER_BILL'
  },
  'A5030': {
    'id': '25',
    'name': '電信費帳單-中華電信',
    'value': 'TELECOM_BILL'
  },
  'A5031': {
    'id': '25',
    'name': '電信費帳單-台灣大哥大',
    'value': 'TELECOM_BILL'
  },
  'A5032': {
    'id': '25',
    'name': '電信費帳單-遠傳',
    'value': 'TELECOM_BILL'
  },
  'A5033': {
    'id': '25',
    'name': '電信費帳單-台灣之星',
    'value': 'TELECOM_BILL'
  },
  'A5034': {
    'id': '25',
    'name': '電信費帳單-亞太',
    'value': 'TELECOM_BILL'
  },
  'A8001': {
    'id': '28',
    'name': '海關代徵營業稅繳納證',
    'value': 'CUSTOMS_TAXABLE_EVIDENCE'
  },
  'A3001': {
    'id': '',
    'name': '勞保',
    'value': ''
  },
  'A3002': {
    'id': '',
    'name': '勞退',
    'value': ''
  },
  'A4001': {
    'id': '',
    'name': '健保',
    'value': ''
  }
}

const SIGOUTOUR_EVIDENCE_TYPE_REVERSE = {
  '三聯式統一發票': 'A1001',
  '二聯式收銀發票': 'A2001',
  '三聯式收銀機發票': 'A5001',
  '電子發票證明聯-格式一': 'A5002',
  '電子發票證明聯-格式二': 'A5003',
  '電力帳單': 'A5010',
  '水費帳單-台灣自來水': 'A5020',
  '水費帳單-台北自來水': 'A5021',
  '電信費帳單-中華電信': 'A5030',
  '電信費帳單-台灣大哥大': 'A5031',
  '電信費帳單-遠傳': 'A5032',
  '電信費帳單-台灣之星': 'A5033',
  '電信費帳單-亞太': 'A5034',
  '海關代徵營業稅繳納證': 'A8001',
  '勞保': 'A3001',
  '勞退': 'A3002',
  '健保': 'A4001'
}


const isEmptyOrUndefined = (s) => {
  return s === '' || s === undefined
}

const parseData = (jsonData) => {
  let json = {}
  const jsonDataBody = jsonData['pageList'][0]['photoList'][0]['result']
  if (jsonDataBody.length <= 0) {
    return json
  }
  const type = jsonData['pageList'][0]['photoList'][0]['type']
  json['evidenceType'] = SIGOUTOUR_EVIDENCE_TYPE[type]
  jsonDataBody.forEach(data => {
    const key = SIGOUTOUR_FIELD_TYPE[data['key']]
    json[key] = data['text']
  })
  json['taxType'] = isEmptyOrUndefined(TAX_TYPE[json.taxType]) ? '' : TAX_TYPE[json.taxType]
  if (type === 'A5020') {
    json['waterFee'] = json['waterFee'] === '' ? 0 : json['waterFee']
    json['basicFee'] = json['basicFee'] === '' ? 0 : json['basicFee']
    json['taxableSalesValue'] = (parseFloat(json['waterFee']) + parseFloat(json['basicFee']))
  }

  json['totalAmount'] = isEmptyOrUndefined(json['totalAmount']) ? 0 : parseInt(json['totalAmount'])
  json['totalPayAmount'] = isEmptyOrUndefined(json['totalPayAmount']) ? 0 : parseInt(json['totalPayAmount'])
  json['otherFee'] = isEmptyOrUndefined(json['otherFee']) ? 0 : parseInt(json['otherFee'])
  json['businessTaxValue'] = isEmptyOrUndefined(json['businessTaxValue']) ? 0 : parseInt(json['businessTaxValue'])
  json['taxableSalesValue'] = isEmptyOrUndefined(json['taxableSalesValue']) ? 0 : parseInt(json['taxableSalesValue'])
  json['zeroTaxSalesValue'] = isEmptyOrUndefined(json['zeroTaxSalesValue']) ? 0 : parseInt(json['zeroTaxSalesValue'])
  json['dutyFreeSalesValue'] = isEmptyOrUndefined(json['dutyFreeSalesValue']) ? 0 : parseInt(json['dutyFreeSalesValue'])
  if (type === 'A5030' || type === 'A5033' || type === 'A5031' || type === 'A5032') {
    json['totalAmount'] = json['taxableSalesValue'] + json['businessTaxValue'] + json['zeroTaxSalesValue'] + json['dutyFreeSalesValue']
  }
  if (json['evidenceNumber'] === undefined) {
    json['evidenceNumber'] = json['carrierNumber']
  }
  json['buyerTaxId'] = json['buyerTaxId'] === undefined ? '' : json['buyerTaxId']
  json['sellerTaxId'] = json['sellerTaxId'] === undefined ? '' : json['sellerTaxId']
  return json
}


class SigoutourMapperClass {

  toView(ticketId, deductionType, reportingPeriod, evidenceType, jsonData) {
    const json = parseData(jsonData)
    json['sellerTaxId'] = isEmptyOrUndefined(json['sellerTaxId']) ? '' : json['sellerTaxId']
    json['buyerTaxId'] = isEmptyOrUndefined(json['buyerTaxId']) ? '' : json['buyerTaxId']
    json['taxType'] = isEmptyOrUndefined(json['taxType']) ? '' : json['taxType'].number
    json['evidenceType'] = isEmptyOrUndefined(json['evidenceType']) ? '' : json['evidenceType'].name
    json['reportingPeriod'] = reportingPeriod
    json['deductionType'] = deductionType
    json['ticketId'] = ticketId
    json['errorMsg'] = jsonData['errorMsg']
    json['gwEvidenceType'] = SIGOUTOUR_EVIDENCE_TYPE[evidenceType].name
    console.log('toView', json)
    return json
  }

  toGw(ticketId, reportingPeriod, deductionType, isDeclareBusinessTax, gwEvidenceType, jsonData) {
    console.log('toGw1', ticketId, reportingPeriod, deductionType, isDeclareBusinessTax, gwEvidenceType, jsonData)
    const json = parseData(jsonData)
    json['id'] = ticketId
    json['evidenceType'] = json['evidenceType'].value
    json['taxType'] = json['taxType'].value
    const evidenceDate = json['evidenceDate']
    json['reportingPeriod'] = reportingPeriod
    json['deductionType'] = DEDUCTION_TYPE[deductionType]
    json['isDeclareBusinessTax'] = isDeclareBusinessTax
    json['gwEvidenceType'] = SIGOUTOUR_EVIDENCE_TYPE[gwEvidenceType].value
    json['evidenceDate'] = new Date(evidenceDate.substring(0, 4) + '-' + evidenceDate.substring(4, 6) + '-' + evidenceDate.substring(6, 8)).getTime()
    return json
  }

  toSigoutour(sigoutourJson, data) {
    const jsonDataBody = sigoutourJson['pageList'][0]['photoList'][0]['result']
    const evidenceType = SIGOUTOUR_EVIDENCE_TYPE[sigoutourJson['pageList'][0]['photoList'][0]['type']].value
    const isBillType = evidenceType === 'TELECOM_BILL' || evidenceType === 'WATER_BILL' || evidenceType === 'ELECTRIC_BILL'
    jsonDataBody.forEach(obj => {
      if (isBillType && obj['key'] === 'KEY_COMN') {
        obj['text'] = data['evidenceNumber']
      } else {
        const key = SIGOUTOUR_FIELD_TYPE[obj['key']]
        const value = data[key]
        obj['text'] = value
      }
    })
    return sigoutourJson
  }

}

const reverseIndex = (obj) => {
  const ret = {}
  Object.keys(obj).forEach(key => {
    ret[obj[key]] = key
  })
  return ret
}

const SigoutourMapper = new SigoutourMapperClass()
export { SIGOUTOUR_EVIDENCE_TYPE, SIGOUTOUR_FIELD_TYPE, reverseIndex, SIGOUTOUR_EVIDENCE_TYPE_REVERSE }

export default SigoutourMapper