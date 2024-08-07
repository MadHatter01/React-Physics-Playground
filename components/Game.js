'use client'
import React, { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
function Plane({position, rotation, shake}) {
  const [ref, api] = usePlane(() => ({
    position: position, //[0, 0, 0],
    rotation: rotation, //[-Math.PI / 2, 0, 0],
    mass:0,
  }));


  useFrame(()=>{
    api.position.set(position[0], position[1], position[2]);
    if(shake){
        const shakeOffset = 1;
        const xShake = (Math.random() - 0.5) * shakeOffset;
        const zShake = (Math.random() - 0.5) *shakeOffset;
        const yShake = (Math.random() - 0.5) *shakeOffset;

        api.position.set(position[0]+xShake, position[1]+yShake, position[2]+zShake)

    }
  })
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}

function FallingBox() {
  const [ref] = useBox(() => ({
    mass: 1,
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
  const [planePos, setPlanePos] = useState([0,0,0]);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      fallingBoxes.current.push(<FallingBox key={i} />);
    }
  }, []);


  const handleMouse = (event)=>{
    const {clientX, clientY} = event;
    const x = (clientX/window.innerWidth) * 2 -1;
    const y = -(clientY/window.innerHeight)*2 + 1;
    console.log(x, y)
    setPlanePos([x*10, y*10 , y*10])
    
  }

  const handleKeyDown = (event)=>{
    console.log(event.key)
    if(event.key == 'ArrowDown'){
        setShake(true);
        setTimeout(() => {
            setShake(false);
        }, 200);
    }
  }

  useEffect(()=>{
    
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('keydown', handleKeyDown);
    return ()=>{
        window.removeEventListener('mousemove', handleMouse);
        window.removeEventListener('keydown', handleKeyDown);

    }
  }, [])



  return (
    <Canvas style={{ height: '100vh', width: '100vw', background: 'lightgray' }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <Physics>
        <OrbitControls />
        <Plane  position={planePos} rotation={[-Math.PI/2, 0, 0]} shake={shake}/>
        {fallingBoxes.current}
      </Physics>
    </Canvas>
  );
}

export default Game;
