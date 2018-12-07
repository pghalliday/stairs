var stepAngleInput = document.querySelector('#stepAngle');
stepAngleInput.value = toDegrees(STEP_ANGLE);
stepAngleInput.onchange = function(event) {
  STEP_ANGLE = toRadians(parseFloat(event.target.value));
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

var doorWidthInput = document.querySelector('#doorWidth');
doorWidthInput.value = DOOR_WIDTH;
doorWidthInput.onchange = function(event) {
  DOOR_WIDTH = parseFloat(event.target.value);
  updateScene();
};

doorRightOffsetInput = document.querySelector('#doorRightOffset');
doorRightOffsetInput.value = DOOR_RIGHT_OFFSET;
doorRightOffsetInput.onchange = function(event) {
  DOOR_RIGHT_OFFSET = parseFloat(event.target.value);
  updateScene();
};

var radiusInput = document.querySelector('#radius')
radiusInput.value = STEP_RADIUS;
radiusInput.onchange = function(event) {
  STEP_RADIUS = parseFloat(event.target.value);
  updateScene();
};

var wallGapInput = document.querySelector('#wallGap')
wallGapInput.value = WALL_GAP;
wallGapInput.onchange = function(event) {
  WALL_GAP = parseFloat(event.target.value);
  updateScene();
};
