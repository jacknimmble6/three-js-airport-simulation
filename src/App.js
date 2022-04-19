import './App.css';
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Earth from './Earth'
import './index.css'
import Spheres from './Spheres'

const App = () => {
  
  return (
    <div className="App">
      <Canvas camera={{ fov: 25, position: [6, 0, 3]}}>
        <Suspense fallback={null}>
          <Earth />
          <Spheres />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
