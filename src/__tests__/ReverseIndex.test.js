import ramda from 'ramda'
import ReverseIndex from '../react/Util/ReverseIndex'

test('success reverseIndex', () => {
  const json = {
    key: 'value'
  }
  const result = ReverseIndex.reverseIndex(json)
  expect(result).toMatchObject({
    value: 'key'
  })
})

test('reverseIndex using ramda', () => {
  const json = {
    key: 'value'
  }
  const result = ramda.invertObj(json)
  expect(result).toMatchObject({
    value: 'key'
  })
})
test('extract key result value', () => {
  const json = {
    invoiceDate: {
      result: 'value1'
    }
  }
  const output = {}
  const extractResult = (value, key) => value.result
  const myResult = ramda.mapObjIndexed(extractResult, json)
  console.log('myResult', myResult)
})
