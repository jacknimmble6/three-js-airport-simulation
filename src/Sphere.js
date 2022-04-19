import { Html } from '@react-three/drei';
import React, { useRef, useState } from 'react'
import { useFrame, useLoader, } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import plane from './plane/scene.glb'
import { Vector3, Quaternion } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
import countryJSON from './countryData.json'

const Sphere = ({ lat1, lng, name, continent, points1 }) => {
  const [show, setShow] = useState(false)
  const [fromCoordinates, setFromCoordinates] = useState({ lat: 12.6345, long: 33.5528 })
  const [toCoordinates, setToCoordinates] = useState({ lat: 62.8206, long: 80.8025 })
  const flightFromRef = useRef()
  const flightToRef = useRef()
  const sphereRef = useRef() 
  const boxRef = useRef()
  const meshRef = useRef()
  const groupRef = useRef()
  const loader = useLoader(GLTFLoader, plane)
  const LEFT = new Vector3(-1, 0, 0)
  const UP = new Vector3(0, 1, 0)

  const rotationQuaternionForCoordinates = (lat2, long2) => {
    const q1 = new Quaternion().setFromAxisAngle(LEFT, degToRad(lat2 - 90))
    const q2 = new Quaternion().setFromAxisAngle(UP, degToRad(long2))
    return q2.multiply(q1)
  }

  const convertCoordinates = () => {     
    let newLat =  lat1 * Math.PI / 180
    let newLong = lng * Math.PI / 180 + Math.PI / 2
    let x = Math.sin(newLong) * Math.cos(newLat)  
    let y = Math.sin(newLong) * Math.sin(newLat)
    let z = Math.cos(newLong)

    return { x, y, z }
  }  

  const changeFrom = () => {

    if (flightFromRef?.current?.value === 'Argentina') {
      setFromCoordinates({ lat: 12.6345, long: 33.5528 })
    }

    if (flightFromRef?.current?.value === 'United States') {
      setFromCoordinates({ lat: 190.6345, long: 169.5528 })
    }

    if (flightFromRef?.current?.value === "Mauritania") {
      setFromCoordinates({ lat: 49.8206, long: 71.8025 })
    }

  }

  const position1 = convertCoordinates()

  const rotationQuaternion = new Quaternion()

  let startQuaternion = rotationQuaternionForCoordinates(fromCoordinates.lat, fromCoordinates.long)
  let endQuaternion = rotationQuaternionForCoordinates(toCoordinates.lat, toCoordinates.long)

  useFrame((state) => {
    sphereRef.current.rotation.z = 3
    sphereRef.current.rotation.x = 1
    meshRef.current.rotation.x = 1
    meshRef.current.rotation.y = 10.2

    if (continent === 'Africa') {
      sphereRef.current.rotation.z = 5.1
      sphereRef.current.rotation.x = -.9
    } 

    if (continent === 'Europe') {
      sphereRef.current.rotation.z = 5.5
      sphereRef.current.rotation.x = -.1
    } 

    if (continent === 'Asia') {
      sphereRef.current.rotation.z = 3.1
      sphereRef.current.rotation.x = 1.9
    }

    if (continent === 'Oceania') {
      sphereRef.current.rotation.z = 5.20
      sphereRef.current.rotation.x = 1.1
    }

    if (name === 'Greenland') { 
      sphereRef.current.rotation.z = 2.85
      sphereRef.current.rotation.x = 0.3
    }

    if (name === 'Poland') { 
      sphereRef.current.rotation.z = 2.85
      sphereRef.current.rotation.x = 0.3
    }

    if (name === 'Saudi Arabia') {
      sphereRef.current.rotation.z = 4
      sphereRef.current.rotation.x = 1.9
    }

    if (name === 'Yemen') {
      sphereRef.current.rotation.z = 4
      sphereRef.current.rotation.x = 1.9
    }

    if (name === 'United Arab Emirates') {
      sphereRef.current.rotation.z = 4
      sphereRef.current.rotation.x = 1.9
    }

    if (name === 'Antarctica') { 
      sphereRef.current.rotation.z = 3
      sphereRef.current.rotation.x = 3.4
    }

    if (continent === 'South America') {
      sphereRef.current.rotation.z = 2.6
      sphereRef.current.rotation.x = 1.5
    }

    if (name === 'Japan') {
      sphereRef.current.rotation.z = 2.5
      sphereRef.current.rotation.x = 2
    }

    if (boxRef.current && meshRef.current) {
      const flightTime = 2
      
      const phase = (state.clock.elapsedTime % flightTime) / flightTime;

      rotationQuaternion.slerpQuaternions(startQuaternion, endQuaternion, phase)
      
      boxRef.current.setRotationFromQuaternion(rotationQuaternion)

    }
  })

  console.log(rotationQuaternion.slerpQuaternions(startQuaternion, endQuaternion, 2))

  const changeShow = () => {
    setShow(!show)
  }

  const handleFlight = () => {
    console.log('From Coordinates - ', fromCoordinates)
    console.log('To Coordinates - ', toCoordinates)
  }  

  const changeTo = () => {

    if (flightToRef?.current?.value === 'Argentina') {
      setToCoordinates({ lat: 12.6345, long: 33.5528 })
    }

    if (flightToRef?.current?.value === 'United States') {
      setToCoordinates({ lat: 190.6345, long: 169.5528 })
    }

    if (flightToRef?.current?.value === "Mauritania") {
      setFromCoordinates({ lat: 49.8206, long: 71.8025 })
    }
  }

  return (
    <>
      <group ref={groupRef}>
        <mesh ref={sphereRef} onClick={changeShow} offset={true} position={[position1.x, position1.y, position1.z]}>
          <cylinderGeometry args={[0.01, .01, .1]} />
          <meshStandardMaterial color={`#4d160f`} metalness={5} />
        </mesh>

        {show === false ? '' : (
          <Html>
            <div className="absolute select-none font-['Roboto'] h-fit text-white 
            bg-[#213d91] w-[450px] top-[-250px] left-[-755px] scrollbar overflow-auto">          
              {countryJSON.filter(c => c.country === name).map((c) => (           
                <div className="h-fit max-h-[580px]">
                  <p className='text-[35px] text-left'>Country: {c.country} </p>
                  <br />
                  <p className='text-[25px] text-left'>Population: {c.population}</p>
                  <br />
                  <p className='text-[25px] text-left'>Happiness Index: {c.happiness}</p>
                  <br />
                  <p className='text-[20px] overflow-auto h-fit text-left'>{c.info}</p>
                </div>                      
              ))}
            </div> 
            
            <div className="absolute font-['Roboto'] select-none text-white bg-[#213d91] 
            w-[450px] top-[-250px] left-[300px]">
              <p className='text-[35px] text-center'>Flights</p>

              <div className='text-left mt-4 text-[25px]'>
                Flight from: 
                <select ref={flightFromRef} onChange={changeFrom} className='text-[25px] w-[270px] bg-transparent 
                border-2 border-t-0 border-l-0 border-r-0 border-b-black ml-8 focus:outline-none'>
                  <option className='text-black'>{name}</option>
                  {points1.filter(c => c.name !== name).map(p => (
                    <option className='text-black' value={p.name}>{p.name}</option>
                  ))}
                </select>
                <p className='mt-2'>Latitude: {fromCoordinates.lat}</p>
                <p className='mt-4'>Longitude: {fromCoordinates.long}</p>
              </div>
              
              
              <div className='text-left mt-4 text-[25px]'>
                Flight to: 
                <select ref={flightToRef} onChange={changeTo} className='text-[25px] w-[270px] bg-transparent 
                border-2 border-t-0 border-l-0 border-r-0 border-b-black ml-16 focus:outline-none'>
                  {points1.map(p => (
                    <option className='text-black' value={p.name}>{p.name}</option>
                  ))}
                </select>
                <div>
                  <p className='mt-2'>Latitude: {toCoordinates.lat}</p>
                  <p className='mt-4'>Longitude: {toCoordinates.long}</p>
                </div>
              </div>
              
              <button className="text-[25px] mt-4" onClick={handleFlight}>Set Flight</button>
            </div>
          </Html>
          )
        }

        <object3D ref={boxRef}>
          <mesh ref={meshRef} position={[-0.11751507260571235, 0.8258517989288553, 0.7710380882213211]}>
            <primitive object={loader.scene} scale={0.0001}/>
          </mesh>
        </object3D>
      </group>
    </>
  )

}

export default Sphere