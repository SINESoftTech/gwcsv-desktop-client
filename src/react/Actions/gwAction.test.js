import { useAppDispatch } from '../Context'
import { loginUser,logout } from './gwActions'
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
  expect(dispatchData).toEqual([])
})

test('login successful', async () => {

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

test('login error', async () => {
  //arrange
  const loginPayload = { taxId: '24549210', username: 'string123' }

  axios.post.mockImplementationOnce(() => Promise.resolve({
    data: {
      'result': false
    }
  }))
  const dispatch = useAppDispatch()

  //act
  const result = await loginUser(dispatch, loginPayload)
  const user = localStorage.getItem('currentUser')
  expect(user).toBeNull()
  expect(dispatchData[0]).toHaveProperty('type', 'REQUEST_LOGIN')
  expect(dispatchData[1]).toHaveProperty('type', 'LOGIN_ERROR')
})

test('logout', async () => {
  localStorage.setItem('currentUser', JSON.stringify({
    'taxId': '24549210',
    'username': 'string123',
    'token': '1234'
  }))
  localStorage.setItem('token', '123456')

  const dispatch = useAppDispatch()
  await logout(dispatch)

  const currentUser = localStorage.getItem('currentUser')
  const token = localStorage.getItem('token')
  expect(dispatchData[0]).toHaveProperty('type', 'LOGOUT')
  expect(currentUser).toBeNull()
  expect(token).toBeNull()
})
