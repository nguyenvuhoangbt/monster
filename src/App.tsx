import { Suspense } from 'react'
import { CarDemo } from '@/components/scenes/car-demo'
import { FloatingPortals } from '@/components/scenes/floating-portals'
import { SceneMeteor } from '@/components/scenes/meteor'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <Suspense fallback={null}>
      <CarDemo />
      {/* <FloatingPortals /> */}
      {/* <Canvas>
        <SceneMeteor />
      </Canvas> */}
    </Suspense>
  )
}

export default App
