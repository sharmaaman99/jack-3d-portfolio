import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group for 3D elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Floating 3D Geometric Torus Knot with metallic dark chrome wireframe
    const torusGeometry = new THREE.TorusKnotGeometry(4.2, 0.9, 128, 32, 2, 3);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x242832,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      wireframeLinewidth: 1.2,
      transparent: true,
      opacity: 0.18,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0, -4);
    mainGroup.add(torus);

    // 2. Floating 3D Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x7621B0,
      emissive: 0x18011F,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    ico.position.set(-8, 3, -2);
    mainGroup.add(ico);

    // 3. Floating Octahedron on right
    const octGeometry = new THREE.OctahedronGeometry(2, 0);
    const octMaterial = new THREE.MeshStandardMaterial({
      color: 0xBBCCD7,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const oct = new THREE.Mesh(octGeometry, octMaterial);
    oct.position.set(8, -3, -3);
    mainGroup.add(oct);

    // 4. Subtle 3D particle dust cloud
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 35;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xBBCCD7,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    mainGroup.add(particleMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xB600A8, 3, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7621B0, 3, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Mouse tracking for 3D parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = targetX * 0.8;
      mainGroup.rotation.x = targetY * 0.8;

      // Independent shape rotations
      torus.rotation.x = elapsedTime * 0.15;
      torus.rotation.y = elapsedTime * 0.2;

      ico.rotation.x = elapsedTime * 0.25;
      ico.rotation.z = elapsedTime * 0.18;

      oct.rotation.y = elapsedTime * 0.3;
      oct.rotation.x = -elapsedTime * 0.15;

      particleMesh.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      octGeometry.dispose();
      octMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60"
      aria-hidden="true"
    />
  );
};
