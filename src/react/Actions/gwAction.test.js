import { useAppDispatch } from '../Context'
import { loginUser } from './gwActions'
import { gwAxios as axios } from './axios'

jest.mock('./axios')

let dispatchData = []

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')

  return {
    ...ActualReact,
    useContext: () => (function(obj) {
      dispatchData.push(obj)
    }) // what you want to return when useContext get fired goes here
  }
})

afterEach(() => {
  localStorage.removeItem('currentUser')
  const currentUser = localStorage.getItem('currentUser')
  expect(currentUser).toBeNull()
  while (dispatchData.length > 0) {
    dispatchData.pop()
  }
  expect(dispatchData).toEqual([]);
})

test('should fetch token', async () => {

  //arrange
  const loginPayload = { taxId: '24549210', username: 'string123' }

  axios.post.mockImplementationOnce(() => Promise.resolve({
    data: {
      'result': true,
      'token': '1234'
    }
  }))
  const dispatch = useAppDispatch()

  //act
  const result = await loginUser(dispatch, loginPayload)
  //assert

  const user = localStorage.getItem('currentUser')
  expect(user).toEqual(JSON.stringify({ 'taxId': '24549210', 'username': 'string123', 'token': '1234' }))
  expect(dispatchData).toEqual([
    { type: 'REQUEST_LOGIN' },
    {
      type: 'LOGIN_SUCCESS',
      payload: { taxId: '24549210', username: 'string123', token: '1234' }
    }
  ])
})

test('should dispatch error', () => {

})
