import React, { useState, useEffect, useContext } from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import { context } from '../context.js'
import '../style.css'

/**
 * Authors: Jordan King, Anthony Martinez
 * 
 * 
 * 
 */
export default function CpuUsage(props) {
    const [cpuUsed, setCpuUsed] = useState(0)
    const { ip } = useContext(context);
    const state = {
        labels: ['% of CPU used', '% of CPU free'],
        datasets: [
          {
            label: 'CPU Used',
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
        fetch(`http://${ip}:8080/api/v1/query?query= sum (rate (container_cpu_usage_seconds_total{id="/"}[1m])) / sum (machine_cpu_cores) * 100`)
        .then(data => data.json())
        .then(data => setCpuUsed(data["data"]["result"][0]["value"][1]))
        // .then(data => data["data"]["result"])
        // .then(data => console.log(data))
    })

    return(
      
      <Container maxWidth='md'>
        <Doughnut
          classname='Chart'
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