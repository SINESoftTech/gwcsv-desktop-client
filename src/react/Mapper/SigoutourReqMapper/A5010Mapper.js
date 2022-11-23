import {isEmptyOrUndefined} from '../../Util/StringUtils'
import {getCurrentPeriodYearWithMonth} from "../../Util/Time";

const A5010ToGwObj = (data) => {
    const result = {
        taxableSalesValue: {
            result: 0,
            score: -1
        },
        zeroTaxSalesValue: {
            result: 0,
            score: -1
        },
        dutyFreeSalesValue: {
            result: 0,
            score: -1
        }
    }
    data.data.fields
        .forEach(field => {
            result[field.name] = {
                result: field.text,
                score: -1
            }
        })

    result.isDeclareBusinessTax = {result: data.isDeclareBusinessTax, score: -1}
    result.fullPath = {result: data.fullPath, score: 1}
    result.evidenceNumber = result['carrierNumber']
    delete result.carrierNumber
    result.taxType = {
        result: '1',
        score: -1
    }
    result.period = result['carrierPeriod']
    console.log(result.period)
    result.evidenceDate = {
        result: result.period.result + '01',
        score: -1
    }
    result.period.result = getCurrentPeriodYearWithMonth(result.period.result)
    delete result['carrierPeriod']


    result.reportingPejriod = {
        result: data.reportingPeriod,
        score: 1
    }
    result.deductionType = {
        result: data.deductionType,
        score: 1
    }
    result.id = {
        result: data.id,
        score: 1
    }
    result.errorMsg = {
        result: '',
        score: 1
    }
    result.gwEvidenceType = {
        result: data.gwEvidenceType,
        score: 1
    }
    result.evidenceType = {
        result: 'A5010',
        score: 1
    }

    result.totalAmount.result = isEmptyOrUndefined(result.totalAmount.result) ? 0 : parseInt(result.totalAmount.result)
    result.otherFee = {
        result: 0,
        score: -1
    }
    result.taxAmount.result = isEmptyOrUndefined(result.taxAmount.result) ? 0 : parseInt(result.taxAmount.result)
    result.businessTaxValue = result.taxAmount
    delete result.taxAmount
    result.salesAmount.result = isEmptyOrUndefined(result.salesAmount.result) ? 0 : parseInt(result.salesAmount.result)
    result.taxableSalesValue = result.salesAmount
    delete result.salesAmount
    result.totalPayAmount = {
        result: 0,
        score: -1
    }
    return result
}
export {A5010ToGwObj}
