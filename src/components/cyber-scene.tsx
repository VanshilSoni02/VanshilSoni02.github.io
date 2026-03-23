"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import type { Mesh, Group, Vector3 } from "three";
import * as THREE from "three";

// Interactive Data Node - represents data flowing through a network
function DataNode({ 
  position, 
  label, 
  value,
  color = "#c9775a" 
}: { 
  position: [number, number, number]; 
  label: string;
  value: string;
  color?: string;
}) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh 
          ref={meshRef} 
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <dodecahedronGeometry args={[0.4, 0]} />
          <MeshTransmissionMaterial
            color={color}
            thickness={0.5}
            roughness={0.1}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.02}
            backside
          />
        </mesh>
        {/* Data label */}
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.12}
          color={hovered ? "#ffffff" : "#a0a0a0"}
          anchorX="center"
          anchorY="middle"
          font="/fonts/GeistMono-Regular.ttf"
        >
          {label}
        </Text>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.18}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          {value}
        </Text>
      </Float>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 16, 32]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.3} />
      </mesh>
    </group>
  );
}

// Neural Network Connections - visualizes data pathways
function NeuralConnections() {
  const linesRef = useRef<Group>(null);
  
  const points = useMemo(() => {
    const pts: THREE.Vector3[][] = [];
    // Create curved connections between nodes
    const nodes = [
      [-3, 1.5, -2], [3, 0.5, -2], [0, -1, -3], [-2, -1.5, -1], [2.5, 1.8, -1]
    ] as const;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const start = new THREE.Vector3(...nodes[i]);
        const end = new THREE.Vector3(...nodes[j]);
        const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
        mid.z -= 0.5;
        
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        pts.push(curve.getPoints(20));
      }
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        const material = (child as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.15;
      });
    }
  });

  return (
    <group ref={linesRef}>
      {points.map((linePoints, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePoints.length}
              array={new Float32Array(linePoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#5a8c6a" transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}

// Holographic Terminal - displays code snippets
function HolographicTerminal({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const [codeIndex, setCodeIndex] = useState(0);
  
  const codeSnippets = [
    "const build = async () =>",
    "deploy({ env: 'prod' })",
    "await transform(data)",
    "export default App",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((i) => (i + 1) % codeSnippets.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={position} ref={meshRef}>
      {/* Terminal frame */}
      <mesh>
        <boxGeometry args={[2.5, 1.5, 0.05]} />
        <meshStandardMaterial 
          color="#1a1714" 
          metalness={0.9} 
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[2.3, 1.3]} />
        <meshBasicMaterial color="#0a0908" />
      </mesh>
      {/* Code text */}
      <Text
        position={[-1, 0.3, 0.06]}
        fontSize={0.1}
        color="#5a8c6a"
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {">"} {codeSnippets[codeIndex]}
      </Text>
      <Text
        position={[-1, 0.1, 0.06]}
        fontSize={0.08}
        color="#c9775a"
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        // Building digital experiences
      </Text>
      <Text
        position={[-1, -0.1, 0.06]}
        fontSize={0.08}
        color="#666"
        anchorX="left"
        font="/fonts/GeistMono-Regular.ttf"
      >
        status: ready
      </Text>
      {/* Scan line effect */}
      <ScanLine />
    </group>
  );
}

function ScanLine() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.6;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.07]}>
      <planeGeometry args={[2.3, 0.02]} />
      <meshBasicMaterial color="#5a8c6a" transparent opacity={0.3} />
    </mesh>
  );
}

// Cyber Grid Floor with perspective
function CyberGrid() {
  const gridRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }
  });

  const gridShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#c9775a") },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      
      void main() {
        vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
        float line = min(grid.x, grid.y);
        float gridPattern = 1.0 - min(line, 1.0);
        
        float pulse = sin(vUv.y * 10.0 - uTime * 2.0) * 0.5 + 0.5;
        float fade = smoothstep(0.0, 0.5, vUv.y) * (1.0 - smoothstep(0.5, 1.0, vUv.y));
        
        float alpha = gridPattern * 0.15 * fade * (0.5 + pulse * 0.5);
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
  }), []);

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40, 1, 1]} />
      <shaderMaterial {...gridShader} />
    </mesh>
  );
}

// Floating Particles representing data
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorPrimary = new THREE.Color("#c9775a");
    const colorSecondary = new THREE.Color("#5a8c6a");
    const colorAccent = new THREE.Color("#d4c4a8");
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      const colorChoice = Math.random();
      const color = colorChoice < 0.33 ? colorPrimary : colorChoice < 0.66 ? colorSecondary : colorAccent;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors, count };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particles.count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Core Orb - central element
function CoreOrb() {
  const meshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[0, 0, -4]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshTransmissionMaterial
          color="#c9775a"
          thickness={1}
          roughness={0}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.03}
          backside
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.03, 16, 64]} />
        <meshBasicMaterial color="#5a8c6a" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#d4c4a8" transparent opacity={0.4} />
      </mesh>
      <Sparkles count={50} scale={5} size={2} speed={0.5} color="#c9775a" />
    </group>
  );
}

// Mouse follower for interactivity
function MouseFollower() {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.5, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.5, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#c9775a" transparent opacity={0.5} />
    </mesh>
  );
}

export default function CyberScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#c9775a" />
          <pointLight position={[-10, -5, -10]} intensity={0.4} color="#5a8c6a" />
          <spotLight position={[0, 15, 5]} intensity={0.5} color="#d4c4a8" angle={0.4} penumbra={1} />
          
          {/* Data visualization nodes */}
          <DataNode position={[-3, 1.5, -2]} label="PROJECTS" value="20+" color="#c9775a" />
          <DataNode position={[3, 0.5, -2]} label="EXPERIENCE" value="5 YRS" color="#5a8c6a" />
          <DataNode position={[0, -1, -3]} label="TECH STACK" value="15+" color="#d4c4a8" />
          
          {/* Neural connections */}
          <NeuralConnections />
          
          {/* Holographic terminal */}
          <HolographicTerminal position={[-4, -0.5, 0]} />
          
          {/* Core visualization */}
          <CoreOrb />
          
          {/* Environment */}
          <CyberGrid />
          <DataParticles />
          
          {/* Interactive cursor */}
          <MouseFollower />
        </Suspense>
      </Canvas>
    </div>
  );
}
