/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\characters\Warrior\Warrior.gltf 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model({ hover, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/models/characters/Warrior.gltf'
  )
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const anim = hover ? 'Walk' : 'Idle'
    actions[anim].reset().fadeIn(0.5).play()
    return () => actions[anim].fadeOut(0.5)
  }, [hover])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group
          name='CharacterArmature'
          position={[0.12, -0.247, -0.125]}
          rotation={[0.247, -0.86, 0.176]}
        >
          <primitive object={nodes.Root} />
          <skinnedMesh
            name='Warrior_Body'
            geometry={nodes.Warrior_Body.geometry}
            material={materials.Warrior_Texture}
            skeleton={nodes.Warrior_Body.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

export default Model
useGLTF.preload('/models/characters/Warrior.gltf')
