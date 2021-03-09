import React, { useState, useEffect } from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';

export default function CpuUsage(props) {
    const state = {
        labels: ['MEMORY USED', 'MEMORY FREE'],
        datasets: [
          {
            label: 'USAGE',
            backgroundColor: [
              '#B21F00',
              '#C9DE00'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000'
            ],
            data: [32, 68]
          }
        ]
    }
    useEffect(() => {
        fetch('http://104.200.26.218:8080/api/v1/query?query=kube_pod_container_info{container=%22archie%22}')
        .then(data => data.json())
        .then(data => console.log(data))
    })
    return(
      <div>
        <Pie
          data= {state}
          options={{
            title:{
              display:true,
              text:'CPU Usage',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'CPU Usage',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    )
}