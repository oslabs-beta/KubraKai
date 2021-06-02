import React, {useState,createContext} from 'react';

export const appContext = createContext({});

const StateProvider = ({children}) => {

  const [ipArray, setIpArray] = useState([]);
  const [ip, setIp] = useState(0);

  
  const value = {
    ip,
    setIp,
    ipArray,
    setIpArray,
  };
  
  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
};

export default StateProvider;