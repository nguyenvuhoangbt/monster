import { MeshReflectorMaterial } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect } from 'react'
import {
  LinearSRGBColorSpace,
  RepeatWrapping,
  TextureLoader,
  Vector2,
} from 'three'

export const Ground = () => {
  const [roughness, normal] = useLoader(TextureLoader, [
    '/textures/terrain-roughness.jpg',
    '/textures/terrain-normal.jpg',
  ])

  useEffect(() => {
    ;[normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping
      t.wrapT = RepeatWrapping
      t.repeat.set(5, 5)
      // t.offset.set(0, 0)
    })

    // normal.encoding = LinearSRGBColorSpace
  }, [normal, roughness])

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime() * 0.128
    roughness.offset.set(0, t)
    normal.offset.set(0, t)
  })

  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        roughnessMap={roughness}
        normalScale={new Vector2(0.15, 0.15)}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.2}
      />
    </mesh>
  )
}
