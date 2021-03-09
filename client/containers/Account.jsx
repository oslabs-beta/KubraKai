import React, { useState } from 'react';
import CpuUsage from '../components/cpuUsage.jsx'
import MetricsContainer from '../components/metricsContainer.jsx'

import PodDetail from './PodDetail';

export default function Account(props) {
    return(
      <div>
      <h2>Welcome, you have made it to your account</h2>

      <PodDetail />
      <CpuUsage />
            <MetricsContainer />

      </div>
       
    )
}