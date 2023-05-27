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

/**
 * Defining the Shape Object to store mouse position
 */
interface shapeValues {
  cordinates: number;
  line: string[];
  destination: string;
}
const pathValues: shapeValues = {
  cordinates: 0,
  line: [],
  destination: "",
};

/**
 * adding mouse enter event to know from where
 * the mouse entered the box
 */
path.on("mouseenter", function (e: MouseEvent) {
  const { offsetY } = e;
  // Cheking if the mouse enter from top of the box
  if (offsetY <= 50 + 20) {
    pathValues.cordinates = 40;
    pathValues.destination = "top";
    pathValues.line = ["0 30", "90 30", "90 0"];
  }
  // Cheking if the mouse enter from bottom of the box
  if (offsetY <= 120 + 20 && offsetY > 50 + 20) {
    pathValues.cordinates = 120;
    pathValues.destination = "bottom";
    pathValues.line = ["0 -30", "90 -30", "90 0"];
  }
});

/**
 * Adding mouse move event to change the curve coordinates
 */
path.on("mousemove", function (e: MouseEvent) {
  const { offsetY, offsetX } = e;

  if (offsetY <= 50 + 20) console.log("ja mn lfo9e");
  if (offsetY <= 120 + 20 && offsetY > 50 + 20) console.log("ja mn lt7t");
  path
    .transition()
    .attr(
      "d",
      `M 50 40, h 240 ,v 80, h-240, v-80 ,M ${offsetX} ${
        pathValues.cordinates
      } c ${pathValues.line.join(", ")}`
    );
});
