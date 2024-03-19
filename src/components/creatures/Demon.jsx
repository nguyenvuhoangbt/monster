/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\big\Demon.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/big/Demon.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Demon" geometry={nodes.Demon.geometry} material={materials.Atlas} skeleton={nodes.Demon.skeleton} />
          <skinnedMesh name="Trident" geometry={nodes.Trident.geometry} material={materials.Atlas} skeleton={nodes.Trident.skeleton} />
        </group>
      </group>
    </group>
  )
}

export default Model;

useGLTF.preload('/Demon.gltf')