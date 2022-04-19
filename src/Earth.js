import { Html, OrbitControls, Stars } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'
import { TextureLoader } from 'three'
import earthAtmos from './textures/earth_atmos_4096.jpg'
import normal from './textures/earth_normal_2048.jpg'
import specular from './textures/earth_specular_2048.jpg'
import newCloud from './textures/earth_clouds_2048.png'
import * as THREE from 'three'

const Earth = () => {
  const [cloudMap, atmos, specularMap, normalMap] = useLoader(TextureLoader, [newCloud, earthAtmos, specular, normal])
  const earthRef = useRef()
  const cloudRef = useRef()
  const lightRef = useRef()
  const flightContainerRef = useRef()
   
  useFrame(() => {
    lightRef.current.position.x = 500 * Math.sin(Date.now() / 1200)
    lightRef.current.position.z = 500 * Math.cos(Date.now() / 1200)  

    const worldPositionBefore = flightContainerRef.current.getWorldPosition(new THREE.Vector3());

    flightContainerRef.current.lookAt(worldPositionBefore);
    flightContainerRef.current.rotation.z = 0;
  })

  const v = new THREE.Vector2(0.85, -0.85)
  
  return (
    <>
      <directionalLight ref={lightRef} color="#ffffff" position={[-1, 0, 1]} />
      <ambientLight color="#faf3de" intensity={0.3} />
      <Stars count={25000} radius={400} />
      <group ref={flightContainerRef}>
        <mesh ref={cloudRef} position={[0, 0, 0]}>
          <sphereGeometry args={[ 1, 30, 30 ]} />
          <meshPhongMaterial map={cloudMap} opacity={0.1} depthWrite={true} 
          transparent={true} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={earthRef} position={[0, 0, 0]}>
          <sphereGeometry args={[ 1, 30, 30 ]} />
          <meshPhongMaterial specular={0x333333} normalScale={v} specularMap={specularMap} 
          normalMap={normalMap} shininess={15} map={atmos} />
        </mesh>
      </group>
      <OrbitControls />
      <Html>
        <p className="absolute font-['Roboto'] left-[-755px] select-none -top-[350px] text-white w-[425px]">
          Click off marker when done viewing so data doesn't overlap.
        </p>
      </Html>
    </> 
  )
}

export default Earth