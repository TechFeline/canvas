// Get the canvas element and its context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Set initial position variables
var painting = false;
var startPosition = { x: 0, y: 0 };

// Set initial drawing styles
var color = '#000000';
var size = 3;
var eraserMode = false;

// Resize the canvas to fill the container
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

// Get the offset position of the canvas within the page
function getOffsetPosition(event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

// Start drawing when mouse is clicked down
canvas.addEventListener('mousedown', function (event) {
  painting = true;
  startPosition = getOffsetPosition(event);
  draw(event);
});

// Continue drawing when mouse is moved
canvas.addEventListener('mousemove', function (event) {
  if (painting) {
    draw(event);
  }
});

// Stop drawing when mouse is released
canvas.addEventListener('mouseup', function () {
  painting = false;
});

// Draw on the canvas
function draw(event) {
  var currentPosition = getOffsetPosition(event);
  
  // Set drawing styles
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  
  // Choose color or eraser mode
  if (eraserMode) {
    ctx.strokeStyle = '#ffffff'; // Use white color for eraser
  } else {
    ctx.strokeStyle = color;
  }
  
  // Draw the line
  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y);
  ctx.lineTo(currentPosition.x, currentPosition.y);
  ctx.stroke();
  
  startPosition = currentPosition;
}

// Clear the canvas
var clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Toggle eraser mode
var eraserBtn = document.getElementById('eraserBtn');
eraserBtn.addEventListener('click', function () {
  eraserMode = !eraserMode;
  eraserBtn.classList.toggle('active');
});

// Set selected color
var colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', function () {
  color = colorPicker.value;
});

// Set selected size
var sizeSlider = document.getElementById('sizeSlider');
sizeSlider.addEventListener('input', function () {
  size = sizeSlider.value;
});

// Resize the canvas on window resize
window.addEventListener('resize', function () {
  resizeCanvas();
});

// Initialize the canvas size
resizeCanvas();
