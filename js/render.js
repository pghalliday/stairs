var STAIRS_OFFSET_HEIGHT = 10;
var STAIRS_OFFSET_ANGLE = toRadians(0);
var STEP_HEIGHT = 190;
var STEP_ANGLE = toRadians(22);
var STEP_RADIUS = 1000;
var BORDES_ANGLE = toRadians(70);
var STAIRS = [15, 14];
var FLOORS = [0, 3050, 2950];
var FLOOR_SQUARE = 4000;
var WALL_WIDTH = FLOOR_SQUARE;
var TOP_FLOOR_HEIGHT = FLOORS.reduce(function(acc, height) {return acc + height;});
var WALL_HEIGHT = TOP_FLOOR_HEIGHT + 3000;
var WALL_GAP = 50;
var DOOR_HEIGHT = 2000;
var DOOR_WIDTH = 750;
var DOOR_RIGHT_OFFSET = 150;

var BLUE = 0x156289;
var BLUE_DARK = 0x072534;
var GREEN = 0x8DC53F;
var GREEN_DARK = 0x3d561a;
var RED = 0xeb201a;
var RED_DARK = 0x710d0a;
var WHITE = 0xffffff;

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function addDoorStep(stairHeight, group) {
  var width = STEP_RADIUS + WALL_GAP;
  var height = TOP_FLOOR_HEIGHT - stairHeight;
  var depth = (STEP_RADIUS * 2) + (WALL_GAP * 2);
  var direction = new THREE.Vector3(STEP_RADIUS + WALL_GAP, 0, - (width - DOOR_WIDTH - DOOR_RIGHT_OFFSET));
  direction.normalize();
  var plane = new THREE.Plane(direction, (width / 2));
  var geometry = new THREE.BoxGeometry(
    width,
    height,
    depth,
  );
  var geometry = sliceGeometry(geometry, plane, true);
  var meshMaterial = new THREE.MeshStandardMaterial({
    color: GREEN,
    emissive: GREEN_DARK,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
    opacity: 0.3,
  });
  var box = new THREE.Mesh(geometry, meshMaterial);
  box.translateX((FLOOR_SQUARE / 2) - (width / 2));
  box.translateZ(- ((FLOOR_SQUARE / 2) - (depth / 2)));
  box.translateY(TOP_FLOOR_HEIGHT - (height / 2));
  group.add(box);
}

function addDoorway(group) {
  var material = new THREE.LineBasicMaterial( { color: WHITE } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, DOOR_HEIGHT, 0));
  geometry.vertices.push(new THREE.Vector3(DOOR_WIDTH, DOOR_HEIGHT,  0));
  geometry.vertices.push(new THREE.Vector3(DOOR_WIDTH, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  var line = new THREE.Line(geometry, material);
  line.translateX((FLOOR_SQUARE / 2) - DOOR_WIDTH - DOOR_RIGHT_OFFSET);
  line.translateZ((FLOOR_SQUARE / 2) - (STEP_RADIUS * 2) + (WALL_GAP * 2));
  line.translateY(TOP_FLOOR_HEIGHT);
  group.add(line);
}

function addBackWall(group) {
  var plane = new THREE.PlaneGeometry(WALL_WIDTH, WALL_HEIGHT);
  var meshMaterial = new THREE.MeshStandardMaterial({
    color: RED,
    emissive: RED_DARK,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
    opacity: 0.1,
  });
  var wall = new THREE.Mesh(plane, meshMaterial);
  wall.translateZ(- (WALL_WIDTH / 2));
  wall.translateY(WALL_HEIGHT / 2);
  group.add(wall);
}

function addSideWall(group) {
  var plane = new THREE.PlaneGeometry(WALL_WIDTH, WALL_HEIGHT);
  var meshMaterial = new THREE.MeshStandardMaterial({
    color: RED,
    emissive: RED_DARK,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
    opacity: 0.1,
  });
  var wall = new THREE.Mesh(plane, meshMaterial);
  wall.rotateY(Math.PI / 2);
  wall.translateZ(WALL_WIDTH / 2);
  wall.translateY(WALL_HEIGHT / 2);
  group.add(wall);
}

function addFloor(height, group) {
  var plane = new THREE.PlaneGeometry(FLOOR_SQUARE, FLOOR_SQUARE);
  var meshMaterial = new THREE.MeshStandardMaterial({
    color: GREEN,
    emissive: GREEN_DARK,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
    opacity: 0.1,
  });
  var floor = new THREE.Mesh(plane, meshMaterial);
  floor.rotateX(Math.PI / 2);
  floor.translateZ(- height);
  group.add(floor);
}

function addStairComponent(angle, stepOffset, bordesOffset, scene) {
  var group = new THREE.Group();
  var rotation = (stepOffset * STEP_ANGLE) + (bordesOffset * BORDES_ANGLE) + STAIRS_OFFSET_ANGLE;
  var height = ((stepOffset + bordesOffset) * STEP_HEIGHT) + (STEP_HEIGHT / 2) + STAIRS_OFFSET_HEIGHT;
  var cylinder = new THREE.CylinderGeometry(
    STEP_RADIUS,
    STEP_RADIUS,
    STEP_HEIGHT,
    undefined,
    undefined,
    false,
    0,
    angle,
  );
  var plane = new THREE.PlaneGeometry(STEP_RADIUS, STEP_HEIGHT);
  var meshMaterial = new THREE.MeshStandardMaterial({
    color: BLUE,
    emissive: BLUE_DARK,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
    opacity: 0.7,
  });
  var side1 = new THREE.Mesh(plane, meshMaterial);
  side1.rotateY(- Math.PI / 2);
  side1.translateX(STEP_RADIUS / 2);
  var side2 = new THREE.Mesh(plane, meshMaterial);
  side2.rotateY(angle - Math.PI / 2);
  side2.translateX(STEP_RADIUS / 2);
  group.add(new THREE.Mesh(cylinder, meshMaterial));
  group.add(side1);
  group.add(side2);
  group.rotateY(rotation);
  group.translateY(height);
  scene.add(group);
}

function addStep(stepOffset, bordesOffset, scene) {
  addStairComponent(STEP_ANGLE, stepOffset, bordesOffset, scene);
}

function addBordes(stepOffset, bordesOffset, scene) {
  addStairComponent(BORDES_ANGLE, stepOffset, bordesOffset, scene);
}

function addStairs(config, scene) {
  var stepOffset = 0;
  var bordesOffset = 0;
  config.forEach(function(stepCount) {
    for (var i = 0; i < stepCount; i++) {
      addStep(stepOffset++, bordesOffset, scene);
    }
    addBordes(stepOffset, bordesOffset++, scene);
  });
  return (stepOffset + bordesOffset) * STEP_HEIGHT;
}

function addFloors(config, group) {
  var offset = 0;
  config.forEach(function(height) {
    addFloor(height + offset, group);
    offset += height;
  });
}

function addLights(scene) {
  var lights = [];
  lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

  lights[ 0 ].position.set( 0, - 200, 0 );
  lights[ 1 ].position.set( 100, - 200, 100 );
  lights[ 2 ].position.set( - 100, 200, - 100 );

  scene.add( lights[ 0 ] );
  scene.add( lights[ 1 ] );
  scene.add( lights[ 2 ] );
}

function addStructure(stairHeight, scene) {
  var group = new THREE.Group();
  addFloors(FLOORS, group);
  addBackWall(group);
  addSideWall(group);
  addDoorway(group);
  addDoorStep(stairHeight, group);
  group.translateX(- ((FLOOR_SQUARE / 2) - STEP_RADIUS - WALL_GAP));
  group.translateZ((FLOOR_SQUARE / 2) - STEP_RADIUS - WALL_GAP);
  scene.add(group);
}

var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.set(4000, 4000, 4000);
var controls = new THREE.OrbitControls(camera);

var scene;
function createScene() {
  scene = new THREE.Scene();
  addLights(scene);
  var stairHeight = addStairs(STAIRS, scene);
  addStructure(stairHeight, scene);
  controls.target = new THREE.Vector3(0, stairHeight / 2, 0);
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

createScene();
animate();

