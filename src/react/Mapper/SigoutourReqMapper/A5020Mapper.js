import { SIGOUTOUR_FIELD_TYPE } from '../sigoutour_mapper';
import { isEmptyOrUndefined } from '../../Util/StringUtils';

const A5020ToGwObj = (data) => {
  const result = {};
  const sigoutourJsonData = data.data.pageList[0].photoList[0].result;
  sigoutourJsonData.forEach((d) => {
    result[SIGOUTOUR_FIELD_TYPE[d.key]] = {
      result: d.text,
      score: d.score,
    };
  });
  result.isDeclareBusinessTax = { result: data.isDeclareBusinessTax, score: [-1] };
  result.photoId = { result: data.data.pageList[0].photoList[0].photo, score: [-1] };
  result.fullPath = { result: data.fullPath, score: [-1] };
  result.reportingPeriod = {
    result: data.reportingPeriod,
    score: [-1],
  };
  result.deductionType = {
    result: data.deductionType,
    score: [-1],
  };
  result.ticketId = {
    result: data.ticketId,
    score: [-1],
  };
  result.errorMsg = {
    result: '',
    score: [-1],
  };
  result.gwEvidenceType = {
    result: data.gwEvidenceType,
    score: [-1],
  };
  const { type } = data.data.pageList[0].photoList[0];
  result.evidenceType = {
    result: type,
    score: [-1],
  };
  result.otherFee.result = isEmptyOrUndefined(result.otherFee.result) ? 0 : parseFloat(result.otherFee.result);
  result.waterFee.result = isEmptyOrUndefined(result.waterFee.result) ? 0 : parseFloat(result.waterFee.result);
  result.basicFee.result = isEmptyOrUndefined(result.basicFee.result) ? 0 : parseFloat(result.basicFee.result);
  result.rebate.result = isEmptyOrUndefined(result.rebate.result) ? 0 : parseFloat(result.rebate.result);
  result.taxableSalesValue = {
    result: result.waterFee.result + result.basicFee.result + result.rebate.result,
    score: [-1],
  };
  result.totalAmount.result = isEmptyOrUndefined(result.totalAmount.result) ? 0 : parseInt(result.totalAmount.result);
  result.businessTaxValue.result = isEmptyOrUndefined(result.businessTaxValue.result) ? 0 : parseInt(result.businessTaxValue.result);
  result.taxableSalesValue.result = isEmptyOrUndefined(result.taxableSalesValue.result) ? 0 : parseInt(result.taxableSalesValue.result);
  result.zeroTaxSalesValue = {
    result: 0,
    score: [-1],
  };
  result.dutyFreeSalesValue = {
    result: 0,
    score: [-1],
  };
  result.totalPayAmount.result = isEmptyOrUndefined(result.totalPayAmount.result) ? 0 : parseInt(result.totalPayAmount.result);
  result.evidenceNumber = result.carrierNumber;
  result.evidenceDate = {
    result: '',
    score: [-1],
  };
  delete result.waterFee;
  delete result.basicFee;
  delete result.carrierNumber;
  return result;
};
export { A5020ToGwObj };
