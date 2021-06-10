import React, {useState,createContext} from 'react';
import Cookies from 'js-cookie'
export const appContext = createContext({});

const cookie = Cookies.get('email')
const StateProvider = ({children}) => {

  const [ipArray, setIpArray] = useState([]);
  const [ip, setIp] = useState(0);
  const [user,setUser] = useState(cookie)

  
  const value = {
    ip,
    setIp,
    ipArray,
    setIpArray,
    user,
    setUser,
  };
  
  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
};

export default StateProvider;