// Lightweight Three.js hero background with floating primitives
// Lazily imported by main.js

export async function initHero3D(canvas) {
  const [{ Scene, PerspectiveCamera, WebGLRenderer, Color, FogExp2, Group, Mesh, MeshStandardMaterial, TorusKnotGeometry, IcosahedronGeometry, DirectionalLight, AmbientLight, Clock, MathUtils },
         { OrbitControls }] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'),
    import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js')
  ]);

  const scene = new Scene();
  scene.background = new Color('#06080d');
  scene.fog = new FogExp2(0x06080d, 0.04);

  const camera = new PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
  camera.position.set(0, 1.2, 6.5);

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  resize();

  // Lights
  const amb = new AmbientLight(0xa7ffc6, 0.25);
  const dir1 = new DirectionalLight(0x12c2e9, 1.0); dir1.position.set(3, 4, 2);
  const dir2 = new DirectionalLight(0x00ffc6, 0.6); dir2.position.set(-3, -2, -1);
  scene.add(amb, dir1, dir2);

  // Objects
  const group = new Group();
  const matPrimary = new MeshStandardMaterial({ color: 0x12c2e9, metalness: 0.6, roughness: 0.2 });
  const matMint = new MeshStandardMaterial({ color: 0xa6ffcb, metalness: 0.5, roughness: 0.3 });

  const knot = new Mesh(new TorusKnotGeometry(1.1, 0.34, 150, 16), matPrimary);
  const ico1 = new Mesh(new IcosahedronGeometry(0.6, 1), matMint);
  const ico2 = new Mesh(new IcosahedronGeometry(0.4, 0), matPrimary);

  knot.position.set(0.1, 0.2, 0);
  ico1.position.set(-2.1, 0.6, -0.8);
  ico2.position.set(2.1, -0.4, -0.6);

  group.add(knot, ico1, ico2);
  scene.add(group);

  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.4;

  const clock = new Clock();

  function animate() {
    const t = clock.getElapsedTime();
    group.rotation.y = t * 0.12;
    knot.rotation.x = t * 0.2;
    ico1.position.y = Math.sin(t * 0.8) * 0.4 + 0.3;
    ico2.position.y = Math.cos(t * 0.7) * 0.4 - 0.2;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);
  }

  animate();
}
