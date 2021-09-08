import { toPeriodList, getPeriod } from './Time'


test('ts to Period', () => {
  const utcTime = 1631081797628

  const result = toPeriodList(utcTime)

  expect(result).toMatchObject([
    '10901', '10902', '10903', '10904',
    '10905', '10906', '10907', '10908',
    '10909', '10910', '10911', '10912',
    '11001', '11002', '11003', '11004',
    '11005', '11006', '11007', '11008',
    '11009', '11010', '11011', '11012',
    '11101', '11102', '11103', '11104',
    '11105', '11106', '11107', '11108',
    '11109', '11110', '11111', '11112'
  ])
})

test('success yyyymmdd to period', () => {
  const yyyymmdd = '20210101'

  const result = getPeriod(yyyymmdd)

  expect(result).toEqual(11002)
})