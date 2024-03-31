import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import Soda from '@/components/can/Soda'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import {
  CameraControls,
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { attach } from '@react-three/fiber/dist/declarations/src/core/utils'
import { Ground } from './scenes/Ground'
import { Car } from './car'
import { Rings } from './rings'
import { Boxes } from './boxes'
import { FloatingGrid } from './floating-grid'
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export const Experience = () => {
  const controlsRef = useRef<CameraControls | null>(null)

  // const scene = useThree((state) => state.scene)

  // useEffect(() => {
  //   ;(async () => {
  //     //Put your logic here
  //     const scene = new THREE.Scene() // container

  //     const camera = new THREE.PerspectiveCamera(
  //       75,
  //       window.innerWidth / window.innerHeight,
  //       0.1,
  //       1000
  //     )
  //     const renderer = new THREE.WebGLRenderer({
  //       canvas: document.querySelector('#bg') as HTMLCanvasElement, // Use querySelector with type assertion
  //     })

  //     renderer.setPixelRatio(window.devicePixelRatio)
  //     renderer.setSize(window.innerWidth, window.innerHeight)
  //     camera.position.setZ(30)

  //     renderer.render(scene, camera) // draw

  //     const pointLight = new THREE.PointLight(0xffffff)
  //     pointLight.position.set(5, 5, 5)

  //     const ambientLight = new THREE.AmbientLight(0xffffff)
  //     scene.add(ambientLight, pointLight)

  //     const controls = new OrbitControls(camera, renderer.domElement)

  //     const spaceTexture = new THREE.TextureLoader().load('./space.jpg')
  //     scene.background = spaceTexture

  //     const sodaCan = new GLTFLoader()

  //     // Load a glTF resource
  //     sodaCan.load(
  //       // resource URL
  //       './models/can/soda.gltf',
  //       // called when the resource is loaded
  //       function (gltf) {
  //         scene.add(gltf.scene)

  //         // gltf.animations // Array<THREE.AnimationClip>
  //         // gltf.scene // THREE.Group
  //         // gltf.scenes // Array<THREE.Group>
  //         // gltf.cameras // Array<THREE.Camera>
  //         // gltf.asset // Object
  //       }
  //     )
  //     // sodaCan.rotation.y += 0.01

  //     const animate = () => {
  //       requestAnimationFrame(animate)

  //       renderer.render(scene, camera)
  //     }
  //     animate()

  //     const onWindowResize = () => {
  //       camera.aspect = window.innerWidth / window.innerHeight
  //       camera.updateProjectionMatrix()

  //       controls.update()

  //       renderer.setSize(window.innerWidth, window.innerHeight)
  //     }
  //     window.addEventListener('resize', onWindowResize, false)

  //     // Cleanup function to handle component unmounting
  //     return () => {
  //       // Cleanup code if needed
  //     }
  //   })()
  // }, []) // Empty dependency array to run once on mount

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
