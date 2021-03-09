import React, {useEffect, useState} from 'react';
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'

/*

temp resources notes:

https://github.com/dagrejs/dagre-d3#readme

installed using: npm install dagre-d3


*/

function PodGraph(props){
  
  const [root, setRoot] = useState('');
  const [children, setChildren] =useState('')

  function parseData(data){
    const dataModel = {root: '', children:[]}
    console.log('returned data from prom: ', data.data.result);
    
    const results = data.data.result;
    dataModel.root = results[0].metric.container;
    

    for(let i=0; i<results.length; i++){
      dataModel.children.push(results[i].metric.pod)
    }
    setRoot(dataModel.root)
    setChildren(dataModel.children)

    console.log('dataModel before return: ', dataModel)
    return dataModel;
  }

  useEffect(() => {
    fetch('http://104.200.26.218:8080/api/v1/query?query=kube_pod_container_info{container="archie"}')
    .then(data => data.json())
    .then(data => {
      const dataModel = parseData(data)
      // setRoot(dataModel.root);
      // setChildren(dataModel.children);

      console.log('top root: ', root)
      console.log('children: ', children)
      const g = new dagreD3.graphlib.Graph({directed: true});

          //Set an object for the graph label
      g.setGraph({});

      g.graph().rankdir = 'TD'; //top down ? TD?
      g.graph().ranksep = 50;
      g.graph().nodesep = 5;

      // Default to assigning a new object as a label for each new edge.
      g.setDefaultEdgeLabel(function() {
        return {};
      });
      
      g.setNode(root.toLowerCase(), {
        label: `${root} `,
        width: 70,
        height: 60,
        shape: 'rect',
        style: 'stroke: black; fill:green; stroke-width: 2px; ',
        labelStyle: "font: 300 14px 'Helvetica Neue', Helvetica;fill: white;",
      });

      
      for(let i =0; i< children.length; i++){
        g.setNode(children[i].toLowerCase(), {
          label: children[i],
          width: 50,
          height: 20,
          shape: 'circle',
          style: 'stroke: black; fill:blue; stroke-width: 1px; ',
          labelStyle: "font: 300 14px 'Helvetica Neue', Helvetica;fill: white;",
        });
      }

      for(let i =0; i< children.length; i++){
        g.setEdge(root.toLowerCase(), children[i].toLowerCase(), {
          curve: d3.curveBasis,
          style: 'stroke: blue; fill:none; stroke-width: 1px; stroke-dasharray: 5, 5;',
          arrowheadStyle: 'fill: blue',
        });

      }
      
      let svg = d3.select('svg');
      let inner = svg.select('g');

      // // Create the renderer
      var render = new dagreD3.render();

      // // Run the renderer. This is what draws the final graph.
      render(inner, g);

      inner
        .selectAll('g.node')
        .attr('title', function(v) {
          return "<p class='name'>" + v + "</p><p class='description'> some random description </p>";
        })
        .each(function(v) {
          console.log('node details :', v);
          // $(this).tipsy({ gravity: 'w', opacity: 1, html: true });
        });
      
      
      

    })
  }, [])

 


  
  return(
    <div>
      <h1>Cluster</h1>
      <svg width="200" height="200">
        <g />
      </svg>
        hello
    </div>
  )
}

export default PodGraph;