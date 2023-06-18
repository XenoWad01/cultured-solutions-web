import { useMouseStore } from "@/stores/mouse-position";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, Euler, Mesh, MeshBasicMaterial, Plane, Ray, ShaderMaterial, SphereGeometry, Vector2, Vector3 } from "three";
import { CommonItems } from "./common";
import { MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { a } from "@react-spring/three";
import { useWindowSize } from "@/hooks/use-window-size";
import { TextureLoader } from "three";
import { material as cursorMaterial } from '@/shaders/cursor/material'
import { config, useSpring } from "@react-spring/web";

const vector = new Vector3();
const ray = new Ray();
const planeZ = new Plane(new Vector3(0, 0, 1),);

export const ThreeForeground = () => {
  const mouseStore = useMouseStore((state) => state)
  const screenSize = useWindowSize()
  const cursorRef = useRef<Mesh>(null!)
  const { camera } = useThree()
  
  const gradientTexture = useMemo(() => new TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/200360/gradient-test.jpg'), [])
  const wobbleSpring = useSpring({
    config: { ...config.stiff },
    from: {
      noiseFreq: 0.01,
      noiseAmp: 0.01,
      scale: 0.1
    },
    to: {
      noiseFreq: mouseStore.clicked ? 2 : 0.01,
      noiseAmp: mouseStore.clicked ? 0.2 : 0.01,
      scale: mouseStore.clicked ? 0.3 : 0.1
    },
  });
    // Runs on mount
    useEffect(() => {
      // 👇️ mouse position for bg animation 
      const handleWindowMouseDown = () => {
        mouseStore.setClicked(true)
      }
      const handleWindowMouseUp = () => {
        mouseStore.setClicked(false)
      }
  
      const handleWindowMouseMove = (event: MouseEvent) => {
  
        vector.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5) // z = 0.5 important!
        vector.unproject(camera)
  
        ray.set(camera.position, vector.sub(camera.position))
  
        const result = new Vector3(0, 0, 0)
        const intersects = ray.intersectPlane(planeZ, result)
  
        mouseStore.setMousePosition(intersects || result)
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

    // time: { type: "f", value: 0.0 },
    // speed: { type: "f", value: 0.0 },
    // intensity: { type: "f", value: 0.0 },
    // texture1: {
    //   type: 't',
    //   value: undefined,
    // }
    useFrame((state) => {
      if (cursorRef.current.material) {
        // console.log('material old val: ', (cursorRef.current.material as ShaderMaterial).uniforms.time.value);
        (cursorRef.current.material as ShaderMaterial).uniforms.time.value = state.clock.elapsedTime;
        // (cursorRef.current.material as ShaderMaterial).uniforms.intensity.value = 10;
        // (cursorRef.current.material as ShaderMaterial).uniforms.speed.value = 20;
        // (cursorRef.current.material as ShaderMaterial).uniforms.texture1.value = gradientTexture;
        // cursorRef.current.rotation.x += state.clock.elapsedTime
      // }    
          //console.log('ystasat',wobbleSpring.noiseFreq)
          (cursorRef.current.material as ShaderMaterial).uniforms.noiseFreq.value = wobbleSpring.noiseFreq.get();
          (cursorRef.current.material as ShaderMaterial).uniforms.noiseAmp.value = wobbleSpring.noiseAmp.get()

      }
    });
  

  return <>
    <CommonItems/>
      <a.mesh
        ref={cursorRef}
        visible
        position={mouseStore.mousePosition}
        material={cursorMaterial}

        geometry={new SphereGeometry(wobbleSpring.scale.get(), 100, 100)}
        >
      </a.mesh>

      <pointLight position={new Vector3(0,0,1)} color={'white'}  intensity={1}/>
  </>
}