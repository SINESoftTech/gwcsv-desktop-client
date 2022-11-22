import { isEmptyOrUndefined } from '../../Util/StringUtils'
import {getCurrentPeriodYear, getCurrentPeriodYearWithMonth} from "../../Util/Time";

const A5031ToGwObj = (data) => {
  const result = {
    taxAmount: {
      result: 0,
      score: -1
    },
    salesAmount: {
      result: 0,
      score: -1
    },
    freeTaxSalesAmount: {
      result: 0,
      score: -1
    },
    zeroTaxSalesAmount: {
      result: 0,
      score: -1
    },
    taxableSalesValue: {
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
  result.isDeclareBusinessTax = { result: data.isDeclareBusinessTax, score: -1 }
  result.fullPath = { result: data.fullPath, score: 1 }
  result.evidenceDate = result['invoiceDate']
  delete result.invoiceDate
  result.taxType = {
    result: '1',
    score: -1
  }
  result.evidenceNumber = result['carrierNumber']
  delete result.carrierNumber
  result.period = result['carrierPeriod']
  result.period.result = getCurrentPeriodYearWithMonth(result.period.result)
  delete result['carrierPeriod']
  result.reportingPeriod = {
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
    result: 'A5031',
    score: 1
  }
  result.taxAmount.result = isEmptyOrUndefined(result.taxAmount.result) ? 0 : parseInt(result.taxAmount.result)
  result.businessTaxValue = result.taxAmount
  delete result.taxAmount
  result.totalAmount.result = isEmptyOrUndefined(result.totalAmount.result) ? 0 : parseInt(result.totalAmount.result)
  result.payAmount.result = isEmptyOrUndefined(result.payAmount.result) ? 0 : parseInt(result.payAmount.result)
  result.totalPayAmount = {
    result: result['payAmount'].result,
    score: -1
  }
  delete result.payAmount
  result.otherFee = {
    result: 0,
    score: -1
  }
  result.salesAmount = isEmptyOrUndefined(result.salesAmount.result) ? 0 : parseInt(result.salesAmount.result)
  console.log("result",result.salesAmount)
  console.log("result",result)
  result.taxableSalesValue.result = result.salesAmount
  delete result.salesAmount
  return result
}
export { A5031ToGwObj }
