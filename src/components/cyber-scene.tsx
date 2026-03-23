"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, Group } from "three";

function FloatingGeometry({ position, scale, color, speed = 1, distort = 0.3 }: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function WireframeTorus({ position, scale, color }: {
  position: [number, number, number];
  scale: number;
  color: string;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshStandardMaterial color={color} wireframe metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

function OctahedronCluster() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]} scale={0.4}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#c9775a" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[1.5, 0.5, -1]} scale={0.25}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#5a8c6a" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[-1.2, -0.3, 0.5]} scale={0.2}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#d4c4a8" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshStandardMaterial color="#1a1714" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

export default function CyberScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#c9775a" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5a8c6a" />
          <spotLight position={[0, 10, 0]} intensity={0.8} color="#d4c4a8" angle={0.5} />
          
          <FloatingGeometry position={[-4, 2, -2]} scale={1.2} color="#c9775a" speed={0.8} distort={0.4} />
          <FloatingGeometry position={[4, -1, -3]} scale={0.8} color="#5a8c6a" speed={1.2} distort={0.3} />
          <FloatingGeometry position={[2, 3, -4]} scale={0.6} color="#d4c4a8" speed={1} distort={0.2} />
          
          <WireframeTorus position={[-3, -2, -2]} scale={0.8} color="#c9775a" />
          <WireframeTorus position={[5, 1, -5]} scale={1.2} color="#5a8c6a" />
          
          <OctahedronCluster />
          <GridFloor />
        </Suspense>
      </Canvas>
    </div>
  );
}
