import {A5003ToGwObj} from './SigoutourReqMapper/A5003Mapper'
import {A5002ToGwObj} from './SigoutourReqMapper/A5002Mapper'
import {A1001ToGwObj} from './SigoutourReqMapper/A1001Mapper'
import {A2001ToGwObj} from './SigoutourReqMapper/A2001Mapper'
import {A5001ToGwObj} from './SigoutourReqMapper/A5001Mapper'
import {A5010ToGwObj} from './SigoutourReqMapper/A5010Mapper'
import {A5020ToGwObj} from './SigoutourReqMapper/A5020Mapper'
import {A5021ToGwObj} from './SigoutourReqMapper/A5021Mapper'
import {A5030ToGwObj} from './SigoutourReqMapper/A5030Mapper'
import {A5031ToGwObj} from './SigoutourReqMapper/A5031Mapper'
import {A5032ToGwObj} from './SigoutourReqMapper/A5032Mapper'
import {A5033ToGwObj} from './SigoutourReqMapper/A5033Mapper'
import {A5034ToGwObj} from './SigoutourReqMapper/A5034Mapper'
import {A8001ToGwObj} from './SigoutourReqMapper/A8001Mapper'
import {convertUnixTimestamp} from "../Util/Time";


const TAX_TYPE = {
    1: {
        name: '應稅',
        number: 1,
        value: 'TAXABLE'
    },
    2: {
        name: '零税',
        number: 2,
        value: 'ZERO_TAX'
    },
    3: {
        name: '免稅',
        number: 3,
        value: 'DUTY_FEE'
    },
}

const DEDUCTION_TYPE = {
    1: 'PURCHASE_AND_FEE',
    2: 'FIXED_ASSETS',
    3: 'NON_PURCHASE_AND_FEE',
    4: 'NON_FIXED_ASSETS'
}

const GW_EVIDENCE_TYPE = {
    A1001: {
        id: '21',
        name: '三聯式統一發票',
        value: 'TRIPLE_GUI'
    },
    A2001: {
        id: '22',
        name: '二聯式收銀發票',
        value: 'DUPLICATE_CASH_REGISTER_GUI'
    },
    A5001: {
        id: '25',
        name: '三聯式收銀機發票',
        value: 'TRIPLE_CASH_REGISTER_GUI'
    },
    A5002: {
        id: '25',
        name: '電子發票證明聯-格式一',
        value: 'EGUI'
    },
    A5003: {
        id: '25',
        name: '電子發票證明聯-格式二',
        value: 'EGUI'
    },
    A5010: {
        id: '25',
        name: '電力帳單',
        value: 'ELECTRIC_BILL'
    },
    A5020: {
        id: '25',
        name: '水費帳單-台灣自來水',
        value: 'WATER_BILL'
    },
    A5021: {
        id: '25',
        name: '水費帳單-台北自來水',
        value: 'WATER_BILL'
    },
    A5030: {
        id: '25',
        name: '電信費帳單-中華電信',
        value: 'TELECOM_BILL'
    },
    A5031: {
        id: '25',
        name: '電信費帳單-台灣大哥大',
        value: 'TELECOM_BILL'
    },
    A5032: {
        id: '25',
        name: '電信費帳單-遠傳',
        value: 'TELECOM_BILL'
    },
    A5033: {
        id: '25',
        name: '電信費帳單-台灣之星',
        value: 'TELECOM_BILL'
    },
    A5034: {
        id: '25',
        name: '電信費帳單-亞太',
        value: 'TELECOM_BILL'
    },
    A8001: {
        id: '28',
        name: '海關代徵營業稅繳納證',
        value: 'CUSTOMS_TAXABLE_EVIDENCE'
    },
    A3001: {
        id: '',
        name: '勞保',
        value: ''
    },
    A3002: {
        id: '',
        name: '勞退',
        value: ''
    },
    A4001: {
        id: '',
        name: '健保',
        value: ''
    },
    other: {
        id: '',
        name: '其他',
        value: ''
    },
    '': {
        id: '',
        name: '',
        value: ''
    }
}

const EVIDENCE_TYPE = {
    "三聯式統一發票": "A1001",
    "二聯式收銀發票": "A2001",
    "三聯式收銀機發票": "A5001",
    "電子發票證明聯-格式一": "A5002",
    "電子發票證明聯-格式二": "A5003",
    "電力帳單": "A5010",
    "水費帳單-台灣自來水": "A5020",
    "水費帳單-台北自來水": "A5021",
    "電信費帳單-中華電信": "A5030",
    "電信費帳單-台灣大哥大": "A5031",
    "電信費帳單-遠傳": "A5032",
    "電信費帳單-台灣之星": "A5033",
    "電信費帳單-亞太": "A5034",
    "海關代徵營業稅繳納證": "A8001",
}

//period add
const parseToDomainObjStrategy = {
    A1001: (data) => A1001ToGwObj(data),
    A2001: (data) => A2001ToGwObj(data),
    A5001: (data) => A5001ToGwObj(data),
    A5002: (data) => A5002ToGwObj(data),
    A5003: (data) => A5003ToGwObj(data),
    A5010: (data) => A5010ToGwObj(data),
    A5020: (data) => A5020ToGwObj(data),
    A5021: (data) => A5021ToGwObj(data),
    A5030: (data) => A5030ToGwObj(data),
    A5031: (data) => A5031ToGwObj(data),
    A5032: (data) => A5032ToGwObj(data),
    A5033: (data) => A5033ToGwObj(data),
    A5034: (data) => A5034ToGwObj(data),
    A8001: (data) => A8001ToGwObj(data),
    // todo
    A3001(data) {

    },
    A3002(data) {

    },
    A4001(data) {

    }
}

class GwMapperClass {
    toDomainObj(jsonData) {
        const {gwEvidenceType} = jsonData
        if (jsonData.status === 'completed') {
            const data = parseToDomainObjStrategy[gwEvidenceType](jsonData)
            data.createDate = {
                result: jsonData.createDate,
                score: -1
            }
            return data
        }

        return {
            isDeclareBusinessTax: {result: jsonData.isDeclareBusinessTax, score: -1},
            fullPath: {result: jsonData.fullPath, score: -1},
            evidenceDate: {result: '', score: -1},
            buyerTaxId: {result: '', score: -1},
            taxType: {result: '1', score: -1},
            otherFee: {result: 0, score: -1},
            period: {result: 0, score: -1},
            taxableSalesValue: {result: 0, score: -1},
            dutyFreeSalesValue: {result: 0, score: -1},
            businessTaxValue: {result: 0, score: -1},
            totalPayAmount: {result: 0, score: -1},
            totalAmount: {result: 0, score: -1},
            reportingPeriod: {result: jsonData.reportingPeriod, score: -1},
            deductionType: {result: jsonData.deductionType, score: -1},
            id: {result: jsonData.id, score: -1},
            errorMsg: {result: '', score: -1},
            gwEvidenceType: {result: gwEvidenceType, score: -1},
            evidenceType: {result: '', score: -1},
            zeroTaxSalesValue: {result: 0, score: -1},
            evidenceNumber: {result: '', score: -1},
            sellerTaxId: {result: '', score: -1}
        }
    }

    toView(jsonData, ticketId, sn) {
        const result = {}
        Object.keys(jsonData).forEach((key) => {
            result[key] = jsonData[key].result
        })
        const {name} = GW_EVIDENCE_TYPE[result['evidenceType']]
        result['evidenceType'] = name
        result.sn = sn
        result.id = ticketId
        result.errorMsg = jsonData.errorMsg.result
        return result
    }

    toGw(jsonData) {
        const evidenceType = GW_EVIDENCE_TYPE[jsonData.evidenceType.result].value
        const declareBusinessTax = jsonData.isDeclareBusinessTax.result
        const commentType = "BLANK"
        const summaryCount = null
        //todo
        //todo if bill convert
        const evidenceDate = convertUnixTimestamp(jsonData.evidenceDate.result)
        const evidencePeriod = jsonData.period.result
        const buyerTaxId = jsonData.buyerTaxId.result
        const evidenceId = jsonData.evidenceNumber.result
        const reportingPeriod = jsonData.reportingPeriod.result
        const sellerTaxId = jsonData.sellerTaxId.result
        const totalAmount = jsonData.totalAmount.result
        const totalPayAmount = jsonData.totalPayAmount.result
        const otherFee = jsonData.otherFee.result
        const evidenceData = {
            buyerTaxId: buyerTaxId,
            consolidateFiling: {
                commentType,
                summaryCount,
            },
            declareBusinessTax: declareBusinessTax,
            evidenceDate: evidenceDate,
            evidenceType: evidenceType,
            evidencePeriod: evidencePeriod,
            id: {
                evidenceId: evidenceId,
                guiId: null,
                declarationId: null,
            },
            otherFee: otherFee,
            reportingPeriod: reportingPeriod,
            sellerTaxId: sellerTaxId,
            status: null,
            taxInfoList: buildTaxInfo(jsonData),
            totalAmount: totalAmount,
            totalPayAmount: totalPayAmount,
        };
        console.log("AAA", evidenceData)
        return evidenceData
    }
}

const buildTaxInfo = (jsonData) => {
    const clearanceType = "BLANK"
    const taxInfoList = []
    const taxableSalesValue = jsonData.taxableSalesValue.result
    const tax = jsonData.businessTaxValue.result
    const zeroTaxSalesValue = jsonData.zeroTaxSalesValue.result
    const dutyFreeSalesValue = jsonData.dutyFreeSalesValue.result
    const deductionTypeValue = parseInt(jsonData.deductionType.result)
    const deductionType = DEDUCTION_TYPE[deductionTypeValue]
    const deductionType2 = DEDUCTION_TYPE[[deductionTypeValue].map(d => {
        if (d === 1 || d === 3) {
            return 3
        }
        if (d === 2 || d === 4) {
            return 4
        }
    })[0]]
    if (taxableSalesValue > 0) {
        taxInfoList.push(
            {
                "taxType": "TAXABLE",
                "amountReq": {
                    "value": taxableSalesValue,
                    "currency": "TWD"
                },
                'tax': tax,
                'deductionType': deductionType,
                'clearanceType': clearanceType
            }
        )
    }
    if (zeroTaxSalesValue > 0) {
        taxInfoList.push(
            {
                "taxType": "TAXABLE",
                "amountReq": {
                    "value": zeroTaxSalesValue,
                    "currency": "TWD"
                },
                'tax': 0,
                'deductionType': deductionType2,
                'clearanceType': clearanceType
            }
        )
    }
    if (dutyFreeSalesValue > 0) {
        taxInfoList.push(
            {
                "taxType": "TAXABLE",
                "amountReq": {
                    "value": dutyFreeSalesValue,
                    "currency": "TWD"
                },
                'tax': 0,
                'deductionType': deductionType2,
                'clearanceType': clearanceType
            }
        )
    }
    return taxInfoList
}


const GwMapper = new GwMapperClass()
export {GW_EVIDENCE_TYPE, DEDUCTION_TYPE, EVIDENCE_TYPE}

export default GwMapper
