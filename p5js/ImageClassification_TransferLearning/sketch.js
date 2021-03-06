// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Image Classifier with Transfer Learning example with p5.js
=== */

let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Create the image classifier with the video and a callback
  classifier = new ml5.ImageClassifier(video, modelLoaded);
  // Create the UI buttons
  createButtons();
}

// A function to be called when the model has been loaded
function modelLoaded() {
  select('#loading').html('Model loaded!');
}

// Add the current frame from the video to the classifier
function addImage(label) {
  classifier.addImage(label);
}

// Predict the current frame.
function predict() {
  classifier.predict(gotResults);
}

// A util function to create UI buttons
function createButtons() {
  // When the Cat button is pressed, add the current frame
  // from the video with a label of "cat" to the classifier
  buttonA = select('#catButton');
  buttonA.mousePressed(function() {
    addImage('cat');
    select('#amountOfCatImages').html(catImages++);
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonB = select('#dogButton');
  buttonB.mousePressed(function() {
    addImage('dog');
    select('#amountOfDogImages').html(dogImages++);
  });

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(predict);
}

// Show the results
function gotResults(result) {
  select('#result').html(result);
  predict();
}