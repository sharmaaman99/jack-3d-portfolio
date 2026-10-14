import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Box, Layers, Cpu } from 'lucide-react';
import * as THREE from 'three';

export interface ProjectData {
  number: string;
  category: string;
  title: string;
  clientType: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  description: string;
  deliverables: string[];
  techStack: string[];
}

export interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Mount an interactive 3D inspection mesh for the selected project
  useEffect(() => {
    if (!project || !canvasRef.current) return;
    const container = canvasRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Pick geometry based on project
    let geom: THREE.BufferGeometry;
    if (project.number === '01') {
      geom = new THREE.TorusKnotGeometry(1.2, 0.38, 100, 16);
    } else if (project.number === '02') {
      geom = new THREE.DodecahedronGeometry(1.5, 1);
    } else {
      geom = new THREE.IcosahedronGeometry(1.5, 0);
    }

    const mat = new THREE.MeshStandardMaterial({
      color: 0xBBCCD7,
      metalness: 0.85,
      roughness: 0.15,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);

    // Inner wireframe glow
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xB600A8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(geom, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    scene.add(wireMesh);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 2);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7621B0, 3, 20);
    light2.position.set(-5, -5, 3);
    scene.add(light2);

    const amb = new THREE.AmbientLight(0x404040, 1);
    scene.add(amb);

    // Interactive Drag / Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;
      wireMesh.rotation.y += deltaX * 0.01;
      wireMesh.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        mesh.rotation.y += 0.008;
        mesh.rotation.x += 0.005;
        wireMesh.rotation.y += 0.008;
        wireMesh.rotation.x += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      wireMat.dispose();
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#101216] border border-[#262B34] rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Top Header */}
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-sm font-black text-[#B600A8] tracking-widest uppercase">
                Project {project.number}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-[#D7E2EA]/80 font-medium uppercase">
                {project.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium uppercase">
                {project.clientType}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#D7E2EA] tracking-tight mb-4">
              {project.title}
            </h2>

            <p className="text-base text-[#D7E2EA]/75 font-light leading-relaxed max-w-3xl mb-8">
              {project.description}
            </p>

            {/* Interactive 3D Inspection Canvas */}
            <div className="relative w-full h-64 sm:h-80 bg-gradient-to-b from-[#161922] to-[#0D0F14] rounded-2xl border border-[#262B34] overflow-hidden mb-8 flex items-center justify-center">
              <div ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none px-3 py-1 rounded-full bg-black/50 border border-white/10 text-xs font-mono text-[#D7E2EA]/80">
                <Box className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>3D Asset Model (Drag to Orbit)</span>
              </div>
            </div>

            {/* Deliverables & Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-[#151820] rounded-2xl border border-[#232832]">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BBCCD7] mb-3">
                  <Layers className="w-4 h-4 text-[#B600A8]" />
                  <span>Key Deliverables</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#D7E2EA]/80 font-light">
                  {project.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BBCCD7] mb-3">
                  <Cpu className="w-4 h-4 text-[#7621B0]" />
                  <span>Tech & Software</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-[#D7E2EA]/90 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery images preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="overflow-hidden rounded-2xl border border-white/10 aspect-[4/3]">
                <img
                  src={project.col1Img1}
                  alt={`${project.title} render 1`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 aspect-[4/3]">
                <img
                  src={project.col1Img2}
                  alt={`${project.title} render 2`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 aspect-[4/3]">
                <img
                  src={project.col2Img}
                  alt={`${project.title} render 3`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#232832]">
              <a
                href={project.col2Img}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/80 hover:text-white transition-colors"
              >
                <span>View Full-Res 4K Render</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20 text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onContactClick();
                  }}
                  className="w-1/2 sm:w-auto px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  Start Project Like This
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
