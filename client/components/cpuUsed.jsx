import React, { useState, useEffect, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import { context } from '../context.js'
import '../style.css'

/**
 * Authors: Jordan King, Anthony Martinez, Taylor Davis
 * Donut Graph Component used to display our CPU Usage vs Actual CPU Availible
 * UseEffect Hook to trigger API call upon each update of the "ip" property on context. 
 * Mate
 */
export default function CpuUsage(props) {
    const [cpuUsed, setCpuUsed] = useState(0);
    // ip address to be used in fetch request
    const { ip } = useContext(context);
    
    // object to be passed into donut graph
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
    };
    useEffect(() => {
        fetch(`http://${ip}:8080/api/v1/query?query= sum (rate (container_cpu_usage_seconds_total{id="/"}[1m])) / sum (machine_cpu_cores) * 100`)
        .then(data => data.json())
        .then(data => setCpuUsed(data["data"]["result"][0]["value"][1]))
        .catch(err => console.log(err));
    }, [ip]);
    return(
      <Container maxWidth='md'>
        <Doughnut
          classname='Chart'
          data={state}
          options={{
            title:{
              display:true,
              text:'Current CPU Usage',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </Container>
    );
};