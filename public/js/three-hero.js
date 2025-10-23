// Lightweight Three.js hero background
(function(){
  const container = document.getElementById('hero3d');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight || window.innerHeight * 0.76;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width/height, 0.1, 100);
  camera.position.set(0, 0.2, 3.2);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  const point = new THREE.PointLight(0x9b8cff, 1.4);
  point.position.set(2,2,2);
  scene.add(point);

  // Core object
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x7c6cff,
    roughness: 0.35,
    metalness: 0.4,
    emissive: 0x221144,
    emissiveIntensity: 0.25,
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // Wireframe overlay
  const wire = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.02, 2));
  const line = new THREE.LineSegments(wire, new THREE.LineBasicMaterial({ color: 0x22d3ee, opacity: 0.35, transparent: true }));
  scene.add(line);

  // Particles
  const pCount = 600;
  const pGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(pCount * 3);
  for (let i=0;i<pCount;i++){
    const r = 2 + Math.random()*3.5;
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos(2*Math.random()-1);
    positions[i*3] = r*Math.sin(phi)*Math.cos(theta);
    positions[i*3+1] = r*Math.sin(phi)*Math.sin(theta);
    positions[i*3+2] = r*Math.cos(phi);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.01, transparent: true, opacity: .6 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // Parallax
  let mouseX = 0, mouseY = 0;
  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    mouseX = x; mouseY = y;
  });

  function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.0035;
    mesh.rotation.y += 0.0045;
    line.rotation.copy(mesh.rotation);
    points.rotation.y -= 0.0008;

    camera.position.x += (mouseX*0.6 - camera.position.x) * 0.04;
    camera.position.y += (-(mouseY*0.3) - camera.position.y) * 0.04;
    camera.lookAt(0,0,0);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight || window.innerHeight * 0.76;
    renderer.setSize(w, h);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  });
})();
