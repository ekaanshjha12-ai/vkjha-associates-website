"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function GoldKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[2.2, 0.3, -1]} scale={1.6}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#d9c6a5"
          roughness={0.15}
          metalness={0.6}
          distort={0.18}
          speed={1.2}
        />
      </mesh>
    </Float>
  );
}

function SageSphere() {
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh position={[4.6, -1, -2.5]} scale={0.7}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial color="#b8d8d8" roughness={0.25} metalness={0.3} distort={0.3} speed={0.8} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} color="#fff8ec" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#b8d8d8" />
      <GoldKnot />
      <SageSphere />
      <Environment preset="studio" />
    </Canvas>
  );
}
