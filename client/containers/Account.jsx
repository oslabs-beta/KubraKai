import React, { useState } from 'react';
import CpuUsage from '../components/cpuUsage.jsx'
import MetricsContainer from '../components/metricsContainer.jsx'
import Container from '@material-ui/core/Container';
import styled from "@emotion/styled";

import PodDetail from './PodDetail';
import NavBar from '../components/NavBar'


export default function Account(props) {
  const Container = styled.div`
  display: flex;
  flex-wrap: wrap; // <---- added
`;

  return(
    <div>
      
      <NavBar />
      <MetricsContainer />
      <CpuUsage />
      <CpuUsage />
      
    </div>
      
  )
}