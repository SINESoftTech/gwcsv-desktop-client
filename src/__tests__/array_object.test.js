import ramda from 'ramda'

describe('test ramda on json object', () => {
  it('should reverse key and value', function () {})
  const GW_EVIDENCE_TYPE = {
    A1001: {
      id: '21',
      name: '三聯式統一發票',
      value: 'TRIPLE_GUI'
    },
    A2001: {
      id: '22',
      name: '二聯式收銀發票',
      value: 'DUPLICATE_CASH_REGISTER_GUI'
    },
    A5001: {
      id: '25',
      name: '三聯式收銀機發票',
      value: 'TRIPLE_CASH_REGISTER_GUI'
    },
    A5002: {
      id: '25',
      name: '電子發票證明聯-格式一',
      value: 'EGUI'
    },
    A5003: {
      id: '25',
      name: '電子發票證明聯-格式二',
      value: 'EGUI'
    },
    A5010: {
      id: '25',
      name: '電力帳單',
      value: 'ELECTRIC_BILL'
    },
    A5020: {
      id: '25',
      name: '水費帳單-台灣自來水',
      value: 'WATER_BILL'
    },
    A5021: {
      id: '25',
      name: '水費帳單-台北自來水',
      value: 'WATER_BILL'
    },
    A5030: {
      id: '25',
      name: '電信費帳單-中華電信',
      value: 'TELECOM_BILL'
    },
    A5031: {
      id: '25',
      name: '電信費帳單-台灣大哥大',
      value: 'TELECOM_BILL'
    },
    A5032: {
      id: '25',
      name: '電信費帳單-遠傳',
      value: 'TELECOM_BILL'
    },
    A5033: {
      id: '25',
      name: '電信費帳單-台灣之星',
      value: 'TELECOM_BILL'
    },
    A5034: {
      id: '25',
      name: '電信費帳單-亞太',
      value: 'TELECOM_BILL'
    },
    A8001: {
      id: '28',
      name: '海關代徵營業稅繳納證',
      value: 'CUSTOMS_TAXABLE_EVIDENCE'
    },
    A3001: {
      id: '',
      name: '勞保',
      value: ''
    },
    A3002: {
      id: '',
      name: '勞退',
      value: ''
    },
    A4001: {
      id: '',
      name: '健保',
      value: ''
    },
    other: {
      id: '',
      name: '其他',
      value: ''
    },
    '': {
      id: '',
      name: '',
      value: ''
    }
  }
  const extractValue = (value, key, obj) => value.name
  const result = ramda.mapObjIndexed(
    extractValue,
    ramda.dissoc('', GW_EVIDENCE_TYPE)
  )
  console.log('result', JSON.stringify(result))
  const reverseResult = ramda.invertObj(result)
  console.log('reverseResult', JSON.stringify(reverseResult))
})
