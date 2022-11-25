import {isEmptyOrUndefined} from '../../Util/StringUtils';
import {getPeriod} from "../../Util/Time";

const A5003ToGwObj = (data) => {
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
      const name = field.name
      result[name] = {
        result: field.text,
        score: -1
      }
    })
  result.salesAmount.result = isEmptyOrUndefined(result.salesAmount.result) ? 0 : parseInt(result.salesAmount.result)
  let taxType = '1'
  if (result.taxable.result === 'selected') {
    taxType = '1'
    result.taxableSalesValue = result.salesAmount
  }
  if (result.zerotax.result === 'selected') {
    taxType = '2'
    result.zerotax = result.salesAmount
  }
  if (result.taxExempt.result === 'selected') {
    taxType = '3'
    result.dutyFreeSalesValue = result.salesAmount
  }
  if ((result.zerotax.result === 'selected' || result.taxExempt.result === 'selected') && result.taxable.result === 'selected') {
    taxType = '9'
    result.taxableSalesValue = result.salesAmount

  }
  result.taxType = {
    result: taxType,
    score: 1
  }
  delete result.salesAmount

  result.isDeclareBusinessTax = { result: data.isDeclareBusinessTax, score: -1 }
  result.fullPath = { result: data.fullPath, score: 1 }
  result.evidenceDate = result['invoiceDate']
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
    result: 'A5003',
    score: 1
  }
  let period = ''
  try {
    period = getPeriod(result.evidenceDate.result)
  } catch (e) {
    console.log(e)
  }
  result.period = {
    result: period,
    score: -1
  }
  result.evidenceNumber = result['invoiceNumber']
  delete result.taxExempt
  delete result.taxable
  delete result.zerotax
  delete result.invoiceNumber
  delete result.invoiceDate
  result.totalAmount.result = isEmptyOrUndefined(result.totalAmount.result) ? 0 : parseInt(result.totalAmount.result)
  result.otherFee = {
    result: 0,
    score: -1
  }
  result.taxAmount.result = isEmptyOrUndefined(result.taxAmount.result) ? 0 : parseInt(result.taxAmount.result)
  result['businessTaxValue'] = result['taxAmount']
  delete result.taxAmount
  result.totalPayAmount = {
    result: 0,
    score: -1
  }
  return result
};
export { A5003ToGwObj };
