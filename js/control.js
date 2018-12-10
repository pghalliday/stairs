var stepAngleInput = document.querySelector('#stepAngle');
stepAngleInput.value = toDegrees(STEP_ANGLE);
stepAngleInput.onchange = function(event) {
  STEP_ANGLE = toRadians(parseFloat(event.target.value));
  updateScene();
};

var stairsOffsetHeightInput = document.querySelector('#stairsOffsetHeight');
stairsOffsetHeightInput.value = STAIRS_OFFSET_HEIGHT;
stairsOffsetHeightInput.onchange = function(event) {
  STAIRS_OFFSET_HEIGHT = parseFloat(event.target.value);
  updateScene();
};

var stairsOffsetAngleInput = document.querySelector('#stairsOffsetAngle');
stairsOffsetAngleInput.value = toDegrees(STAIRS_OFFSET_ANGLE);
stairsOffsetAngleInput.onchange = function(event) {
  STAIRS_OFFSET_ANGLE = toRadians(parseFloat(event.target.value));
  updateScene();
};

var bordesAngleInput = document.querySelector('#bordesAngle')
bordesAngleInput.value = toDegrees(BORDES_ANGLE);
bordesAngleInput.onchange = function(event) {
  BORDES_ANGLE = toRadians(parseFloat(event.target.value));
  updateScene();
};

var stepHeightInput = document.querySelector('#stepHeight')
stepHeightInput.value = STEP_HEIGHT;
stepHeightInput.onchange = function(event) {
  STEP_HEIGHT = parseFloat(event.target.value);
  updateScene();
};

var bordesHeightInput = document.querySelector('#bordesHeight')
bordesHeightInput.value = BORDES_HEIGHT;
bordesHeightInput.onchange = function(event) {
  BORDES_HEIGHT = parseFloat(event.target.value);
  updateScene();
};
