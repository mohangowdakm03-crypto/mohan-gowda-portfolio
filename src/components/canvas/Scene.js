'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PresentationControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import GlassDroplet from './GlassDroplet';

function AnimatedLights() {
  const lightRef1 = useRef();
  const lightRef2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lightRef1.current) {
      lightRef1.current.position.x = Math.sin(t) * 3;
      lightRef1.current.position.z = Math.cos(t) * 3;
    }
    if (lightRef2.current) {
      lightRef2.current.position.y = Math.sin(t * 0.5) * 3;
      lightRef2.current.position.z = Math.cos(t * 0.5) * 3;
    }
  });

  return (
    <>
      <pointLight ref={lightRef1} color="#ffffff" intensity={20} distance={10} />
      <pointLight ref={lightRef2} color="#c0e0ff" intensity={25} distance={10} />
      <pointLight position={[0, -5, 0]} color="#a0c0ff" intensity={15} distance={10} />
    </>
  );
}

function ResponsiveDroplet() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5; // standard phone width threshold in this fov/camera z setup
  return (
    <group scale={isMobile ? 0.6 : 1}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <GlassDroplet />
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]} // Cap pixel ratio to improve framerate on retina screens
    >
      {/* Faint, sparse, low contrast background stars */}
      <Stars radius={20} depth={10} count={600} factor={2} saturation={0} fade speed={0.2} />
      {/* Slightly brighter but extremely sparse clusters */}
      <Stars radius={15} depth={5} count={150} factor={3} saturation={0} fade speed={0.4} />
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <AnimatedLights />
      
      {/* Shift the environment rotation so the dark city skyline reflects at the bottom, leaving the face clear in the top half */}
      <Environment preset="city" resolution={128} environmentRotation={[Math.PI / 3, 0, 0]} />

      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
      >
        <ResponsiveDroplet />
      </PresentationControls>
    </Canvas>
  );
}
