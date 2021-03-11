import React, { useState, useEffect } from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import Container from '@material-ui/core/Container';


export default function CpuUsage(props) {
    const [cpuUsed, setCpuUsed] = useState(0)

    const state = {
        labels: ['% of CPU used', '% of CPU free'],
        datasets: [
          {
            label: 'USAGE',
            backgroundColor: [
              '#B21F00',
              'green'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000'
            ],
            data: [cpuUsed, 100-cpuUsed]
          }
        ]
    }

    useEffect(() => {
        fetch('http://104.200.26.218:8080/api/v1/query?query=cluster:node_cpu:sum_rate5m')
        .then(data => data.json())
        // .then(data => setCpuUsed(data["data"]["result"][0]["value"][1]))
        // .then(data => data["data"]["result"])
        .then(data => console.log(data))
    })

    return(
      
      <Container maxWidth='md'>
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
      </Container>
    )
}