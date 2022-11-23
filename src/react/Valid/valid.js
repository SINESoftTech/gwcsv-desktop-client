import moment from 'moment';
import {getPeriod} from '../Util/Time';
import {EVIDENCE_TYPE} from "../Mapper/gw_mapper";

const validTaxId = (taxId) => {
    const invalidList = '00000000,11111111';
    if (/^\d{8}$/.test(taxId) === false || invalidList.indexOf(taxId) !== -1) {
        return false;
    }
    const validateOperator = [1, 2, 1, 2, 1, 2, 4, 1];
    let sum = 0;
    const calculate = function (product) { // 個位數 + 十位數
        const ones = product % 10;
        const tens = (product - ones) / 10;
        return ones + tens;
    };
    for (let i = 0; i < validateOperator.length; i++) {
        sum += calculate(taxId[i] * validateOperator[i]);
    }
    return sum % 10 === 0 || (taxId[6] === '7' && (sum + 1) % 10 === 0);
};

const validData = (clientTaxId, json, assignMap) => {
    // console.log('valid', clientTaxId, json);
    let validResult = validTaxMoney(json);
    const isCustom = json.evidenceType === 'A8001';
    if (!isCustom && (json.sellerTaxId.length !== 8 || !validTaxId(json.sellerTaxId))) {
        validResult.push('sellerTaxId');
    }
    if (json.buyerTaxId.length !== 8 || !validTaxId(json.buyerTaxId) || json.buyerTaxId !== clientTaxId) {
        validResult.push('buyerTaxId');
    }
    const type = EVIDENCE_TYPE[json['evidenceType']]
    validResult = validResult
        .concat(validEvidenceType[type](json, assignMap))
        .concat(validEvidenceDate(json));
    json.cellHighlight = [...new Set(validResult)];

    json.cellHighlight = json.cellHighlight
        .filter((value) => value !== '');
    json.cellHighlight = json.cellHighlight.length > 0 ? json.cellHighlight.concat('sn') : json.cellHighlight;
    console.log('valid result', json);
    return json;
};

const validEvidenceDate = (json) => {
    if (!moment(json.evidenceDate, 'YYYYMMDD', true).isValid()) {
        return 'evidenceDate';
    }
    const evidencePeriod = getPeriod(json.evidenceDate);
    const reportingPeriod = parseInt(json.reportingPeriod);
    const tenYearAgoPeriod = reportingPeriod - 1000;
    const isBetweenTenYearAgoPeriodAndReportingPeriod = (reportingPeriod >= evidencePeriod) && (tenYearAgoPeriod <= evidencePeriod);
    if (!isBetweenTenYearAgoPeriodAndReportingPeriod) {
        return 'evidenceDate';
    }
    return '';
};

const validGUI = (typeValue, json, assignMap) => {
    if (json.evidenceDate === undefined) {
        return ['evidenceNumber'];
    }
    const yyyymm = getPeriod(json.evidenceDate);
    console.log('validGUI',yyyymm)
    const trackId = json.evidenceNumber.substring(0, 2);
    console.log(assignMap[typeValue][yyyymm])
    const isTrackIdIncludeAssign = assignMap[typeValue][yyyymm] === undefined ? false : assignMap[typeValue][yyyymm].includes(trackId);
    if(!isTrackIdIncludeAssign){
        return ['evidenceNumber']
    }
    const isNumber = !isNaN(json.evidenceNumber.substring(2));
    return json.evidenceNumber !== undefined && json.evidenceNumber.length === 10 && isTrackIdIncludeAssign && isNumber ? [''] : ['evidenceNumber'];
};

const validBill = (json) => (json.evidenceNumber !== undefined && json.evidenceNumber.length === 10 && json.evidenceNumber.startsWith('BB') ? [''] : ['evidenceNumber']);

const validEvidenceType = {
    A1001: (json, assignMap) => validGUI(21, json, assignMap),
    A2001: (json, assignMap) => validGUI(22, json, assignMap),
    A5001: (json, assignMap) => validGUI(25, json, assignMap),
    A5002: (json, assignMap) => validGUI(25, json, assignMap),
    A5003: (json, assignMap) => validGUI(25, json, assignMap),
    A5010: (json, assignMap) => validBill(json),
    A5020: (json, assignMap) => validBill(json),
    A5021: (json, assignMap) => validBill(json),
    A5030: (json, assignMap) => validBill(json),
    A5031: (json, assignMap) => validBill(json),
    A5033: (json, assignMap) => validBill(json),
    A5032: (json, assignMap) => validBill(json),
    A5034: (json, assignMap) => validBill(json),
    A8001: (json, assignMap) => {
        const {evidenceNumber} = json;
        const isLenEqual14 = evidenceNumber !== undefined && evidenceNumber.length === 14;
        const firstAlpha = evidenceNumber.substring(0, 1);
        const isBlank = firstAlpha !== ' ';
        const thirdAlpha = evidenceNumber.substring(2, 3);
        const isEqual1 = thirdAlpha !== '1';
        const isEvidenceNumberOk = isLenEqual14 && isBlank && isEqual1 ? '' : 'evidenceNumber';
        return [isEvidenceNumberOk];
    },
    '': (json, assignMap) => ['evidenceType', 'evidenceNumber'],
    undefined: (json, assignMap) => ['evidenceType', 'evidenceNumber'],
};

const validTaxType = {
    1: (json) => {
        const isZeroTaxSalesValueEq0 = parseInt(json.zeroTaxSalesValue) === 0 ? '' : 'zeroTaxSalesValue';
        const isDutyFreeSalesValueEq0 = parseInt(json.dutyFreeSalesValue) === 0 ? '' : 'dutyFreeSalesValue';
        const isTaxableSalesValueGte0 = parseInt(json.taxableSalesValue) >= 0 ? '' : 'taxableSalesValue';
        return [isZeroTaxSalesValueEq0, isDutyFreeSalesValueEq0, isTaxableSalesValueGte0];
    },
    3: (json) => {
        const isZeroTaxSalesValueEq0 = parseInt(json.zeroTaxSalesValue) === 0 ? '' : 'zeroTaxSalesValue';
        const isDutyFreeSalesValueGte0 = parseInt(json.dutyFreeSalesValue) >= 0 ? '' : 'dutyFreeSalesValue';
        const isTaxableSalesValueEq0 = parseInt(json.taxableSalesValue) === 0 ? '' : 'taxableSalesValue';
        const isBusinessTaxValueEq0 = parseInt(json.businessTaxValue) === 0 ? '' : 'businessTaxValue';
        return [isZeroTaxSalesValueEq0, isDutyFreeSalesValueGte0, isTaxableSalesValueEq0, isBusinessTaxValueEq0];
    },
    2: (json) => {
        const isZeroTaxSalesValueGte0 = parseInt(json.zeroTaxSalesValue) === 0 ? '' : 'zeroTaxSalesValue';
        const isDutyFreeSalesValueEq0 = parseInt(json.dutyFreeSalesValue) >= 0 ? '' : 'dutyFreeSalesValue';
        const isTaxableSalesValueEq0 = parseInt(json.taxableSalesValue) === 0 ? '' : 'taxableSalesValue';
        const isBusinessTaxValueEq0 = parseInt(json.businessTaxValue) === 0 ? '' : 'businessTaxValue';
        return [isZeroTaxSalesValueGte0, isDutyFreeSalesValueEq0, isTaxableSalesValueEq0, isBusinessTaxValueEq0];
    },
    9: (json) => {
        const isTaxableSalesValueGte0 = parseInt(json.taxableSalesValue) >= 0 ? '' : 'taxableSalesValue';
        const isBusinessTaxValueGt0 = parseInt(json.businessTaxValue) >= 0 ? '' : 'businessTaxValue';
        const isZeroTaxSalesValueGt0 = parseInt(json.zeroTaxSalesValue) >= 0 ? '' : 'zeroTaxSalesValue';
        const isDutyFreeSalesValueGt0 = parseInt(json.dutyFreeSalesValue) >= 0 ? '' : 'dutyFreeSalesValue';
        return [isTaxableSalesValueGte0, isBusinessTaxValueGt0, isZeroTaxSalesValueGt0, isDutyFreeSalesValueGt0];
    },
    '': (json) => ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'taxType', 'businessTaxValue'],
    undefined: (json) => ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'taxType', 'businessTaxValue'],
};

const validB2B = (json) => {
    const taxableSalesValue = parseInt(json.taxableSalesValue);
    const businessTaxValue = parseInt(json.businessTaxValue);
    const withoutTaxAmount = parseInt(json.taxableSalesValue) + parseInt(json.zeroTaxSalesValue) + parseInt(json.dutyFreeSalesValue);
    const businessCalcTaxValueResult = Math.round(taxableSalesValue * 0.05);
    const calcResultValue = businessCalcTaxValueResult + withoutTaxAmount - parseInt(json.totalAmount);
    if (calcResultValue <= 1 && calcResultValue >= 0) {
        return [];
    }
    if (businessCalcTaxValueResult === businessTaxValue) {
        return [];
    }
    return ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'businessTaxValue'];
};

const validB2C = (json) => {
    const taxableSalesValue = parseInt(json.taxableSalesValue);
    const businessTaxValue = parseInt(json.businessTaxValue);
    const withoutTaxAmount = parseInt(json.taxableSalesValue) + parseInt(json.zeroTaxSalesValue) + parseInt(json.dutyFreeSalesValue);
    const calcBusinessTaxValueResult = Math.round(Math.round(json.totalAmount / 1.05) * 0.05);
    const isEqualBusinessTaxValue = calcBusinessTaxValueResult === businessTaxValue;
    const calcTotalAmount = calcBusinessTaxValueResult + withoutTaxAmount;
    const isEqualTotalAmount = calcTotalAmount === parseInt(json.totalAmount);
    if (isEqualBusinessTaxValue && isEqualTotalAmount) {
        return [];
    }
    const calcTaxableSaleValue = Math.round(parseInt(json.totalAmount) / 1.05);
    const calcBusinessTaxValue = parseInt(json.totalAmount) - calcTaxableSaleValue;
    const isEqualBusinessTaxValueCase2 = calcBusinessTaxValue === businessTaxValue;
    const isEqualTaxableSaleValue = calcTaxableSaleValue === taxableSalesValue;
    if (isEqualTaxableSaleValue && isEqualBusinessTaxValueCase2) {
        return [];
    }
    return ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'businessTaxValue'];
};

const validTax = (json) => {
    const type = EVIDENCE_TYPE[json['evidenceType']]
    switch (type) {
        case 'A2001':
            return validB2C(json);
        default:
            return validB2B(json);
    }
};

//todo fixme taxType
const validTaxMoney = (json) => {
    console.log('validTaxMoney', json);
    const validResult =
        validTaxType[json.taxType](json).concat(validTax(json));
    const withoutTotalAmount = parseInt(json.taxableSalesValue) + parseInt(json.zeroTaxSalesValue) + parseInt(json.dutyFreeSalesValue);

    const totalAmount = withoutTotalAmount + parseInt(json.businessTaxValue);
    if (totalAmount !== parseInt(json.totalAmount) || totalAmount === 0) {
        validResult.push('totalAmount', 'zeroTaxSalesValue', 'businessTaxValue', 'dutyFreeSalesValue', 'taxableSalesValue');
    }
    const payAmount = totalAmount + parseInt(json.otherFee);
    if (payAmount !== parseInt(json.totalPayAmount) || payAmount === 0) {
        validResult.push('totalAmount', 'otherFee', 'totalPayAmount');
    }
    console.log('validTaxMoney', validResult);
    return [...new Set(validResult)];
};

export {validData, validTaxId};
