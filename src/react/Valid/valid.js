import moment from 'moment'
import { getPeriod } from '../Util/Time'

const validTaxId = (taxId) => {
  var invalidList = '00000000,11111111'
  if (/^\d{8}$/.test(taxId) === false || invalidList.indexOf(taxId) !== -1) {
    return false
  }
  var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
    sum = 0,
    calculate = function(product) { // 個位數 + 十位數
      var ones = product % 10,
        tens = (product - ones) / 10
      return ones + tens
    }
  for (let i = 0; i < validateOperator.length; i++) {
    sum += calculate(taxId[i] * validateOperator[i])
  }
  return sum % 10 === 0 || (taxId[6] === '7' && (sum + 1) % 10 === 0)
}

const validSigoutourData = (clientTaxId, json, assignMap) => {
  let validResult = validTaxMoney(json)
  const isCustom = json['evidenceType'] === '海關代徵營業稅繳納證'
  if (!isCustom && (json['sellerTaxId'].length !== 8 || !validTaxId(json['sellerTaxId']))) {
    validResult.push('sellerTaxId')
  }
  if (json['buyerTaxId'].length !== 8 || !validTaxId(json['buyerTaxId']) || json['buyerTaxId'] !== clientTaxId) {
    validResult.push('buyerTaxId')
  }
  validResult = validResult
    .concat(validEvidenceType[json['evidenceType']](json, assignMap))
    .concat(validEvidenceDate(json))

  json['cellHighlight'] = [...new Set(validResult)]
  json['cellHighlight'] = json['cellHighlight']
    .filter(value => {
      return value !== ''
    })
  json['cellHighlight'] = json['cellHighlight'].length > 0 ? json['cellHighlight'].concat('sn') : json['cellHighlight']
  console.log(json['cellHighlight'])
  return json
}

const validEvidenceDate = (json) => {
  if (!moment(json['evidenceDate'], 'YYYYMMDD', true).isValid()) {
    return 'evidenceDate'
  }
  const evidencePeriod = getPeriod(json['evidenceDate'])
  const reportingPeriod = parseInt(json['reportingPeriod'])
  const tenYearAgoPeriod = reportingPeriod - 1000
  const isBetweenTenYearAgoPeriodAndReportingPeriod = (reportingPeriod >= evidencePeriod) && (tenYearAgoPeriod <= evidencePeriod)
  if (!isBetweenTenYearAgoPeriodAndReportingPeriod) {
    return 'evidenceDate'
  }
  return ''
}

const validGUI = (typeValue, json, assignMap) => {
  const yyyymm = getPeriod(json['evidenceDate'])
  const trackId = json['evidenceNumber'].substring(0, 2)
  const isTrackIdIncludeAssign = assignMap[typeValue][yyyymm] === undefined ? false : assignMap[typeValue][yyyymm].includes(trackId)
  return json['evidenceNumber'].length === 10 && isTrackIdIncludeAssign ? [''] : ['evidenceNumber']
}

const validBill = (json) => {
  return json['evidenceNumber'].length === 10 && json['evidenceNumber'].startsWith('BB') ? [''] : ['evidenceNumber']
}

const validEvidenceType = {
  '三聯式統一發票': (json, assignMap) => {
    return validGUI(21, json, assignMap)
  },
  '二聯式收銀發票': (json, assignMap) => {
    return validGUI(22, json, assignMap)
  },
  '三聯式收銀機發票': (json, assignMap) => {
    return validGUI(25, json, assignMap)
  },
  '電子發票證明聯-格式一': (json, assignMap) => {
    return validGUI(25, json, assignMap)
  },
  '電子發票證明聯-格式二': (json, assignMap) => {
    return validGUI(25, json, assignMap)
  },
  '電力帳單': (json, assignMap) => {
    return validBill(json)
  },
  '水費帳單-台灣自來水': (json, assignMap) => {
    return validBill(json)
  },
  '水費帳單-台北自來水': (json, assignMap) => {
    return validBill(json)
  },
  '電信費帳單-中華電信': (json, assignMap) => {
    return validBill(json)
  },
  '電信費帳單-台灣大哥大': (json, assignMap) => {
    return validBill(json)
  },
  '電信費帳單-台灣之星': (json, assignMap) => {
    return validBill(json)
  },
  '電信費帳單-遠傳': (json, assignMap) => {
    return validBill(json)
  },
  '電信費帳單-亞太': (json, assignMap) => {
    return validBill(json)
  },
  '海關代徵營業稅繳納證': (json, assignMap) => {
    const evidenceNumber = json['evidenceNumber']
    const isLenEqual14 = evidenceNumber.length === 14
    const firstAlpha = evidenceNumber.substring(0, 1)
    const isBlank = firstAlpha !== ' '
    const thirdAlpha = evidenceNumber.substring(2, 3)
    const isEqual1 = thirdAlpha !== '1'
    const isEvidenceNumberOk = isLenEqual14 && isBlank && isEqual1 ? '' : 'evidenceNumber'
    const declarationId = json['declarationId']
    const isDeclarationIdOk = 14 === declarationId.length ? '' : 'declarationId'
    return [isEvidenceNumberOk, isDeclarationIdOk]
  },
  '': (json, assignMap) => {
    return ['evidenceType', 'evidenceNumber']
  },
  undefined: (json, assignMap) => {
    return ['evidenceType', 'evidenceNumber']
  }
}

const validTaxType = {
  '1': (json) => {
    const isZeroTaxSalesValueEq0 = json['zeroTaxSalesValue'] === 0 ? '' : 'zeroTaxSalesValue'
    const isDutyFreeSalesValueEq0 = json['dutyFreeSalesValue'] === 0 ? '' : 'dutyFreeSalesValue'
    const isTaxableSalesValueGte0 = json['taxableSalesValue'] >= 0 ? '' : 'taxableSalesValue'
    return [isZeroTaxSalesValueEq0, isDutyFreeSalesValueEq0, isTaxableSalesValueGte0]
  },
  '3': (json) => {
    const isZeroTaxSalesValueEq0 = json['zeroTaxSalesValue'] === 0 ? '' : 'zeroTaxSalesValue'
    const isDutyFreeSalesValueGte0 = json['dutyFreeSalesValue'] >= 0 ? '' : 'dutyFreeSalesValue'
    const isTaxableSalesValueEq0 = json['taxableSalesValue'] === 0 ? '' : 'taxableSalesValue'
    const isBusinessTaxValueEq0 = json['businessTaxValue'] === 0 ? '' : 'businessTaxValue'
    return [isZeroTaxSalesValueEq0, isDutyFreeSalesValueGte0, isTaxableSalesValueEq0, isBusinessTaxValueEq0]
  },
  '2': (json) => {
    const isZeroTaxSalesValueGte0 = json['zeroTaxSalesValue'] === 0 ? '' : 'zeroTaxSalesValue'
    const isDutyFreeSalesValueEq0 = json['dutyFreeSalesValue'] >= 0 ? '' : 'dutyFreeSalesValue'
    const isTaxableSalesValueEq0 = json['taxableSalesValue'] === 0 ? '' : 'taxableSalesValue'
    const isBusinessTaxValueEq0 = json['businessTaxValue'] === 0 ? '' : 'businessTaxValue'
    return [isZeroTaxSalesValueGte0, isDutyFreeSalesValueEq0, isTaxableSalesValueEq0, isBusinessTaxValueEq0]
  },
  '': (json) => {
    return ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'taxType', 'businessTaxValue']
  },
  undefined: (json) => {
    return ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'taxType', 'businessTaxValue']
  }
}

const validB2B = (json) => {
  const taxableSalesValue = json['taxableSalesValue']
  const businessTaxValue = json['businessTaxValue']
  const withoutTaxAmount = json['taxableSalesValue'] + json['zeroTaxSalesValue'] + json['dutyFreeSalesValue']
  const businessCalcTaxValueResult = Math.round(taxableSalesValue * 0.05)
  const calcResultValue = businessCalcTaxValueResult + withoutTaxAmount - json['totalAmount']
  if (calcResultValue <= 1 && calcResultValue >= 0) {
    return []
  }
  if (businessCalcTaxValueResult === businessTaxValue) {
    return []
  }
  return ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'businessTaxValue']
}

const validB2C = (json) => {
  const taxableSalesValue = json['taxableSalesValue']
  const businessTaxValue = json['businessTaxValue']
  const withoutTaxAmount = json['taxableSalesValue'] + json['zeroTaxSalesValue'] + json['dutyFreeSalesValue']
  const calcBusinessTaxValueResult = Math.round(Math.round(json['totalAmount'] / 1.05) * 0.05)
  const isEqualBusinessTaxValue = calcBusinessTaxValueResult === businessTaxValue
  const calcTotalAmount = calcBusinessTaxValueResult + withoutTaxAmount
  const isEqualTotalAmount = calcTotalAmount === json['totalAmount']
  if (isEqualBusinessTaxValue && isEqualTotalAmount) {
    return []
  }
  const calcTaxableSaleValue = Math.round(json['totalAmount'] / 1.05)
  const calcBusinessTaxValue = json['totalAmount'] - calcTaxableSaleValue
  const isEqualBusinessTaxValueCase2 = calcBusinessTaxValue === businessTaxValue
  const isEqualTaxableSaleValue = calcTaxableSaleValue === taxableSalesValue
  if (isEqualTaxableSaleValue && isEqualBusinessTaxValueCase2) {
    return []
  }
  return ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'businessTaxValue']
}

const validTax = (json) => {
  if (json['taxType'] !== 1) {
    return []
  }
  switch (json['evidenceType']) {
    case '二聯式收銀發票':
      return validB2C(json)
    default:
      return validB2B(json)
  }
}

const validTaxMoney = (json) => {
  let validResult = validTaxType[json['taxType']](json).concat(validTax(json))
  const withoutTotalAmount = json['taxableSalesValue'] + json['zeroTaxSalesValue'] + json['dutyFreeSalesValue']
  const totalAmount = withoutTotalAmount + json['businessTaxValue']
  if (totalAmount !== json['totalAmount'] || totalAmount === 0) {
    validResult.push('totalAmount', 'zeroTaxSalesValue', 'businessTaxValue', 'dutyFreeSalesValue', 'taxableSalesValue')
  }
  const payAmount = totalAmount + json['otherFee']
  if (payAmount !== json['totalPayAmount'] || payAmount === 0) {
    validResult.push('totalAmount', 'otherFee', 'totalPayAmount')
  }
  return [...new Set(validResult)]
}


export { validSigoutourData }