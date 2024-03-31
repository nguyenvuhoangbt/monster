import { useFrame } from '@react-three/fiber'
import React, { Ref, useEffect, useRef, useState } from 'react'
import { Mesh, Color, BoxGeometry, MeshStandardMaterial, Vector3 } from 'three'

type MeshRef = Ref<Mesh<BoxGeometry, MeshStandardMaterial>>

const getInitialPosition = () => {
  let v = new Vector3(
    (Math.random() * 2 - 1) * 3,
    Math.random() * 2.5 + 0.1,
    (Math.random() * 2 - 1) * 15
  )
  if (v.x < 0) v.x -= 1.75
  if (v.x > 0) v.x += 1.75
  return v
}

const Box = ({ color }: { color: Color }) => {
  const box = useRef<Mesh<BoxGeometry, MeshStandardMaterial> | undefined>()
  const time = useRef(0)
  const [xRotSpeed, _setXRotSpeed] = useState<number>(() => Math.random())
  const [yRotSpeed, _setYRotSpeed] = useState<number>(() => Math.random())
  const [scale] = useState(() => Math.pow(Math.random(), 2) * 0.5 + 0.05)
  const [position, setPosition] = useState<Vector3>(() => getInitialPosition())

  const resetPosition = () => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    )
    if (v.x < 0) v.x -= 1.75
    if (v.x > 0) v.x += 1.75
    setPosition(v)
  }

  useFrame((_state, delta) => {
    time.current += delta * 1.2
    let newZ = position.z - time.current

    if (newZ < -10) {
      resetPosition()
      time.current = 0
    }

    box.current?.position.set(position.x, position.y, newZ)
    box.current!.rotation.x += delta * xRotSpeed
    box.current!.rotation.y += delta * yRotSpeed
  })

  return (
    <mesh ref={box as MeshRef} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  )
}

export const Boxes = () => {
  return (
    <>
      {Array(100)
        .fill(0)
        .map((e, i) => (
          <Box
            key={i}
            color={
              i % 2 ? new Color(0.05, 0.15, 0.4) : new Color(0.4, 0.1, 0.1)
            }
          />
        ))}
    </>
  )
}
