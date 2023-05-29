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
 * adding boxPath and curvePath elements to the svg
 */
const boxPath = svg.append("path");
const curvePath = svg.append("path");
const curvePathMirror = svg.append("path");

/**
 * Creating a box path and
 */
boxPath
  .attr("d", "M 50 40, h 240 ,v 80, h-240, v-80  ")
  .attr("fill", "red")
  .attr("stroke-width", "2px");
/**
 * initializing brezier curves
 */
curvePath
  .attr("d", "c 0 0, 0 0, 0 0 ")
  .attr("fill", "white")
  .attr("stroke-width", "2px")
  .attr("stroke", "white");
curvePathMirror
  .attr("d", "c 0 0, 0 0, 0 0 ")
  .attr("fill", "red")
  .attr("stroke-width", "2px")
  .attr("stroke", "white");

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
 * Adding mouse move event to change the brezier curve coordinates
 */
boxPath.on("mousemove", function (e: MouseEvent) {
  const { offsetY, offsetX } = e;
  // Cheking if the mouse enter from top of the box
  if (offsetY <= 50 + 20) {
    pathValues.cordinates = 40;
    pathValues.destination = "top";
    pathValues.line = ["0 40", "90 40", "90 0"];
  }

  // Cheking if the mouse enter from bottom of the box
  if (offsetY <= 120 + 20 && offsetY > 50 + 20) {
    pathValues.cordinates = 120;
    pathValues.destination = "bottom";
    pathValues.line = ["0 -40", "90 -40", "90 0"];
  }
  // making curve grows when the mouse goes deeper in the top. Yamete ૮⸝⸝> ̫ <⸝⸝ ა
  if (pathValues.destination === "top") {
    pathValues.line[0] = `0 ${offsetY}`;
    pathValues.line[1] = `90 ${offsetY}`;
  } else {
    /**
     * when he goes in the bottom i calculate how much it lost from
     * it's originals size: original size ((originalSize - boxSize) - (mousePos - originalSize))
     */
    pathValues.line[0] = `0 -${
      40 + (offsetY - 40 > 40 ? 80 - (offsetY - 40) : 40)
    }`;
    pathValues.line[1] = `90 -${
      40 + (offsetY - 40 > 40 ? 80 - (offsetY - 40) : 40)
    }`;
  }

  /**
   * checking the curves if they are overflowing from the edges
   */
  if (offsetX <= 80) {
    curvePath.attr(
      "d",
      `M ${offsetX} ${pathValues.cordinates} c ${pathValues.line.join(", ")}`
    );
    curvePathMirror.attr(
      "d",
      `M ${offsetX} ${
        pathValues.destination === "bottom" ? 40 : 120
      } c ${pathValues.line.join(", ")}`
    );
  } else if (offsetX >= 242) {
    curvePath.attr(
      "d",
      `M ${241 - 40} ${pathValues.cordinates} c ${pathValues.line.join(", ")}`
    );
    curvePathMirror.attr(
      "d",
      `M ${241 - 40} ${
        pathValues.destination === "bottom" ? 40 : 120
      } c ${pathValues.line.join(", ")}`
    );
  } else {
    curvePath.attr(
      "d",
      `M ${offsetX - 30} ${pathValues.cordinates} c ${pathValues.line.join(
        ", "
      )}`
    );
    curvePathMirror.attr(
      "d",
      `M ${offsetX - 30} ${
        pathValues.destination === "bottom" ? 40 : 120
      } c ${pathValues.line.join(", ")}`
    );
  }
});

/**
 * Removing curves after the user leaves the box
 */
curvePath.on("mouseleave", function (e: MouseEvent) {
  e.stopPropagation();
  e.stopImmediatePropagation();
  curvePath
    .attr("d", "c 0 0, 0 0, 0 0 ")
    .attr("fill", "white")
    .attr("stroke-width", "2px")
    .attr("stroke", "white");
  curvePathMirror
    .attr("d", "c 0 0, 0 0, 0 0 ")
    .attr("fill", "red")
    .attr("stroke-width", "2px")
    .attr("stroke", "white");
});
