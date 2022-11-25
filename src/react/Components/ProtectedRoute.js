import {useAppDispatch, useAppState} from "../Context";
import {Navigate} from "react-router-dom";
import {getTokenExpDate, getTokenInfo, isTokenExpired} from "../Util/authUtils";

const ProtectedRoute = ({children}) => {
  const {auth} = useAppState();
  const tokenInfo = getTokenInfo(auth.user.token);

  if (tokenInfo.isExpired) {
    // user is not authenticated
    return <Navigate to="/login"/>;
  }
  return children;
};

export default ProtectedRoute;