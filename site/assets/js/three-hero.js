// Three.js animated hero background (progressively enhanced)
(function(){
  const container = document.querySelector('.canvas-wrap');
  if(!container){ return; }

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
    });
  }

  function start(){
    const {THREE} = window;
    if(!THREE){ return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,0,9);

    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    container.appendChild(renderer.domElement);

    // Lights
    const light1 = new THREE.PointLight(0x7c7cff, 1.2, 0);
    light1.position.set(5,5,10);
    const light2 = new THREE.PointLight(0x22d3ee, 1.1, 0);
    light2.position.set(-6,-4,8);
    scene.add(light1, light2);

    // Geometry: TorusKnot + Particles
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x88e0ff,
      roughness: 0.2,
      metalness: 0.3,
      transmission: 0.6,
      thickness: 1.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(2.4, .6, 220, 32), mat);
    scene.add(torus);

    const particles = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({ color: 0x6ee7ff, size: 0.03 })
    );
    const count = 2000;
    const positions = new Float32Array(count*3);
    for(let i=0;i<count;i++){
      positions[i*3+0] = (Math.random()-0.5)*20;
      positions[i*3+1] = (Math.random()-0.5)*12;
      positions[i*3+2] = (Math.random()-0.5)*14;
    }
    particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));
    scene.add(particles);

    function animate(){
      requestAnimationFrame(animate);
      torus.rotation.x += 0.003;
      torus.rotation.y += 0.004;
      particles.rotation.y += 0.0009;
      renderer.render(scene, camera);
    }
    animate();

    function onResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);
  }

  if(!window.THREE){
    loadScript('https://unpkg.com/three@0.160.0/build/three.min.js').then(start).catch(()=>{});
  } else { start(); }
})();
