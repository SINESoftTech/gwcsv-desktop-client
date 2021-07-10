import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../../Context';

const Main = (props) => {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const handleLogout = () => {
    logout(dispatch);
    props.history.push('/login');
  };
  return (
    <div style={{ padding: 10 }}>
      <div>
        <h1>Main</h1>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p>Welcome {userDetails.user.username}</p>
    </div>
  );
};

export default Main;