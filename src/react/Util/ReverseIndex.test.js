import ramda from 'ramda';
import ReverseIndex from './ReverseIndex';

test('success reverseIndex', () => {
  const json = {
    key: 'value',
  };
  const result = ReverseIndex.reverseIndex(json);
  expect(result).toMatchObject({
    value: 'key',
  });
});

test('reverseIndex using ramda', () => {
  const json = {
    key: 'value',
  };
  const result = ramda.invertObj(json);
  expect(result).toMatchObject({
    value: 'key',
  });
});
