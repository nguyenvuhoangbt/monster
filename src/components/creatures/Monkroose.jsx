/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\big\Monkroose.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/big/Monkroose.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Monkroose" geometry={nodes.Monkroose.geometry} material={materials.Material} skeleton={nodes.Monkroose.skeleton} />
        </group>
      </group>
    </group>
  )
}

export default Model;

useGLTF.preload('/Monkroose.gltf')
