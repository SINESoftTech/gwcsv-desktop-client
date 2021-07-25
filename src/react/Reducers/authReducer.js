let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : '';

export const authInitialState = {
  user: '' || user,
  loading: false,
  errorMessage: null,
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      debugger
      console.log('in auth reducer, initialState', initialState)
      console.log('in auth reducer, action', action)
      return {
        ...initialState,
        user: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: '',
      };

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      console.log('mainReducer initial state', initialState)
      return initialState
  }
};


