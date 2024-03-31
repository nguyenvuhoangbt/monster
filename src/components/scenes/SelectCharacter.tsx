import * as THREE from 'three'
import Cleric from '@/components/characters/Cleric'
import Warrior from '@/components/characters/Warrior'
import Monk from '@/components/characters/Monk'
import Ranger from '@/components/characters/Ranger'
import Rogue from '@/components/characters/Rogue'
import Wizard from '@/components/characters/Wizard'
import { useState, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import {
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
  CameraControls,
} from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const SelectCharacter = () => {
  const [active, setActive] = useState(null)
  const [hover, setHover] = useState(null)
  useCursor(hover)
  const controlsRef = useRef<OrbitControls | null>(null)
  const scene = useThree((state) => state.scene)

  // useEffect(() => {
  //   if (active) {
  //     const targetPosition = new THREE.Vector3()
  //     scene.getObjectByName(active)?.getWorldPosition(targetPosition)

  //     console.log(targetPosition)

  //     // if (controlsRef.current) {
  //     //   const { target } = controlsRef.current
  //     //   target.copy(targetPosition)

  //     //   const distance = Math.max(target.x, target.y, target.z) * 2

  //     //   const cameraTarget = targetPosition.clone()
  //     //   const cameraPosition = cameraTarget
  //     //     .clone()
  //     //     .add(new THREE.Vector3(distance, distance, distance))

  //     //   controlsRef.current?.update()
  //     // }

  //     // controlsRef.current?.setLookAt(
  //     //   0,
  //     //   0,
  //     //   5,
  //     //   targetPosition.x,
  //     //   targetPosition.y,
  //     //   targetPosition.z,
  //     //   true
  //     // )
  //   } else {
  //     controlsRef.current.setLookAt(0, 0, 12, 0, 0, 0, true)
  //   }
  // }, [active])

  return (
    <>
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={1.8}
        minPolarAngle={1.2}
      />
      <MonsterStage
        texture={'textures/forest.jpg'}
        position-y={1.6}
        name='Warrior'
        color='#509b40'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Warrior scale={0.5} position-y={-0.85} hover={hover === 'Warrior'} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/forest.jpg'}
        position-y={-1.6}
        name='Cleric'
        color='#509b40'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Cleric scale={0.5} position-y={-0.85} hover={hover === 'Cleric'} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/sky.jpg'}
        position-x={2.5}
        position-y={1.6}
        name='Monk'
        color='#d07d41'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Monk scale={0.5} position-y={-0.85} hover={hover === 'Monk'} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/sky.jpg'}
        position-x={2.5}
        position-y={-1.6}
        name='Ranger'
        color='#d07d41'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Ranger scale={0.5} position-y={-0.85} hover={hover === 'Ranger'} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/occean.jpg'}
        position-x={-2.5}
        position-y={1.6}
        name='Rogue'
        color='#9c6fc7'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Rogue scale={0.5} position-y={-0.85} hover={hover === 'Rogue'} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/occean.jpg'}
        position-x={-2.5}
        position-y={-1.6}
        name='Wizard'
        color='#9c6fc7'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Wizard scale={0.5} position-y={-0.85} hover={hover === 'Wizard'} />
      </MonsterStage>
    </>
  )
}

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hover,
  setHover,
  ...props
}) => {
  const map = useTexture(texture)
  const portalMaterial = useRef()

  useFrame((_state, delta) => {
    const worldOpen = active === name
    easing.damp(portalMaterial.current, 'blend', worldOpen ? 1 : 0, 0.2, delta)
  })

  return (
    <group {...props}>
      <Text
        font='fonts/Itim-Regular.ttf'
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={'bottom'}
        outlineWidth={0.03}
        outlineColor={'white'}
        letterSpacing={0.05}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHover(name)}
        onPointerLeave={() => setHover(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={0.5} />
          <Environment preset='sunset' />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}
