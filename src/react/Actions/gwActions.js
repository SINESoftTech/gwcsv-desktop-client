const ROOT_URL = 'http://test.gwis.com.tw:8596'

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    let data = await response.json();
    let user = {taxId: loginPayload.taxId, username: loginPayload.username}
    if (data.token) {
      user.token = data.token
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.errorMsg});
    console.log(data.errorMsg);
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

export async function uploadToGw(dispatch, payload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    dispatch({ type: 'LOGIN_SUCCESS', payload: '' });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
    console.log(error);
  }
}