import React, { useState } from 'react';
import MetricsContainer from '../components/metricsContainer.jsx'
import DropDown from '../components/ipDropDown'
import Input from '../components/ipInput'
import { context } from '../context.js';


export default function Account(props) {  
  const [ip, setIP] = useState('104.200.26.218');
  const [ipArray, setipArray] = useState(["104.200.26.218"])
  const state = {
    ip,
    setIP,
    ipArray,
    setipArray
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