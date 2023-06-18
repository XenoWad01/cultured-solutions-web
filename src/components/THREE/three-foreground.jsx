// import { useMouseStore } from "@/stores/mouse-position";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Color, Euler, Mesh, MeshBasicMaterial, Plane, Ray, ShaderMaterial, SphereGeometry, Vector2, Vector3 } from "three";
import { CommonItems } from "./common";
import { MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { animated, a } from "@react-spring/three";
import { useWindowSize } from "@/hooks/use-window-size";
import { TextureLoader } from "three";
import { material as cursorMaterial } from '@/shaders/cursor/material'
import { config, useSpring, useSpringValue } from "@react-spring/web";
import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position";
import { useProxy } from 'valtio/utils'
const vector = new Vector3();
const ray = new Ray();
const planeZ = new Plane(new Vector3(0, 0, 1),);
const random = new Vector3(0, 0, 0)
const sphereGeometry = new SphereGeometry(1, 200, 200)

export const ThreeForeground = () => {
  let $mouseStore = useProxy(mousePositionSnapshot)
  const screenSize = useWindowSize()
  const cursorRef = useRef(null)
  const { camera,  } = useThree()
  
  const gradientTexture = useMemo(() => new TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/200360/gradient-test.jpg'), [])
 
  const { noiseFreq, noiseAmp, scale, lightIntensity } = useSpring({
    noiseFreq: $mouseStore.clicked ? 1 : 0.01,
    scale: $mouseStore.clicked ? 0.2 : 0.1,
    noiseAmp: $mouseStore.clicked ? 0.1 : 0.01,
    lightIntensity: $mouseStore.clicked ? 1 : 0,
    config: config.gentle
  })


  useEffect(() => {

  }, [$mouseStore.mousePosition])
  useEffect(() => {


  }, [noiseFreq])
    // Runs on mount
    useEffect(() => {
      // 👇️ mouse position for bg animation 
      const handleWindowMouseDown = () => {
        if(!$mouseStore.clicked)
        $mouseStore.clicked+= 1
      }
      const handleWindowMouseUp = () => {
        if($mouseStore.clicked)
        $mouseStore.clicked-= 1
      }
      const handleWindowMouseMove = (event) => {
  


        vector.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5) // z = 0.5 important!
        vector.unproject(camera)
    
        ray.set(camera.position, vector.sub(camera.position))
       // console.log('Raydir',ray.direction)
    
          let result = new Vector3(0,0,0)
        //console.log('rESULT AFTER SET : ', result)
    
        // console.log(ray.intersectPlane(planeZ, result))
        //console.log('intersects be like ', intersects)
        let intersection = ray.intersectPlane(planeZ, result)
        $mouseStore.mousePosition = intersection || result
        
        $mouseStore.domMousePosition.set(event.clientX, event.clientY)
        result = null
        intersection = null
      }
  
      window.addEventListener('mousemove', handleWindowMouseMove)
      window.addEventListener('mousedown', handleWindowMouseDown)
      window.addEventListener('mouseup', handleWindowMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleWindowMouseMove)
        window.removeEventListener('mousedown', handleWindowMouseDown)
        window.removeEventListener('mouseup', handleWindowMouseUp)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useFrame((state) => {
      if (cursorRef.current.material) {
        (cursorRef.current.material).uniforms.time.value = state.clock.elapsedTime;
        (cursorRef.current.material).uniforms.noiseFreq.value = noiseFreq.get();
        (cursorRef.current.material).uniforms.noiseAmp.value = noiseAmp.get();
      }
    });

  return <>
    <CommonItems/>
      <animated.mesh
        ref={cursorRef}
        visible={true}
        position={$mouseStore.mousePosition}
        material={cursorMaterial}

        geometry={sphereGeometry}
        scale={scale}
        >
       
      </animated.mesh>

  </>
}