/* eslint-disable react/prop-types */

import  { createContext, useState, useEffect, } from 'react';
import Cookies from 'js-cookie';
// create the auth context provider
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginStatus,setLoginStatus]=useState(false)
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn,loginStatus]);
  
 
  // lets takle the logout
  const logoutUser = () => {
    setIsLoggedIn(false)
    return Cookies.remove('token')
  };
  return (
    <AuthContext.Provider
      value={{logoutUser, isLoggedIn,loginStatus,setLoginStatus}}
    >
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContext,AuthProvider};
// create a custom hooks function
// export const useAuth = () =>{
//     const authContextValue = useContext(authContext);
//     if(!authContextValue){
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return authContextValue;
// }