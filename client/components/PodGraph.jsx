import React, {Component} from 'react';
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'
//pods

class PodGraph extends Component{
  constructor(props){
    super(props);
    this.state = {
      root: '',
      children: []
    }

    this.parseData = this.parseData.bind(this);
  }

  /**
   * Receives fetch data from query to Prometheus 
   * @param {*} data 
   * 
   * output: object to be set as the current state
   * 
   * TODO: Get ip and container name from user DB
   *
   */
  parseData(data){
    const dataModel = {root: '', children:[]}    
    const results = data.data.result;
    dataModel.root = results[0].metric.container;    

    for(let i=0; i<results.length; i++){
      dataModel.children.push(results[i].metric.pod)
    }
    return dataModel;
  }

  componentDidMount(){
    fetch('http://104.200.26.218:8080/api/v1/query?query=kube_pod_container_info{container="archie"}')
    .then(data => data.json())
    .then(data => {
      const dataModel = this.parseData(data)
      //set state
      this.setState(dataModel);

      const root = this.state.root;
      const children = this.state.children;

      /*
      Graph documentation: https://github.com/dagrejs/dagre-d3#readme
      */
      const g = new dagreD3.graphlib.Graph({directed: true});

      // Set an object for the graph label
      g.setGraph({});

      /*
        TD: top down
        LR: left to right
      */
      g.graph().rankdir = 'TD';
      g.graph().ranksep = 50;
      g.graph().nodesep = 50;

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
          label: children[i].substr(children[i].length-5),
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

      //Create the renderer
      var render = new dagreD3.render();
      //Run the renderer. This is what draws the final graph.
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
    }
  )}

  render(){
    return(
      <div>
        <h1>Deployment</h1>
        <svg width="400" height="200">
          <g />
        </svg>
      </div>
  )};   
}

export default PodGraph;