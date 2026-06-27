'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const SHARD_COUNT = 250;

export default function GlassDroplet() {
  const groupRef = useRef();
  const mainMeshRef = useRef();
  const shardsRef = useRef();
  const portraitRef = useRef();
  
  // Load the portrait texture
  const profileTexture = useTexture('/profile.png');
  
  // Base positions and explosion velocities for shards
  const shardData = useMemo(() => {
    const data = [];
    for (let i = 0; i < SHARD_COUNT; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / SHARD_COUNT);
      const theta = Math.sqrt(SHARD_COUNT * Math.PI) * phi;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      
      const velocity = new THREE.Vector3(x, y, z)
        .add(new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).multiplyScalar(0.5))
        .normalize()
        .multiplyScalar(Math.random() * 4 + 2); // Stronger explosion speed

      const rotation = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      data.push({ position: new THREE.Vector3(x, y, z), velocity, rotation });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const scrollY = window.scrollY || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Peaks exactly in the middle of the page (around Skills/Experience)
    const explodeFactor = Math.sin(progress * Math.PI);
    // Widen the bell curve so it shatters smoothly over a longer scroll distance
    const intensity = Math.pow(explodeFactor, 2);

    if (groupRef.current) {
      // Smooth parallax on the entire group
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 0.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.pointer.y * 0.5, 0.05);
    }

    if (mainMeshRef.current) {
      mainMeshRef.current.rotation.x += delta * 0.1;
      mainMeshRef.current.rotation.y += delta * 0.15;
      
      // The bubble "pops" as soon as intensity is noticeable, without wobbling
      mainMeshRef.current.visible = intensity < 0.05;
      
      // Expand slightly like a balloon right before it pops
      if (intensity > 0 && intensity < 0.05) {
        const expand = 1 + (intensity * 2);
        mainMeshRef.current.scale.set(expand, expand, expand);
      } else {
        mainMeshRef.current.scale.set(1, 1, 1);
      }
    }
    
    if (portraitRef.current) {
      // Fade out portrait as soon as scroll starts
      const portraitOpacity = Math.max(0, 1 - (intensity * 20));
      portraitRef.current.material.opacity = portraitOpacity;
      portraitRef.current.visible = portraitOpacity > 0.01;
      
      // Make portrait always face the camera
      portraitRef.current.quaternion.copy(state.camera.quaternion);
    }

    if (shardsRef.current) {
      shardsRef.current.visible = intensity >= 0.05;
      
      // Smooth easing curve (syncs smoothly with scroll for slow-mo control)
      const burst = Math.pow(intensity, 1.5);
      
      for (let i = 0; i < SHARD_COUNT; i++) {
        const data = shardData[i];
        
        // Start droplets from the surface of the main bubble
        const startPos = new THREE.Vector3().copy(data.position).normalize();
        
        // Explosive motion with gravity, synced to scroll
        const currentPos = new THREE.Vector3().copy(startPos)
          .add(new THREE.Vector3().copy(data.velocity).multiplyScalar(burst * 1.5));
        
        // Add realistic gravity as they disperse
        currentPos.y -= burst * burst * 1.5;
        
        dummy.position.copy(currentPos);
        
        // Liquid tearing/stretching effect: align droplets to their velocity vector
        lookTarget.copy(currentPos).add(data.velocity);
        dummy.lookAt(lookTarget);
        
        // Base scale scales down as they evaporate/disperse
        const baseScale = Math.max(0.001, 1 - intensity);
        
        // Stretch along Z axis (velocity vector) based on the burst speed
        // to mimic liquid surface tension tearing apart, then pull back into spheres.
        const stretch = 1 + (burst * 4 * (1 - burst)); 
        
        dummy.scale.set(baseScale, baseScale, baseScale * stretch);

        dummy.updateMatrix();
        shardsRef.current.setMatrixAt(i, dummy.matrix);
      }
      shardsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Portrait Inside the Bubble (Zoomed in heavily, shifted UP to prevent the bottom cropped edge of the photo from poking out of the sphere) */}
      <mesh ref={portraitRef} position={[0, 0.4, 0]}>
        <planeGeometry args={[2.6 * (profileTexture.image?.width / profileTexture.image?.height || 0.75), 2.6]} />
        <meshBasicMaterial map={profileTexture} transparent opacity={1} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      <mesh ref={mainMeshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          thickness={0.05}
          chromaticAberration={0}
          anisotropy={0}
          distortion={0.05}
          distortionScale={0.1}
          temporalDistortion={0.02}
          clearcoat={1}
          roughness={0}
          transmission={1}
          ior={1.02}
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={2}
          resolution={2048}
          samples={16}
        />
      </mesh>

      <instancedMesh ref={shardsRef} args={[null, null, SHARD_COUNT]}>
        {/* Realistic water droplets using the same advanced glass shader */}
        <sphereGeometry args={[0.08, 16, 16]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          chromaticAberration={0.04}
          anisotropy={0.1}
          clearcoat={1}
          roughness={0}
          transmission={1}
          ior={1.33} // IOR of water
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={2}
          resolution={128} // Low resolution to maintain 60FPS
        />
      </instancedMesh>
    </group>
  );
}
