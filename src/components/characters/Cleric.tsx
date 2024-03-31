/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\characters\Cleric.gltf 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model({ hover, active, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/models/characters/Cleric.gltf'
  )
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const anim = active ? 'Walk' : 'Idle'
    actions[anim].reset().fadeIn(0.5).play()
    return () => actions[anim].fadeOut(0.5)
  }, [active])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='CharacterArmature'>
          <primitive object={nodes.Root} />
          {/* <primitive object={nodes.FootR} />
          <primitive object={nodes.FootR_end} /> */}
          <skinnedMesh
            name='Cleric'
            geometry={nodes.Cleric.geometry}
            material={materials.Cleric_Texture}
            skeleton={nodes.Cleric.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

export default Model

useGLTF.preload('/models/characters/Cleric.gltf')
