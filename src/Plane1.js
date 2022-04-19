import React from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import plane from './plane/scene.glb'

const Plane1 = () => {
  const loader = useLoader(GLTFLoader, plane)
  
  return (
    <>
    <object3D>
      <mesh>
        <primitive object={loader.scene} scale={0.01}/>
      </mesh>
    </object3D>
    </>
  )
}

export default Plane1