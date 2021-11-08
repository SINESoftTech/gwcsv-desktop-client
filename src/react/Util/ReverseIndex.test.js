import ReverseIndex from './ReverseIndex'

test('success reverseIndex', () => {
  const json = {
    'key': 'value'
  }
  const result = ReverseIndex.reverseIndex(json)
  expect(result).toMatchObject({
    'value': 'key'
  })
})

