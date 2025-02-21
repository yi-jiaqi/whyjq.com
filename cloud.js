const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true, alpha: true });

var noise = new Noise(Math.random());
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1.1;
camera.position.x -= 0.72;
camera.position.y += 0.24;
var light = new THREE.AmbientLight(0xffffff, .1);
light.position.set(0, 1, 1).normalize();
scene.add(light);
const circleTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
var c = document.createElement('canvas');
c.width = 32;
c.height = 32;
var ctx = c.getContext('2d');
ctx.clearRect(0, 0, 32, 32);
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.arc(64, 64, 64, 0, 2 * Math.PI);
ctx.fill();
var tex = new THREE.CanvasTexture(c);
let material2 = new THREE.PointsMaterial({
    color: 0x071108, size: .006, map: tex, alphaMap: tex,
    alphaTest: .01,
});
var params = {
    radius: 25,
    tube: 1,
    radialSegments: 300, // Lowered for optimization
    tubularSegments: 16,
    p: 2, // shape
    q: 2, // shape
    heightScale: 0,
};
var geometry = new THREE.TorusKnotGeometry(
    params.radius,
    params.tube,
    params.radialSegments,
    params.tubularSegments,
    params.p,
    params.q,
    params.heightScale,
);
const sphere = new THREE.Points(geometry, material2);
scene.add(sphere);

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

window.addEventListener('resize', debounce(onWindowResize, 100), false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const update = function () {
    const time = performance.now() * 0.00005;
    const t = 0.8;
    for (var i = 0; i < sphere.geometry.vertices.length; i += 1) {
        const p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(1.225 + k * noise.perlin3(p.x * t - time, p.y * t, p.z * t / 2));
    }
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
    sphere.geometry.verticesNeedUpdate = true;
}



function animate() {
    // sphere.rotation.x += 0.00125;
    // sphere.rotation.y += 0.00125;
    update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
