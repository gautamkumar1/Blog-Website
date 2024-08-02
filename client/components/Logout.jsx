import { AuthContext } from "../src/store/auth-context";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

function Logout(){
  const {logoutUser}=useContext(AuthContext)
  // const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/login" />;
}

export default Logout;