import React from 'react';
import {useAuthDispatch, logout, useAuthState} from '../../Context';
import EvidenceList from "../../Components/EvidenceListTable";

const Main = (props) => {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const handleLogout = () => {
    logout(dispatch);
    props.history.push('/login');
  };
  return (
    <div style={{padding: 10}}>
      <div>
        <h1>Main</h1>

      </div>
      <p>Welcome {userDetails.user.username}</p>
      <button onClick={handleLogout}>
        Logout
      </button>
      <EvidenceList></EvidenceList>

    </div>
  );
};

export default Main;