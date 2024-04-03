import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { simpleNoise } from './simpleNoise'

export const Grass = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return

    // Constants
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight

    // Scene, camera, renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000)
    camera.position.set(8, 5, 3)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    canvasRef.current.appendChild(renderer.domElement)

    // Orbit Controls
    controlsRef.current = new OrbitControls(camera, renderer.domElement)

    // Clock
    const clock = new THREE.Clock()

    // Material
    const vertexShader = `
    varying vec2 vUv;
    uniform float time;
    
    ${simpleNoise}
    
    void main() {
  
      vUv = uv;
      float t = time * 2.;
      
      // VERTEX POSITION
      
      vec4 mvPosition = vec4( position, 1.0 );
      #ifdef USE_INSTANCING
        mvPosition = instanceMatrix * mvPosition;
      #endif
      
      // DISPLACEMENT
      
      float noise = smoothNoise(mvPosition.xz * 0.5 + vec2(0., t));
      noise = pow(noise * 0.5 + 0.5, 2.) * 2.;
      
      // here the displacement is made stronger on the blades tips.
      float dispPower = 1. - cos( uv.y * 3.1416 * 0.5 );
      
      float displacement = noise * ( 0.3 * dispPower );
      mvPosition.z -= displacement;
      
      //
      
      vec4 modelViewPosition = modelViewMatrix * mvPosition;
      gl_Position = projectionMatrix * modelViewPosition;
  
    }
  `

    const fragmentShader = `
  varying vec2 vUv;
  
  void main() {
  	vec3 baseColor = vec3( 0.41, 1.0, 0.5 );
    float clarity = ( vUv.y * 0.875 ) + 0.125;
    gl_FragColor = vec4( baseColor * clarity, 1 );
  }
`

    const uniforms = {
      time: { value: 0 },
    }

    const leavesMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    })

    // Mesh
    const instanceNumber = 5000
    const dummy = new THREE.Object3D()
    const geometry = new THREE.PlaneGeometry(0.1, 1, 1, 4)
    geometry.translate(0, 0.5, 0)
    const instancedMesh = new THREE.InstancedMesh(
      geometry,
      leavesMaterial,
      instanceNumber
    )
    scene.add(instancedMesh)

    // Position and scale the grass blade instances randomly.
    for (let i = 0; i < instanceNumber; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 10,
        0,
        (Math.random() - 0.5) * 10
      )

      dummy.scale.setScalar(0.5 + Math.random() * 0.5)
      dummy.rotation.y = Math.random() * Math.PI

      dummy.updateMatrix()
      instancedMesh.setMatrixAt(i, dummy.matrix)
    }

    // Animation
    const animate = function () {
      if (!controlsRef.current) return

      leavesMaterial.uniforms.time.value = clock.getElapsedTime()
      leavesMaterial.uniformsNeedUpdate = true

      requestAnimationFrame(animate)
      controlsRef.current.update() // Update controls in the animation loop
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      // Dispose Three.js objects and remove event listeners if necessary
    }
  }, [])

  return (
    <>
      <div ref={canvasRef}></div>;
    </>
  )
}
