import React, { useState, useEffect } from 'react';
import MetricsContainer from '../components/metricsContainer.jsx'
import DropDown from '../components/ipDropDown'
import Input from '../components/ipInput'
import { context } from '../context.js';
import { checkFetcher } from '@apollo/client';


export default function Account(props) {  
  const [ipArray, setipArray] = useState([]);
  const getIps = () => { 
    fetch('/profile/ip')
      .then(res => res.json())
      .then(res => {
        setipArray(res.locals.ip);
        return ipArray})
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getIps();
  })
  
  const [ip, setIP] = useState(ipArray[0]);
  const state = {
    ip,
    setIP,
    ipArray,
    setipArray,
  }


  return(
    <div>    
      <context.Provider value = {state}>
      <DropDown />
      <Input/>
      <MetricsContainer className="metricsContainer"/>   
      </context.Provider>  
    </div>
      
  )
}