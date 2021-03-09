import React, { useState } from 'react';
import CpuUsage from './cpuUsage.jsx'
import MetricsContainer from './metricsContainer.jsx'

export default function Account(props) {
    return(
        // <h2>Welcome, you have made it to your account</h2>
        <div>
            <CpuUsage />
            <MetricsContainer />
        </div>
    )
}