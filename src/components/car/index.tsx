import React, { useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Mesh } from 'three'

export const Car = () => {
  const gltf = useLoader(GLTFLoader, '/models/car/scene.gltf')

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005)
    gltf.scene.position.set(0, -0.035, 0)
    gltf.scene.traverse(
      (object: {
        castShadow: boolean
        receiveShadow: boolean
        material: { envMapIntensity: number }
      }) => {
        if (object instanceof Mesh) {
          object.castShadow = true
          object.receiveShadow = true
          object.material.envMapIntensity = 20
        }
      }
    )
  }, [gltf])

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime()

    let group = gltf.scene.children[0].children[0].children[0]

    const indexRim = [0, 2, 4, 6]
    indexRim.forEach((i: number) => {
      group.children[i].rotation.x = t * 2
    })
  })

  return <primitive object={gltf.scene} />
}
