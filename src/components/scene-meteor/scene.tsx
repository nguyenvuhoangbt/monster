import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { BufferGeometry, Mesh, NormalBufferAttributes, Texture } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const Scene = () => {
  const gltf = useLoader(GLTFLoader, '/assets/models/scene.glb')

  const geoObjects: {
    geometry: BufferGeometry<NormalBufferAttributes>
    texture: Texture | null
  }[] = []

  gltf.scene.children.forEach((e: Mesh) => {
    const { name, geometry } = e

    geoObjects.push({
      geometry: geometry,
      texture:
        name === 'astronauts_visors'
          ? null
          : useTexture(`/assets/textures/${name}.png`),
    })
  })

  return (
    <>
      {geoObjects.map((v, i) => (
        <mesh key={i} geometry={v.geometry}>
          {v.texture ? (
            <meshBasicMaterial map={v.texture} />
          ) : (
            <meshStandardMaterial
              roughness={0}
              metalness={1}
              color={'#b68432'}
            />
          )}
        </mesh>
      ))}
    </>
  )
}
