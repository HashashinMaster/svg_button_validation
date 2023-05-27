import * as d3 from "d3";

/**
 * Adding Svg element to the div#app
 */
const width = 600;
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

/**
 * Creating a box with path and initializing
 * brezier curves
 */
path
  .attr("d", "M 50 40, h 240 ,v 80, h-240, v-80 c 0 0, 0 0, 0 0  ")
  .attr("fill", "red")
  .attr("stroke-width", "2px");

path.on("mousemove", function (e: MouseEvent) {
  const { clientX, clientY } = e;
  path
    .transition()
    .attr(
      "d",
      `M 50 40, h 240 ,v 80, h-240, v-80 ,M ${clientX} ${clientY} c 0 30, 90 30, 90 0, M 50 120, c 0 30, 90 30, 90 0 `
    )
    .delay(500);
});
