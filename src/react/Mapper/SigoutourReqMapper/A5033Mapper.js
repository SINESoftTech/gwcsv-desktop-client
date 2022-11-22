import { isEmptyOrUndefined } from '../../Util/StringUtils'
import {getCurrentPeriodYear, getCurrentPeriodYearWithMonth} from "../../Util/Time";

const A5033ToGwObj = (data) => {
  const result = {
    taxAmount: {
      result: 0,
      score: -1
    },
    salesAmount: {
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
  result.fullPath = { result: data.fullPath, score: -1 }
  result.evidenceDate = {
    result: '',
    score: -1
  }
  result.otherFee.result = isEmptyOrUndefined(result.otherFee.result) ? 0 : parseFloat(result.otherFee.result)
  result.reportingPeriod = {
    result: data.reportingPeriod,
    score: -1
  }
  result.deductionType = {
    result: data.deductionType,
    score: -1
  }
  result.id = {
    result: data.id,
    score: -1
  }
  result.errorMsg = {
    result: '',
    score: -1
  }
  result.gwEvidenceType = {
    result: data.gwEvidenceType,
    score: -1
  }
  result.evidenceType = {
    result: 'A5033',
    score: 1
  }
  result.period = result['carrierPeriod']
  result.period.result = getCurrentPeriodYearWithMonth(result.period.result)
  delete result['carrierPeriod']
  result.evidenceNumber = result.carrierNumber
  delete result.carrierNumber
  result.dutyFreeSalesValue = {
    result: 0,
    score: -1
  }
  //
  //{
  //       taxType: { result: '1', score: -1 },
  //     }


  result.salesAmount.result = isEmptyOrUndefined(result.salesAmount.result) ? 0 : parseInt(result.salesAmount.result)
  result.zeroTaxSalesAmount.result = isEmptyOrUndefined(result.zeroTaxSalesAmount.result) ? 0 : parseInt(result.zeroTaxSalesAmount.result)
  result.taxAmount.result = isEmptyOrUndefined(result.taxAmount.result) ? 0 : parseInt(result.taxAmount.result)

  result.totalAmount = {
    result: result.salesAmount.result + result.zeroTaxSalesAmount.result + result.dutyFreeSalesValue.result + result.taxAmount.result,
    score: -1
  }
  result.businessTaxValue = result.taxAmount
  result.zeroTaxSalesValue = result.zeroTaxSalesAmount
  result.taxableSalesValue = result.salesAmount
  let taxType = '1'
  if (result.taxableSalesValue.result > 0) {
    taxType = '1'
  }
  if (result.zeroTaxSalesValue.result > 0) {
    taxType = '3'
  }
  if (result.zeroTaxSalesValue.result > 0 && result.taxableSalesValue.result > 0) {
    taxType = '9'
  }
  result.taxType = {
    result: taxType,
    score: -1
  }
  delete result.salesAmount
  delete result.zeroTaxSalesAmount

  result.payAmount.result = isEmptyOrUndefined(result.payAmount.result) ? 0 : parseInt(result.payAmount.result)
  result.totalPayAmount = result.payAmount
  delete result['payAmount']

  return result
}
export { A5033ToGwObj }
