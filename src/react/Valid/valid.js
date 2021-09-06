import moment from 'moment'

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
  if (json['sellerTaxId'].length !== 8 || !validTaxId(json['sellerTaxId'])) {
    validResult.push('sellerTaxId')
  }
  if (json['buyerTaxId'].length !== 8 || !validTaxId(json['buyerTaxId']) || json['buyerTaxId'] !== clientTaxId) {
    validResult.push('buyerTaxId')
  }
  validResult = validResult.concat(validEvidenceType[json['evidenceType']](json, assignMap))
  if (!moment(json['evidenceDate'], 'YYYYMMDD', true).isValid()) {
    validResult.push('evidenceDate')
  }
  json['cellHighlight'] = [...new Set(validResult)]
  json['cellHighlight'] = json['cellHighlight'].filter(value => {
    return value !== ''
  })
  return json
}

const getPeriod = (json) => {
  let period = parseInt(json['evidenceDate'].substring(0, 6)) - 191100
  if (period % 2 === 1) {
    period += 1
  }
  return period
}

const validEvidenceType = {
  '三聯式統一發票': (json, assignMap) => {
    const yyyymm = getPeriod(json)
    const trackId = json['evidenceNumber'].substring(0, 2)
    const isTrackIdIncludeAssign = assignMap['22'][yyyymm] === undefined ? false : assignMap['22'][yyyymm].includes(trackId)
    return json['evidenceNumber'].length === 10 && isTrackIdIncludeAssign ? [''] : ['evidenceNumber']
  },
  '二聯式收銀發票': (json, assignMap) => {
    const yyyymm = getPeriod(json)
    const trackId = json['evidenceNumber'].substring(0, 2)
    const isTrackIdIncludeAssign = assignMap['22'][yyyymm] === undefined ? false : assignMap['22'][yyyymm].includes(trackId)
    return json['evidenceNumber'].length === 10 && isTrackIdIncludeAssign ? [''] : ['evidenceNumber']
  },
  '三聯式收銀機發票': (json, assignMap) => {
    const yyyymm = getPeriod(json)
    const trackId = json['evidenceNumber'].substring(0, 2)
    const isTrackIdIncludeAssign = assignMap['22'][yyyymm] === undefined ? false : assignMap['22'][yyyymm].includes(trackId)
    return json['evidenceNumber'].length === 10 && isTrackIdIncludeAssign ? [''] : ['evidenceNumber']
  },
  '電子發票證明聯-格式一': (json, assignMap) => {
    const yyyymm = getPeriod(json)
    const trackId = json['evidenceNumber'].substring(0, 2)
    const isTrackIdIncludeAssign = assignMap['22'][yyyymm] === undefined ? false : assignMap['22'][yyyymm].includes(trackId)
    return json['evidenceNumber'].length === 10 && isTrackIdIncludeAssign ? [''] : ['evidenceNumber']
  },
  '電子發票證明聯-格式二': (json, assignMap) => {
    const yyyymm = getPeriod(json)
    const trackId = json['evidenceNumber'].substring(0, 2)
    const isTrackIdIncludeAssign = assignMap['22'][yyyymm] === undefined ? false : assignMap['22'][yyyymm].includes(trackId)
    return json['evidenceNumber'].length === 10 && isTrackIdIncludeAssign ? [''] : ['evidenceNumber']
  },
  '電力帳單': (json, assignMap) => {
    return json['evidenceNumber'].length === 10 && json['evidenceNumber'].startsWith('BB') ? [''] : ['evidenceNumber']
  },
  '水費帳單-台灣自來水': (json, assignMap) => {
    return json['evidenceNumber'].length === 10 && json['evidenceNumber'].startsWith('BB') ? [''] : ['evidenceNumber']
  },
  '水費帳單-台北自來水': (json, assignMap) => {
    return json['evidenceNumber'].length === 10 && json['evidenceNumber'].startsWith('BB') ? [''] : ['evidenceNumber']
  },
  '電信費帳單-中華電信': (json, assignMap) => {
    return json['evidenceNumber'].length === 10 && json['evidenceNumber'].startsWith('BB') ? [''] : ['evidenceNumber']
  },
  '電信費帳單-台灣大哥大': (json, assignMap) => {
    return json['evidenceNumber'].length === 10 && json['evidenceNumber'].startsWith('BB') ? [''] : ['evidenceNumber']
  },
  '電信費帳單-遠傳': (json, assignMap) => {
    return json['evidenceNumber'].length === 10 && json['evidenceNumber'].startsWith('BB') ? [''] : ['evidenceNumber']
  },
  '電信費帳單-亞太': (json, assignMap) => {
    return json['evidenceNumber'].length === 10 && json['evidenceNumber'].startsWith('BB') ? [''] : ['evidenceNumber']
  },
  '海關代徵營業稅繳納證': (json, assignMap) => {
    //todo
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
    return [isZeroTaxSalesValueEq0, isDutyFreeSalesValueGte0, isTaxableSalesValueEq0]
  },
  '2': (json) => {
    const isZeroTaxSalesValueGte0 = json['zeroTaxSalesValue'] === 0 ? '' : 'zeroTaxSalesValue'
    const isDutyFreeSalesValueEq0 = json['dutyFreeSalesValue'] >= 0 ? '' : 'dutyFreeSalesValue'
    const isTaxableSalesValueEq0 = json['taxableSalesValue'] === 0 ? '' : 'taxableSalesValue'
    return [isZeroTaxSalesValueGte0, isDutyFreeSalesValueEq0, isTaxableSalesValueEq0]
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
  if (totalAmount !== json['totalAmount']) {
    validResult.push('totalAmount', 'zeroTaxSalesValue', 'businessTaxValue', 'dutyFreeSalesValue', 'taxableSalesValue')
  }
  const payAmount = totalAmount + json['otherFee']
  if (payAmount !== json['totalPayAmount']) {
    validResult.push('totalAmount', 'otherFee', 'totalPayAmount')
  }
  return [...new Set(validResult)]
}


export { validSigoutourData }