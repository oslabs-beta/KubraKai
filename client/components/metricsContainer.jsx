import React, { useState } from 'react';
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
//     const custom = {
//       id: `id-${k}`,
//       content: `Quote ${k}`
//     };
//     return custom;
// });
//   const grid = 8;

//   const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
  
//     return result;
//   };
  
//   const MetricItem = styled.div`
//     width: 400px;
//     height: 200px;
//     border: 1px solid grey;
//     margin-bottom: ${grid}px;
//     background-color: lightblue;
//     padding: ${grid}px;
//   `;
  
//   function Metric({ metric, index }) {
//     return (
//       <Draggable draggableId={metric.id} index={index}>
//         {provided => (
//           <MetricItem
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//           >
//             {metrics.content}
//           </MetricItem>
//         )}
//       </Draggable>
//     );
//   }
  
//   const MetricList = React.memo(function MetricList({ metrics }) {
//     return metrics.map((metric, index) => (
//       <Metric metric={metric} index={index} key={metric.id} />
//     ));
//   });
// //   const MetricList = []
// //   for(let i = 0; i < metricsArray.length; i++){

// //   }
  
//   export default function MetricsContainer() {
//     const [state, setState] = useState({ metrics: initial });
  
//     function onDragEnd(result) {
//       if (!result.destination) {
//         return;
//       }
  
//       if (result.destination.index === result.source.index) {
//         return;
//       }
  
//       const metrics = reorder(
//         state.metrics,
//         result.source.index,
//         result.destination.index
//       );
  
//       setState({ metrics });
//     }
  
//     return (
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="list">
//           {provided => (
//             <div ref={provided.innerRef} {...provided.droppableProps}>
//               <MetricList metrics={state.metrics} />
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     );
//   }

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
    const metric = {
      id: `id-${k}`,
      content: `Metric ${k}`
    };
  
    return metric;
  });
  
  const grid = 8;
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  const QuoteItem = styled.div`
    width: 200px;
    border: 1px solid grey;
    margin-bottom: ${grid}px;
    background-color: lightblue;
    padding: ${grid}px;
  `;
  
  function Quote({ quote, index }) {
    return (
      <Draggable draggableId={quote.id} index={index}>
        {provided => (
          <QuoteItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {quote.content}
          </QuoteItem>
        )}
      </Draggable>
    );
  }
  
  const QuoteList = React.memo(function QuoteList({ quotes }) {
    return quotes.map((quote, index) => (
      <Quote quote={quote} index={index} key={quote.id} />
    ));
  });
  
  export default function MetricsContainer() {
    const [state, setState] = useState({ quotes: initial });
  
    function onDragEnd(result) {
      if (!result.destination) {
        return;
      }
  
      if (result.destination.index === result.source.index) {
        return;
      }
  
      const quotes = reorder(
        state.quotes,
        result.source.index,
        result.destination.index
      );
  
      setState({ quotes });
    }
  
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <QuoteList quotes={state.quotes} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }