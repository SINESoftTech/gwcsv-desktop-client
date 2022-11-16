import {useAppState} from "../Context";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const {auth} = useAppState();
  if (!auth.user.token) {
    // user is not authenticated
    return <Navigate to="/login"/>;
  }
  return children;
};

export default ProtectedRoute;