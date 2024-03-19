import * as THREE from 'three'
import Dragon_Evolved from './creatures/Dragon_Evolved'
import Pigeon from './creatures/Pigeon'
import Tribal from './creatures/Tribal'
import { useState, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from '@react-three/drei'

export const Experience = () => {
  const [active, setActive] = useState(null)
  const [hover, setHover] = useState(null)
  useCursor(hover)
  const controlsRef = useRef()
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(active).getWorldPosition(targetPosition)
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      )
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true)
    }
  }, [active])

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset='sunset' />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={1.8}
        minPolarAngle={1.2}
      />

      <MonsterStage
        texture={'textures/forest.jpg'}
        name='Tribal'
        color='#509b40'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Tribal scale={0.42} position-y={-0.9} hover={hover === 'Tribal'}/>
      </MonsterStage>

      <MonsterStage
        texture={'textures/occean.jpg'}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        name='Pigeon'
        color='#9c6fc7'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Pigeon scale={0.5} position-y={-1.25} hover={hover === 'Pigeon'} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/sky.jpg'}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        name='Dragon'
        color='#d07d41'
        active={active}
        setActive={setActive}
        hover={hover}
        setHover={setHover}
      >
        <Dragon_Evolved scale={0.5} position-y={-1} hover={hover === 'Dragon'}  />
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
          <ambientLight intensity={1} />
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
