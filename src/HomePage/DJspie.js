import React, { useEffect } from 'react';
import {arc, pie} from 'd3-shape';
import * as d3 from 'd3';
import axios from 'axios';

function DJspie() {
    var data = {};
    var backgroundColor=[ '#FFCD56','#FF6384','#36A2EB','#FD6B19','#FD3A19','#FDCD56','#FFCD19'];
    function budget(){
    axios.get('http://localhost:3000/budget.json')
    .then(function(res){
        for(var i=0; i<res.data.myBudget.length; i++){
            data[res.data.myBudget[i].title]=res.data.myBudget[i].budget;
        }
      createChart(data);
    });
    }
  
    function createChart(data){
  
      const width = 400;
      const height = 150;
      const radius = Math.min(width, height) / 2 - 10;
      const color = d3.scale.ordinal().domain([]).range(backgroundColor);
      const Pie = pie().sort(null).value((d) => d.value);
      const dataD3JS = Pie(d3.entries(data));
      const Arc = arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8)
      const outerArc = arc().innerRadius(radius * 0.9).outerRadius(radius * 0.8)
      const svg = d3.select("#d3jschart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
      svg
        .selectAll('slices')
        .data(dataD3JS)
        .enter()
        .append('path')
        .attr('d', Arc)
        .attr('fill',(d) => (color(d.data.key)))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
  
      svg
        .selectAll('polylines')
        .data(dataD3JS)
        .enter()
        .append('polyline')
        .attr('points', (d)=> {
        var posA = Arc.centroid(d)
        var posB = outerArc.centroid(d)
        var posC = posB;
        var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posC[0] = radius * 0.97 * (midAngle < Math.PI ? 1 : -1);
        return [posA, posB, posC]
        });
  
      svg
        .selectAll('labels')
        .data(dataD3JS)
        .enter()
        .append('text')
        .text( (d) => { return (d.data.key) } )
        .attr('transform', (d) => {
            var pos = outerArc.centroid(d);
            var mid = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 1.1 * (mid < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', (d) => {
            var mid = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (mid < Math.PI ? 'start' : 'end')
        })
    }
     useEffect(budget, []);
  return (
    <p id="d3jschart"></p>
  );
}

export default DJspie;
