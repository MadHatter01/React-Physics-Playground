'use client';
import React, {useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


const Sphere = () =>{
    const ref = useRef();
    useFrame((state, delta)=>{
        ref.current.position.x += (state.mouse.x*delta)/2;
        ref.current.position.y += (state.mouse.y * delta)/2;
    })
    
    console.log(ref.current)
    return (
        <mesh ref={ref}>
            <sphereGeometry args = {[1,32,32]} />
            <meshStandardMaterial color="orange" wireframe/>
        </mesh>
    )
}

const Game = () => {
  return (
  <Canvas>
    <ambientLight />
    <pointLight position={[10,10,10]} />
    <OrbitControls />
    <Sphere />
  </Canvas>
  )
}

export default Game