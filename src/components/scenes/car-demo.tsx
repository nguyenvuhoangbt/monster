import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Ground } from '@/components/ground'
import { Car } from '@/components/car'
import { Rings } from '@/components/rings'
import { Boxes } from '@/components/boxes'
import { FloatingGrid } from '@/components/floating-grid'
import { BlendFunction } from 'postprocessing'
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from '@react-three/postprocessing'

export const CarDemo = () => {
  const CarShow = () => {
    return (
      <>
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

        <color args={[0, 0, 0]} attach='background' />

        <CubeCamera resolution={256} frames={Infinity}>
          {/* @ts-ignore */}
          {(texture) => (
            <>
              <Environment map={texture} />
              <Car />
            </>
          )}
        </CubeCamera>

        <spotLight
          color={[1, 0.25, 0.7]}
          intensity={1.5}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />

        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={2}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />

        <Ground />

        <Rings />

        <Boxes />

        <FloatingGrid />

        <EffectComposer>
          <DepthOfField
            focusDistance={0.0035}
            focalLength={0.01}
            bokehScale={0.05}
            height={480}
          />
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.3}
            width={300}
            height={300}
            kernelSize={5}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.025}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0005, 0.0012)}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </>
    )
  }

  return (
    <Canvas
      shadows
      camera={{ fov: 25, near: 0.1, far: 1000, position: [0, 10, 100] }}
    >
      {/* <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} color={0xfffaad} />
      <group position={[0, -10, 0]}>
        <Soda />
      </group> */}
      <CarShow />
    </Canvas>
  )
}
