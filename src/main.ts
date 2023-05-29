import * as d3 from "d3";

/**
 * @description: Adding Svg element to the div#app
 */
const width = 300;
const height = 300;
const svgColor = "#007fff";
const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

/**
 * @description: adding boxPath and curvePath elements to the svg
 */
const boxPath = svg.append("path");
const curvePath = svg.append("path");
const curvePathMirror = svg.append("path");

/**
 * @description: Creating a box path and
 */
boxPath
  .attr("d", `M 30 100, h 240 ,v 80, h-240, v-80`)
  .attr("fill", svgColor)
  .attr("stroke-width", "2px");
/**
 * @description: initializing brezier curves
 */
curvePath
  .attr("d", "c 0 0, 0 0, 0 0, 0 0 ")
  .attr("fill", "white")
  .attr("stroke-width", "2px")
  .attr("stroke", "white");
curvePathMirror
  .attr("d", "c 0 0, 0 0, 0 0, 0 0 ")
  .attr("fill", svgColor)
  .attr("stroke-width", "2px")
  .attr("stroke", "white");

/**
 * @description: Adding text element to the svg
 */
const text = svg.append("text");
text
  .text("Login")
  .attr("x", 115)
  .attr("y", 145)
  .attr("fill", "white")
  .style("font-size", "25px");

/**
 * @description: Defining the Shape Object to store mouse position
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
 * @description: Adding mouse move event to change the brezier curve coordinates
 */
let startTyping = false;
boxPath.on("mousemove", function (e: MouseEvent) {
  if (document.querySelectorAll(".error").length < 1 && startTyping) return;
  const { offsetY, offsetX } = e;
  svg.style("z-index", "2");
  text.text("");
  // Cheking if the mouse enter from top of the box
  if (offsetY <= 100 + 20) {
    pathValues.cordinates = 100;
    pathValues.destination = "top";
    pathValues.line = ["0 40", "90 40", "90 0"];
  }
  // Cheking if the mouse enters from bottom of the box
  if (offsetY <= 180 + 20 && offsetY > 100 + 20) {
    pathValues.cordinates = 180;
    pathValues.destination = "bottom";
    pathValues.line = ["0 -40", "90 -40", "90 0"];
  }
  // if (offsetX <= 170 && offsetY >= 100) {
  //   console.log("ana f limn");
  // }
  if (pathValues.destination === "top") {
    /**
     * @description: Making curve grows when the mouse goes deeper in the top. Yamete ૮⸝⸝> ̫ <⸝⸝ ა.
     * Top formula is : (curve size) - ( (mouse position) - box  Y position ).
     * Bottom formula is : (curve size) - ( (box - Y position) - (mouse position) ).
     */
    pathValues.line[0] = `0 ${40 + (offsetY - 100)}`; //
    pathValues.line[1] = `90 ${40 + (offsetY - 100)}`;
  } else {
    pathValues.line[0] = `0 -${40 + (180 - offsetY)}`;
    pathValues.line[1] = `90 -${40 + (180 - offsetY)}`;
  }

  /**
   * @description: checking the curves if they are overflowing from the edges
   */
  if (offsetX <= 70) {
    curvePath.attr(
      "d",
      `M ${offsetX} ${pathValues.cordinates} c ${pathValues.line.join(", ")}`
    );
    curvePathMirror.attr(
      "d",
      `M ${offsetX} ${
        pathValues.destination === "bottom" ? 100 : 180
      } c ${pathValues.line.join(", ")}`
    );
  } else if (offsetX >= 219) {
    curvePath.attr(
      "d",
      `M ${219 - 40} ${pathValues.cordinates} c ${pathValues.line.join(", ")}`
    );
    curvePathMirror.attr(
      "d",
      `M ${219 - 40} ${
        pathValues.destination === "bottom" ? 100 : 180
      } c ${pathValues.line.join(", ")}`
    );
  } else {
    curvePath.attr(
      "d",
      `M ${offsetX - 40} ${pathValues.cordinates} c ${pathValues.line.join(
        ", "
      )}`
    );
    curvePathMirror.attr(
      "d",
      `M ${offsetX - 40} ${
        pathValues.destination === "bottom" ? 100 : 180
      } c ${pathValues.line.join(", ")}`
    );
  }
});

/**
 * @description: Removing the curves after the user leaves the box
 * @return: void
 */
function removeCurves() {
  curvePath
    .attr("d", "c 0 0, 0 0, 0 0 ")
    .attr("fill", "white")
    .attr("stroke-width", "2px")
    .attr("stroke", "white");
  curvePathMirror
    .attr("d", "c 0 0, 0 0, 0 0 ")
    .attr("fill", "#007fff")
    .attr("stroke-width", "2px")
    .attr("stroke", "white");
  text.text("Login");
  svg.style("z-index", "");
}
/**
 * @description: For some reason that beyond my knowledge
 * when the cursor go left or right event is not workig
 * so i had to add it on the container as well
 */
curvePath.on("mouseleave", removeCurves);
svg.on("mouseleave", removeCurves);

/**
 * @description: Adding inputs Validation
 */
let EMAIL_REGEX = /\S+@\S+\.\S+/;
document.querySelectorAll("input").forEach((input: HTMLInputElement) => {
  input.addEventListener("input", function () {
    if (!startTyping) startTyping = true;
    if (this.id === "userName" && this.value.length < 3) {
      this.classList.add("error");
    } else if (this.type === "email" && !EMAIL_REGEX.test(this.value)) {
      this.classList.add("error");
    } else if (this.id === "pass" && this.value.length < 9) {
      this.classList.add("error");
    } else if (
      this.id === "confirm" &&
      this.value.length < 9 &&
      this.value != (document.querySelector("#pass") as HTMLInputElement).value
    ) {
      this.classList.add("error");
    } else {
      this.classList.remove("error");
    }
  });
});
