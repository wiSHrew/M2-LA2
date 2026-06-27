import * as THREE from './three.module.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,10,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let stars1, stars2, starGeo;
let textMesh = new THREE.Mesh();

lighting();
name();
particles();

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("./assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xffb6c1,
    size: 0.7,
    map: sprite,
  });

  stars1 = new THREE.Points(starGeo, starMaterial);
  stars2 = new THREE.Points(starGeo, starMaterial);
  scene.add(stars1);
  scene.add(stars2);
  stars2.position.set(0, 500, 0)
}
let inc = 2
function animateParticles() {
    // starGeo.verticesNeedUpdate = true;
    stars1.position.y -= 0.9;
    stars2.position.y -= 0.9;

    if(stars1.position.y <= -500){
      stars1.position.set(0, 500, 0)
    }
    
    if(stars2.position.y <= -500){
      stars2.position.set(0, 500, 0)
    }
  }

function name(){
  const texture = new THREE.TextureLoader().load("./assets/textures/wooden.jpg");
  const textLoader = new FontLoader();
  textLoader.load("./assets/fonts/Roboto Condensed_Regular.json",function(font){
    const tGeometry = new TextGeometry("Jerome",{
      font: font,
		size: 3,
		height: 1,
		curveSegments: 100,
		bevelEnabled: true,
		bevelThickness: .3,
		bevelSize: .2,
		bevelOffset: 0,
		bevelSegments: 10
    });
    const tMaterial = new THREE.MeshPhongMaterial({map: texture});
    
    textMesh = new THREE.Mesh(tGeometry, tMaterial);
    tGeometry.center();
    scene.add(textMesh);

    camera.position.z = 17;
    
  });
};
function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);

  const spotLight2 = new THREE.SpotLight(0xffffff);
  spotLight2.position.set(0, 0, -15);
  spotLight2.castShadow = true;
  spotLight2.shadow.mapSize.width = 1024;
  spotLight2.shadow.mapSize.height = 1024;
  spotLight2.shadow.camera.near = 500;
  spotLight2.shadow.camera.far = 4000;
  spotLight2.shadow.camera.fov = 30;
  scene.add(spotLight2);
}

function animate() {
  requestAnimationFrame(animate);
  animateParticles();
  if (textMesh) { // ✅ only rotate if defined
      textMesh.rotation.x += 0.008;
      textMesh.rotation.y += 0.008;
    }
  renderer.render(scene, camera);
}

animate();
