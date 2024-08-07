'use client'
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
function Plane() {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}

function FallingBox() {
  const [ref] = useBox(() => ({
    mass: 5,
    position: [Math.random() * 2 - 1, 5, Math.random() * 2 - 1], 
    args:[0.5,0.5,0.5] //if i don't add this, there's a gap visible because of the collisiony
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Game() {
  const fallingBoxes = React.useRef([]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      fallingBoxes.current.push(<FallingBox key={i} />);
    }
  }, []);

  return (
    <Canvas style={{ height: '100vh', width: '100vw', background: 'lightgray' }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <Physics>
        <OrbitControls />
        <Plane />
        {fallingBoxes.current}
      </Physics>
    </Canvas>
  );
}

export default Game;
