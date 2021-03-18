import React, { useState } from 'react';
import MetricsContainer from '../components/metricsContainer.jsx'
import styled from "@emotion/styled";
import NavBar from '../components/NavBar'
import DropDown from '../components/ipDropDown'
import Input from '../components/ipInput'

export default function Account(props) {  
  return(
    <div>      
      <DropDown />
      <Input/>
      <MetricsContainer />   
    </div>
      
  )
}