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

const validSigoutourData = (json) => {
  let validResult = validTaxMoney(json)
  if (json['sellerTaxId'].length !== 8 || !validTaxId(json['sellerTaxId'])) {
    validResult.push('sellerTaxId')
  }
  if (json['buyerTaxId'].length !== 8 || !validTaxId(json['buyerTaxId'])) {
    validResult.push('buyerTaxId')
  }
  validResult.push(validEvidenceType[json['evidenceType']](json))
  if (!moment(json['evidenceDate'], 'YYYYMMDD', true).isValid()) {
    validResult.push('evidenceDate')
  }
  json['cellHighlight'] = [...new Set(validResult)]
  json['cellHighlight'] = json['cellHighlight'].filter(value => {
    return value !== ''
  })
  return json
}

const validEvidenceType = {
  '三聯式統一發票': (json) => {
    return json['evidenceNumber'].length === 10 ? '' : 'evidenceNumber'
  },
  '二聯式收銀發票': (json) => {
    return json['evidenceNumber'].length === 10 ? '' : 'evidenceNumber'
  },
  '三聯式收銀機發票': (json) => {
    return json['evidenceNumber'].length === 10 ? '' : 'evidenceNumber'
  },
  '電子發票證明聯-格式一': (json) => {
    return json['evidenceNumber'].length === 10 ? '' : 'evidenceNumber'
  },
  '電子發票證明聯-格式二': (json) => {
    return json['evidenceNumber'].length === 10 ? '' : 'evidenceNumber'
  },
  '電力帳單': (json) => {
    return json['carrierNumber'].length === 10 ? '' : 'carrierNumber'
  },
  '水費帳單-台灣自來水': (json) => {
    return json['carrierNumber'].length === 10 ? '' : 'carrierNumber'
  },
  '水費帳單-台北自來水': (json) => {
    return json['carrierNumber'].length === 10 ? '' : 'carrierNumber'
  },
  '電信費帳單-中華電信': (json) => {
    return json['carrierNumber'].length === 10 ? '' : 'carrierNumber'
  },
  '電信費帳單-台灣大哥大': (json) => {
    return json['carrierNumber'].length === 10 ? '' : 'carrierNumber'
  },
  '電信費帳單-遠傳': (json) => {
    return json['carrierNumber'].length === 10 ? '' : 'carrierNumber'
  },
  '電信費帳單-亞太': (json) => {
    return json['carrierNumber'].length === 10 ? '' : 'carrierNumber'
  },
  '海關代徵營業稅繳納證': (json) => {
    //todo
  },
  undefined: (json) => {
    return ['evidenceType']
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
    return ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'taxType']
  },
  undefined: (json) => {
    return ['zeroTaxSalesValue', 'dutyFreeSalesValue', 'taxableSalesValue', 'taxType']
  }
}

const validTaxMoney = (json) => {
  let validResult = validTaxType[json['taxType']](json)
  const withoutTotalAmount = json['taxableSalesValue'] + json['zeroTaxSalesValue'] + json['dutyFreeSalesValue']
  const totalAmount = withoutTotalAmount + json['businessTaxValue']
  if (totalAmount !== json['totalAmount']) {
    validResult.push('totalAmount', 'zeroTaxSalesValue', 'businessTaxValue', 'dutyFreeSalesValue', 'taxableSalesValue')
  }
  const payAmount = totalAmount + json['otherFee']
  if (payAmount !== json['totalPayAmount']) {
    validResult.push('totalAmount', 'otherFee')
  }
  return [...new Set(validResult)]
}

export { validSigoutourData }