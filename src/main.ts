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
  .attr("d", "c 0 0, 0 0, 0 0 ")
  .attr("fill", "white")
  .attr("stroke-width", "2px")
  .attr("stroke", "white");
curvePathMirror
  .attr("d", "c 0 0, 0 0, 0 0")
  .attr("fill", svgColor)
  .attr("stroke-width", "2px")
  .attr("stroke", "white");
/**
 * @description: Adding text element to the svg
 */
const text = svg.append("text");
text
  .text("Login")
  .attr("x", 145)
  .attr("y", 142)
  .attr("fill", "white")
  .attr("dominant-baseline", "middle")
  .attr("textLength", "75px")
  .attr("lengthAdjust", "spacingAndGlyphs")
  .attr("text-anchor", "middle")
  .style("font-size", "25px");
console.log(text.node()!.textLength);

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

boxPath.on("mousemove", nunjutsuEffect);
/**
 * @description: Adding mouse move event to change the brezier curve coordinates
 * @returns: void
 */
let startTyping = false;
function brezierCurveEffect(e: MouseEvent) {
  boxStopLaughing();

  if (document.querySelectorAll(".error").length < 1 && startTyping) return;
  const { offsetY, offsetX } = e;
  svg.style("z-index", "2");
  text.text("");
  // Cheking if the mouse enter from top of the box
  if (offsetY <= 100 + 20) {
    pathValues.cordinates = 100;
    pathValues.destination = "top";
    pathValues.line = ["0 40", "90 40", "90 0"];
    if (isAudioEnabled()) {
      new Audio("src/assets/sounds/Bonk.mp3").play();
    }
  }
  // Cheking if the mouse enters from bottom of the box
  if (offsetY <= 180 + 20 && offsetY > 100 + 20) {
    pathValues.cordinates = 180;
    pathValues.destination = "bottom";
    pathValues.line = ["0 -40", "90 -40", "90 0"];

    if (isAudioEnabled()) {
      new Audio("src/assets/sounds/Bonk.mp3").play();
    }
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
}
/**
 *
 */
/**
 * @description: Removing the curves after the user leaves the box
 * @returns: void
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
  svg.style("z-index", "");
}

/**
 * @description: Adding events
 */
// curvePath.on("mouseleave", () => {
//   removeCurves();
//   boxLaughing();
// });

/**
 * @description: For some reason that beyond my knowledge
 * when the cursor go left or right event is not workig
 * so i had to add it on the container as well
 */
// svg.on("mouseleave", removeCurves);

/**
 * @description: Adding inputs Validation
 */
const EMAIL_REGEX = /\S+@\S+\.\S+/;
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

/**
 * @description: audio toggle event
 */
d3.select("#play-audio").on("click", (e: Event) => {
  const label = e.currentTarget as HTMLLabelElement;

  if (label.dataset.play === "true") {
    label.innerHTML =
      "Audio is <strong>Disabled</strong>. Click here to enable it";
    label.style.color = "Red";
    label.dataset.play = "false";
  } else {
    label.innerHTML =
      "Audio is <strong>Enabled</strong>. Click here to disable it";
    label.style.color = "blue";
    label.dataset.play = "true";
  }
});
/**
 * @description: Making box laugh and stop laughing
 * @returns: void
 */
const laughSound = new Audio("src/assets/sounds/laugh.mp3");

async function boxLaughing() {
  if (isAudioEnabled()) {
    boxPath.style("animation", "laughing 0.1s infinite");
    text.style("animation", "laughing 0.1s infinite");
    laughSound.load();
    laughSound.play();
  }
  badWordGenerator();
}
function boxStopLaughing() {
  boxPath.style("animation", "");
  text.style("animation", "");
  removeBadword();
  if (isAudioEnabled()) {
    laughSound.pause();
  }
}

/**
 * @description: stoping box laugh animatiom after the laugh end
 */
laughSound.addEventListener("ended", () => {
  boxStopLaughing();
});

/**
 * @description: checks if audio is playing
 * @returns Boolean
 */
function isAudioEnabled() {
  return (
    (d3.select("#play-audio").node() as HTMLLabelElement).dataset.play ===
    "true"
  );
}
/**
 * @description: fetching swears
 */
let swears: Array<string>;
(async () => {
  swears = await (await fetch("src/data/swears.json")).json();
})();
/**
 * @description: Generating bad word
 * @returns: void
 */
function badWordGenerator() {
  text.text(swears[Math.floor(Math.random() * swears.length)]);
}

/**
 * @description: removing the bad word
 * @returns: void
 */
function removeBadword() {
  text.text("Login");
  setTimeout(() => {
    if (!isAudioEnabled()) {
      text.text("Login");
    }
  }, 3000);
}
/**
 * @description: Starting hiding animation
 * @returns: void
 */
function nunjutsuEffect() {
  svg.style("animation", "nunjutsuHiding 0.5s");
}
//changing box position after animation end
svg.on("animationend", function (e: AnimationEvent) {
  // Update the box position
  if (e.animationName === "nunjutsuHiding") {
    const { xRandomPosition, yRandomPosition } = generateBoxPosition();
    svg.style("position", "absolute");
    svg.style("z-index", "4");
    svg.style("top", yRandomPosition);
    svg.style("right", xRandomPosition);
    svg.style("animation", "nunjutsuShowing .5s");
  }
});
interface positions {
  xRandomPosition: number;
  yRandomPosition: number;
}
/**
 * @description: get random x and y position
 * based on window width and height
 * @returns object with random x and y position
 */
function generateBoxPosition(): positions {
  // Get the dimensions and position of the inputs container
  const inputsPos = (
    d3.select("#inputs-container").node() as HTMLDivElement
  ).getBoundingClientRect();

  const boxWidth = 250; // Width of the box
  const boxHeight = 90; // Height of the box

  // Calculate the maximum allowed x and y positions
  const maxX = window.innerWidth - boxWidth;
  const maxY = window.innerHeight - boxHeight;

  // Calculate random positions within the allowed range
  const xRandomPosition = Math.floor(Math.random() * maxX);
  const yRandomPosition = Math.floor(Math.random() * maxY);

  // Check if the randomly generated position overlaps with the inputs container
  const overlapsInputs =
    xRandomPosition >= inputsPos.left &&
    xRandomPosition <= inputsPos.right &&
    yRandomPosition >= inputsPos.top &&
    yRandomPosition <= inputsPos.bottom;

  /**
   * If the position overlaps with the inputs container, generate new positions
   * until a non-overlapping position is found
   */
  if (overlapsInputs) {
    const result = generateBoxPosition(); // Recursively call the function to generate new positions
    if (result !== undefined) {
      return result;
    }
  }
  return {
    xRandomPosition,
    yRandomPosition,
  };
}
