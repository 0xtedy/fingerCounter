let handpose;
let video;
let predictions = [];
const options = {
  flipHorizontal: false,
};

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady, options);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    let fingerCounter = 0;
    if (index(prediction)) {
      fingerCounter += 1;
    }
    if (middle(prediction)) {
      fingerCounter += 1;
    }
    if (ring(prediction)) {
      fingerCounter += 1;
    }
    if (small(prediction)) {
      fingerCounter += 1;
    }
    if (thumb(prediction)) {
      fingerCounter += 1;
    }
    textSize(50);
    text(fingerCounter, 70, 60);
  }
}

// 5 and 8
function index(_prediction) {
  const lowfing = _prediction.landmarks[5];
  const highfing = _prediction.landmarks[8];
  const distance = Math.sqrt(
    (lowfing[0] - highfing[0]) ** 2 + (lowfing[1] - highfing[1]) ** 2
  );
  if (distance > 80) {
    //console.log("index");
    return true;
  }
  return false;
}

// 12 and 9
function middle(_prediction) {
  const lowfing = _prediction.landmarks[12];
  const highfing = _prediction.landmarks[9];
  const distance = Math.sqrt(
    (lowfing[0] - highfing[0]) ** 2 + (lowfing[1] - highfing[1]) ** 2
  );
  if (distance > 100) {
    //console.log("middle");
    return true;
  }
  return false;
}

//16 and 13
function ring(_prediction) {
  const lowfing = _prediction.landmarks[16];
  const highfing = _prediction.landmarks[13];
  const distance = Math.sqrt(
    (lowfing[0] - highfing[0]) ** 2 + (lowfing[1] - highfing[1]) ** 2
  );
  if (distance > 80) {
    //console.log("ring");
    return true;
  }
  return false;
}

function small(_prediction) {
  const lowfing = _prediction.landmarks[20];
  const highfing = _prediction.landmarks[17];
  const distance = Math.sqrt(
    (lowfing[0] - highfing[0]) ** 2 + (lowfing[1] - highfing[1]) ** 2
  );
  if (distance > 60) {
    //console.log("small");
    return true;
  }
  return false;
}

function thumb(_prediction) {
  const lowfing = _prediction.landmarks[2];
  const highfing = _prediction.landmarks[5];
  const distance = Math.sqrt(
    (lowfing[0] - highfing[0]) ** 2 + (lowfing[1] - highfing[1]) ** 2
  );
  if (distance > 60) {
    //console.log("thumb");
    return true;
  }
  return false;
}
