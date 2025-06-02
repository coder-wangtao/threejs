import * as THREE from "three";

//这行代码创建了一个 场景（Scene）。THREE.Scene 是三维环境的容器，所有的物体、光源、相机都需要添加到场景中。你可以将它想象成一个舞台，所有的元素都需要在这个舞台上。
const scene = new THREE.Scene();
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
//这行代码创建了一个 透视相机（PerspectiveCamera），这是在 3D 渲染中最常用的相机类型。PerspectiveCamera 用来模拟人眼看世界的方式，
// 远处的物体会显得比较小，近处的物体会显得比较大。
const camera = new THREE.PerspectiveCamera(
  45, //是 视场角（Field of View, FOV），表示相机视角的垂直范围，单位是度。45 表示相机的视场角为 45 度。
  window.innerWidth / window.innerHeight, //是 纵横比（aspect ratio），表示画布的宽高比。通常设置为 window.innerWidth / window.innerHeight 来确保画布适应浏览器窗口的大小。
  0.1, //是 近裁剪面（near clipping plane），表示相机能看到的最小距离。小于这个距离的物体会被裁剪掉。通常设置为 0.1，以确保相机能看到近处的物体。
  1000 //是 远裁剪面（far clipping plane），表示相机能看到的最大距离。远超过这个距离的物体会被裁剪掉。一般设置为 1000，以确保可以看到较远的物体。
);

const renderer = new THREE.WebGLRenderer(); //这行代码创建了一个 WebGL 渲染器（WebGLRenderer）。WebGL 是一个可以直接在浏览器中运行的 3D 渲染 API，THREE.WebGLRenderer 是 three.js 用来通过 WebGL 渲染 3D 图形的对象。

//这行代码设置渲染器的 尺寸，setSize 方法会将渲染器的宽度和高度设置为浏览器窗口的大小。window.innerWidth 和 window.innerHeight 分别表示当前浏览器窗口的宽度和高度。
renderer.setSize(window.innerWidth, window.innerHeight);
//：这行代码将渲染器的 DOM 元素（renderer.domElement）添加到网页的 <body> 标签中。renderer.domElement 返回一个 <canvas> 元素，它是实际渲染图形的地方。
document.body.appendChild(renderer.domElement);

//这行代码创建了一个 材质（material），THREE.MeshBasicMaterial 是一种最简单的材质，不受光照影响，通常用于展示对象的颜色或纹理。这里设置材质的颜色为绿色。

const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//设置父元素的材质为线框模式
parentMaterial.wireframe = true;

//创建几何体
const geometry = new THREE.BufferGeometry();
//创建顶点数据,每三个为一个顶点，顶点是有顺序的，逆时针为正面
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
]);
//创建索引绘制
const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);

//创建索引属性(通过索引共用顶点)
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);

const material1 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  //   side: THREE.DoubleSide,
  wireframe: true,
});

const material2 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  //   side: THREE.DoubleSide,
  //   wireframe: true,
});

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//这行代码创建了一个 材质（material），THREE.MeshBasicMaterial 是一种最简单的材质，不受光照影响，通常用于展示对象的颜色或纹理。这里设置材质的颜色为绿色。
const cmaterial1 = new THREE.MeshBasicMaterial({ color: 0x023345 });
const cmaterial2 = new THREE.MeshBasicMaterial({ color: 0xfff000 });
const cmaterial3 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cmaterial4 = new THREE.MeshBasicMaterial({ color: 0x0faf00 });
const cmaterial5 = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const cmaterial6 = new THREE.MeshBasicMaterial({ color: 0xff00ff });

const cube = new THREE.Mesh(cubeGeometry, [
  cmaterial1,
  cmaterial2,
  cmaterial3,
  cmaterial4,
  cmaterial5,
  cmaterial6,
]);

cube.position.x = 2;
//创建定点属性
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const plane = new THREE.Mesh(geometry, [material1, material2]);

//这行代码将 相机的位置 设置为 (0, 0, 5)。相机默认是位于 (0, 0, 0) 的，但为了能看到场景中的物体（比如立方体），我们将相机沿 z 轴移动了 5 个单位，确保它位于立方体前方。
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;

//这行代码让相机 朝向 (0, 0, 0) 坐标位置看。即使我们设置了相机的位置，lookAt 确保相机始终朝向该点，这样我们就能看到场景中的物体。
camera.lookAt(0, 0, 0);

const axeHelper = new THREE.AxesHelper(5);
scene.add(axeHelper);
scene.add(plane);
scene.add(cube);
const controls = new OrbitControls(camera, renderer.domElement);
//设置带阻尼的惯性
controls.enableDamping = true;
//阻尼的系数
controls.dampingFactor = 0.05;

// controls.autoRotate = true;
function animate() {
  controls.update();
  //requestAnimationFrame(animate)：告诉浏览器在下一帧时调用 animate 函数，这样就实现了平滑的动画循环。
  requestAnimationFrame(animate);
  //cube.rotation.x += 0.01 和 cube.rotation.y += 0.01：这两行代码使得立方体每次渲染时都会稍微旋转，0.01 是每次更新的旋转角度。
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  //renderer.render(scene, camera)：渲染场景，scene 是场景对象，camera 是相机对象，告诉渲染器用哪个相机来看这个场景。
  renderer.render(scene, camera);
}

//animate() 是一个动画函数，它每次被调用时都会更新场景中的物体，并重新渲染场景。
//这行代码启动动画函数，开始动画循环。
animate();
//监听窗口变化
window.addEventListener("resize", () => {
  //重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight);
  //重置相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  //更新相机投影矩阵
  camera.updateProjectionMatrix();
});
