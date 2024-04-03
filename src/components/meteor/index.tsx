import { MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import { extend, useLoader } from '@react-three/fiber'
import { Vector2 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { data as meteorShaderData } from './meteor-shader'

export const Meteor = () => {
  const gltf = useLoader(GLTFLoader, '/assets/models/meteor.glb')

  const [normalMap] = useTexture(['/assets/textures/meteor_normals.png'])

  return (
    <>
      <mesh geometry={gltf.scene.children[0].geometry}>
        <MeshTransmissionMaterial
          normalMap={normalMap}
          normalScale={new Vector2(0.3, 0.3)}
          roughness={0}
          ior={1.5}
          thickness={0.035}
          transmission={1}
          chromaticAberration={1}
          anisotropy={20}
          distortionScale={0}
          samples={10}
          backside={true}
          color={'#fff'}
          attenuationDistance={0.2}
          attenuationColor={'#e2ae5b'}
          temporalDistortion={0}
        />
      </mesh>

      <mesh
        geometry={gltf.scene.children[0].geometry}
        scale={[1.02, 1.02, 1.02]}
      ></mesh>
    </>
  )
}
