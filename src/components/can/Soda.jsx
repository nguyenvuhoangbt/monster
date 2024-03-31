/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\soda-can\soda.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials, animations } = useGLTF('/models/can/soda.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Green_tea_3.geometry} material={materials['default']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

export default Model;

useGLTF.preload('/soda.gltf')
