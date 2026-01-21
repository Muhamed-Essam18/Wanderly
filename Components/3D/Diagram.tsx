import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Earth() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load("/imgs/earthTexture.jpg")}
      />
    </mesh>
  );
}

export default function Globe() {
  return (
    <Canvas
      style={{ height: 500 }}
      camera={{
        fov: 30,
        position: [0, 0, 5],
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 2]} />
      <Earth />
    </Canvas>
  );
}
