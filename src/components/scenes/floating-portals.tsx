import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  // SpotLight,
} from '@react-three/drei'
import { Suspense } from 'react'
import { FloatingIsland } from '@/components/floating-island'
import { Portal } from '@/components/portal'
import { FloatingRock } from '@/components/floating-rock'
import { Words } from '@/components/words'
import { Rocks } from '@/components/rocks'
import { Grass } from '@/components/grass'
import { Trees } from '@/components/trees'
import { SceneParticles } from '@/components/scene-particles'
import {
  BrightnessContrast,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  GodRays,
  HueSaturation,
} from '@react-three/postprocessing'
import {
  Color,
  ColorRepresentation,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  Vector2,
} from 'three'
import { BlendFunction, Resolution, KernelSize } from 'postprocessing'

const lightColor = new Color(1, 0.2, 0.1)
let mesh = new Mesh(
  new CylinderGeometry(0.3, 0.3, 0.2, 20),
  new MeshBasicMaterial({
    color: lightColor,
    transparent: true,
    opacity: 1,
  })
)
mesh.rotation.x = Math.PI * 0.5
mesh.position.set(1.17, 10.7, -4.1)
mesh.scale.set(1.5, 1, 1)

export const FloatingPortals = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Environment background={'only'} files={'/textures/bg.hdr'} />
        <Environment background={false} files={'/textures/envmap.hdr'} />

        <PerspectiveCamera
          makeDefault
          fov={50}
          position={[-1.75, 10.85, 20.35]}
        />
        <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5} />

        <Float speed={0.5} rotationIntensity={0.6} floatIntensity={0.6}>
          <primitive object={mesh} />
          <spotLight
            penumbra={1}
            distance={500}
            angle={60.65}
            intensity={0.3}
            color={lightColor}
            position={[1.19, 10.85, -4.45]}
            target-position={[0, 0, -1]}
          />

          <Portal />
          <FloatingIsland />
          <Trees />
          <Rocks />
          <Grass />
          <Words />
          <SceneParticles />
        </Float>

        <FloatingRock />

        <EffectComposer stencilBuffer={true}>
          <DepthOfField
            focusDistance={0.012}
            focalLength={0.015}
            bokehScale={7}
          />
          <HueSaturation hue={0} saturation={-0.15} />
          <BrightnessContrast brightness={0.0} contrast={0.035} />
          {/* <ChromaticAberration
            radialModulation={true}
            offset={[0.00175, 0.00175]}
          /> */}
          <GodRays
            sun={mesh}
            blendFunction={BlendFunction.SCREEN}
            samples={40}
            density={0.97}
            decay={0.97}
            weight={0.6}
            exposure={0.3}
            clampMax={1}
            width={Resolution.AUTO_SIZE}
            height={Resolution.AUTO_SIZE}
            kernelSize={KernelSize.SMALL}
            blur={true}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}