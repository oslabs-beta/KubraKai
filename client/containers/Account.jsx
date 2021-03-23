import React, { useState, useEffect } from 'react';
import MetricsContainer from '../components/metricsContainer.jsx'
import DropDown from '../components/ipDropDown'
import Input from '../components/ipInput'
import { context } from '../context.js';

/**
 * Authors: Jordan Kind, Anthony Martinez, Taylor Davis
 * @param {*} props 
 * 
 * 
 * 
 */

export default function Account(props) {  
  const [ipArray, setipArray] = useState([]);
  const [ip, setIP] = useState('96.126.99.36');
  const getIps = () => { 
    if(ipArray.length === 0) {
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
      })

      
  const state = {
    ip,
    setIP,
    ipArray,
    setipArray,
  }

  const mystyle = {
    color: "red", 
    fontFamily: "Arial",
  }


  return(
    <div 
      style={{
        backgroundColor: "black",
      }
      }>
      <header
      style={mystyle}>Welcome to Kubra Kai </header>    
      <context.Provider value = {state}>
      <DropDown />
      <Input/>
      <MetricsContainer className="metricsContainer"/>   
      </context.Provider>  
    </div>
      
  )
}