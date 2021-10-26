import { useAppDispatch } from '../Context'
import { loginUser, logout, uploadGUI, uploadToGw } from './gwActions'
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

test('uploadToGw:uploadStrategy:GUI', async () => {

  const payload = [{
    json: {
      gwEvidenceType: 'TRIPLE_GUI'
    },
    image: ''
  }, {
    json: {
      gwEvidenceType: 'DUPLICATE_CASH_REGISTER_GUI'
    },
    image: ''
  }, {
    json: {
      gwEvidenceType: 'TRIPLE_CASH_REGISTER_GUI'
    },
    image: ''
  }, {
    json: {
      gwEvidenceType: 'EGUI'
    },
    image: ''
  }]

  const ajaxCallArr = []
  axios.post.mockImplementationOnce(function(url, bodyFormData, config) {
    ajaxCallArr.push({
      url: url,
      bodyFormData: bodyFormData,
      config: config
    })
  })

  await uploadToGw(payload, '', '')

  ajaxCallArr.forEach(ajaxCall => {
    expect(ajaxCall).toHaveProperty('url', '/evidence/gui')
  })

})

test('uploadToGw:uploadStrategy:BILL', async () => {
  const payload = [{
    json: {
      gwEvidenceType: 'ELECTRIC_BILL'
    },
    image: ''
  }, {
    json: {
      gwEvidenceType: 'WATER_BILL'
    },
    image: ''
  }, {
    json: {
      gwEvidenceType: 'TELECOM_BILL'
    },
    image: ''
  }]

  const ajaxCallArr = []
  axios.post.mockImplementationOnce(function(url, bodyFormData, config) {
    ajaxCallArr.push({
      url: url,
      bodyFormData: bodyFormData,
      config: config
    })
  })

  await uploadToGw(payload, '', '')

  ajaxCallArr.forEach(ajaxCall => {
    expect(ajaxCall).toHaveProperty('url', '/evidence/bill')
  })
})

test('uploadToGw:uploadStrategy:CUSTOMS', async () => {
  const payload = [{
    json: {
      gwEvidenceType: 'CUSTOMS_TAXABLE_EVIDENCE'
    },
    image: ''
  }]

  const ajaxCallArr = []
  axios.post.mockImplementationOnce(function(url, bodyFormData, config) {
    ajaxCallArr.push({
      url: url,
      bodyFormData: bodyFormData,
      config: config
    })
  })

  await uploadToGw(payload, '', '')

  ajaxCallArr.forEach(ajaxCall => {
    expect(ajaxCall).toHaveProperty('url', '/evidence/customs')
  })
})

