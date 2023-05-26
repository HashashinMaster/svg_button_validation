import * as d3 from "d3";

/**
 * Adding Svg element to the div#app
 */
const width = 300;
const height = 300;
const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

/**
 * adding path element to the svg
 */
const path = svg.append("path");

//h 80 v 40 h -80
path
  .attr("d", "M 0 0  c 0 0, 0 0, 0 0")
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-width", "2px")
  .transition()
  .attr("d", "M 10, 20 c 50, -50 100, 50 150, 25”")
  .delay(500);
