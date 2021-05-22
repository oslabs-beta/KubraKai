import React, { useState, useEffect } from 'react';
import MetricsContainer from '../components/metricsContainer.jsx'
import DropDown from '../components/ipDropDown'
import Input from '../components/ipInput'
import { context } from '../context.js';

/**
 * Authors: Jordan Kind, Anthony Martinez, Taylor Davis
 * Dashboard Component that houses all children components. 
 * Initialization of State and passing of Context happens here. 
 */

export default function Dashboard(props) {  
  const [ipArray, setipArray] = useState([]);
  const getIps = () => { 
    if(ipArray.length < 1) {
      fetch('/profile/ip')
      .then(res => res.json())
      .then(res => {
        console.log("Arr?", res)
        let newArr = [];
        for (let i = 0; i < res.length; i++) {
          let ip = res[i].userip;
          newArr.push(ip)
        }
        setipArray(newArr);
        setIP(newArr[0]);
      })
      .catch(err => console.log(err));
    }
    return;
  };
  useEffect(() => {
    getIps();
  }, [ip]);
  const [ip, setIP] = useState(ipArray[0]);
  const state = {
    ip,
    setIP,
    ipArray,
    setipArray,
  };
  const mystyle = {
    color: "red", 
    fontFamily: "Arial",
    display: "flex", 
    justifyContent: "center", 
  };
  return(
    <div 
      style={{ backgroundColor: "black" }}>
      <header
      style={mystyle}>
        <img src="../client/assets/rsz_1rsz_kubra_kai-02.png" >
          </img></header>    
      <context.Provider value = {state}>
      <DropDown />
      <Input />
      <MetricsContainer className="metricsContainer"/>   
      </context.Provider>  
    </div>
  )
}