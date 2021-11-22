import { A5003ToGwObj } from './SigoutourReqMapper/A5003Mapper'
import { A5002ToGwObj } from './SigoutourReqMapper/A5002Mapper'
import { A1001ToGwObj } from './SigoutourReqMapper/A1001Mapper'
import { A2001ToGwObj } from './SigoutourReqMapper/A2001Mapper'
import { A5001ToGwObj } from './SigoutourReqMapper/A5001Mapper'
import { A5010ToGwObj } from './SigoutourReqMapper/A5010Mapper'
import { A5020ToGwObj } from './SigoutourReqMapper/A5020Mapper'
import { A5021ToGwObj } from './SigoutourReqMapper/A5021Mapper'
import { A5030ToGwObj } from './SigoutourReqMapper/A5030Mapper'
import { A5031ToGwObj } from './SigoutourReqMapper/A5031Mapper'
import { A5032ToGwObj } from './SigoutourReqMapper/A5032Mapper'
import { A5033ToGwObj } from './SigoutourReqMapper/A5033Mapper'
import { A5034ToGwObj } from './SigoutourReqMapper/A5034Mapper'
import { A8001ToGwObj } from './SigoutourReqMapper/A8001Mapper'

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
  },
  'other': {
    'id': '',
    'name': '其他',
    'value': ''
  },
  '': {
    'id': '',
    'name': '',
    'value': ''
  }
}

const parseToDomainObjStrategy = {
  'A1001': (data) => A1001ToGwObj(data),
  'A2001': (data) => A2001ToGwObj(data),
  'A5001': (data) => A5001ToGwObj(data),
  'A5002': (data) => A5002ToGwObj(data),
  'A5003': (data) => A5003ToGwObj(data),
  'A5010': (data) => A5010ToGwObj(data),
  'A5020': (data) => A5020ToGwObj(data),
  'A5021': (data) => A5021ToGwObj(data),
  'A5030': (data) => A5030ToGwObj(data),
  'A5031': (data) => A5031ToGwObj(data),
  'A5032': (data) => A5032ToGwObj(data),
  'A5033': (data) => A5033ToGwObj(data),
  'A5034': (data) => A5034ToGwObj(data),
  'A8001': (data) => A8001ToGwObj(data),
  //todo
  'A3001': function(data) {

  },
  'A3002': function(data) {

  },
  'A4001': function(data) {

  }
}

class SigoutourMapperClass {

  toDomainObj(jsonData) {
    console.log('toDomainObj', jsonData)

    const gwEvidenceType = jsonData.gwEvidenceType
    if (jsonData.status === 'completed') {
      return parseToDomainObjStrategy[gwEvidenceType](jsonData)
    }
    return {
      isDeclareBusinessTax: { result: jsonData['isDeclareBusinessTax'], score: [-1] },
      fullPath: { result: jsonData['fullPath'], score: [-1] },
      declarationId: { result: '', score: [-1] },
      evidenceDate: { result: '', score: [-1] },
      buyerTaxId: { result: '', score: [-1] },
      taxType: { result: '1', score: [-1] },
      otherFee: { result: 0, score: [-1] },
      taxableSalesValue: { result: 0, score: [-1] },
      dutyFreeSalesValue: { result: 0, score: [-1] },
      businessTaxValue: { result: 0, score: [-1] },
      totalPayAmount: { result: 0, score: [-1] },
      totalAmount: { result: 0, score: [-1] },
      reportingPeriod: { result: jsonData['reportingPeriod'], score: [-1] },
      deductionType: { result: jsonData['deductionType'], score: [-1] },
      ticketId: { result: jsonData['ticketId'], score: [-1] },
      errorMsg: { result: '', score: [-1] },
      gwEvidenceType: { result: gwEvidenceType, score: [-1] },
      evidenceType: { result: '', score: [-1] },
      zeroTaxSalesValue: { result: 0, score: [-1] },
      evidenceNumber: { result: '', score: [-1] },
      sellerTaxId: { result: '', score: [-1] }
    }
  }

  toView(jsonData, ticketId, sn) {
    let result = {}
    Object.keys(jsonData).forEach(key => {
      result[key] = jsonData[key].result
    })
    result['sn'] = sn
    result['id'] = ticketId
    result['errorMsg'] = jsonData['errorMsg'].result
    return result
  }

  toGw(jsonData) {
    let result = {}
    Object.keys(jsonData).forEach(key => {
      result[key] = jsonData[key].result
    })
    result['evidenceDate'] = new Date(result['evidenceDate'].substring(0, 4) + '-' + result['evidenceDate'].substring(4, 6) + '-' + result['evidenceDate'].substring(6, 8)).getTime()
    result['gwEvidenceType'] = SIGOUTOUR_EVIDENCE_TYPE[result['gwEvidenceType']].value
    result['evidenceType'] = SIGOUTOUR_EVIDENCE_TYPE[result['evidenceType']].value
    result['deductionType'] = DEDUCTION_TYPE[result['deductionType']]
    return result
  }

}

const SigoutourMapper = new SigoutourMapperClass()
export { SIGOUTOUR_EVIDENCE_TYPE, SIGOUTOUR_FIELD_TYPE, DEDUCTION_TYPE }

export default SigoutourMapper