import {useAppDispatch, useAppState} from "../Context";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppState();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log('currentUser', currentUser);
  console.log('auth.user.token', auth.user.token)
  if (!auth.user.token) {
    // user is not authenticated
    return <Navigate to="/login"/>;
  }
  return children;
};

export default ProtectedRoute;