import { SIGOUTOUR_EVIDENCE_TYPE_REVERSE } from './sigoutour_mapper'

const shareEvidenceBlankExpect = function shareEvidenceBlankExpect(result) {
  //欄位檢核
  expect(notUndefined(result.evidenceType)).toBeTruthy()
  expect(notUndefined(result.buyerTaxId)).toBeTruthy()
  expect(notUndefined(result.sellerTaxId)).toBeTruthy()
  expect(notUndefined(result.taxType)).toBeTruthy()
}

const shareEvidenceNumericExpect = function shareEvidenceNumericExpect(result) {
  //數值欄位檢核
  isInstanceOfNumber(result.totalAmount)
  isInstanceOfNumber(result.totalPayAmount)
  isInstanceOfNumber(result.otherFee)
  isInstanceOfNumber(result.businessTaxValue)
  isInstanceOfNumber(result.taxableSalesValue)
  isInstanceOfNumber(result.zeroTaxSalesValue)
  isInstanceOfNumber(result.dutyFreeSalesValue)
}

const a5020TypeNumericExpect = function a5020TypeNumericExpect(result) {
  isInstanceOfNumber(result.waterFee)
  isInstanceOfNumber(result.basicFee)
}

const evidenceNumberModifierExpect = function evidenceNumberModifierExpect(result, originEvidenceNumber, carrierNumber) {
  expect(result.evidenceNumber).toEqual(carrierNumber)
}

/**
 * A5030,A5031,A5032,A5033
 * @param result
 * @param expectTotalAmount
 */
const totalAmountSummaryExpect = function totalAmountSummaryExpect(result, expectTotalAmount) {
  let realTotalAmount =
    result.taxableSalesValue
    + result.businessTaxValue
    + result.zeroTaxSalesValue
    + result.dutyFreeSalesValue

  expect(realTotalAmount).toEqual(expectTotalAmount)
}

function notUndefined(value) {
  return value != undefined
}

function isInstanceOfNumber(value) {
  let type = typeof value
  return type === 'number'
}

const shareDirectValueMappingExpect = function shareDirectValueMappingExpect(result, expectObj) {
  let evidenceType = ''
  if (result.evidenceType) {
    evidenceType = SIGOUTOUR_EVIDENCE_TYPE_REVERSE[result.evidenceType]
  }
  let resultObj = {
    reportingPeriod: result.reportingPeriod,
    deductionType: result.deductionType,
    ticketId: result.ticketId,
    evidenceType: evidenceType
  }
  expect(resultObj).toMatchObject(expectObj)
}

test('default', () => {

})

export default {
  shareEvidenceBlankExpect,
  shareEvidenceNumericExpect,
  evidenceNumberModifierExpect,
  totalAmountSummaryExpect,
  a5020TypeNumericExpect,
  shareDirectValueMappingExpect
}