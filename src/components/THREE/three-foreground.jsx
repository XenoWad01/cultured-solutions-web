// import { useMouseStore } from "@/stores/mouse-position";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Color, Euler, Mesh, MeshBasicMaterial, Plane, Ray, ShaderMaterial, SphereGeometry, Vector2, Vector3 } from "three";
import { CommonItems } from "./common";
import { MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { animated, a } from "@react-spring/three";
import { useWindowSize } from "@/hooks/use-window-size";
import { TextureLoader } from "three";
import { createMaterialFromColors } from '@/shaders/cursor/material'
import { config, useSpring, useSpringValue, useScroll } from "@react-spring/web";
import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position";
import { pagesInfo } from "@/constants/pages-consts";
import { usePageStore } from "@/stores/page-store";
import { useProxy } from 'valtio/utils'
import { lerp } from "three/src/math/MathUtils";

const vector = new Vector3();
const ray = new Ray();
const planeZ = new Plane(new Vector3(0, 0, 1),);
const random = new Vector3(0, 0, 0)
const sphereGeometry = new SphereGeometry(1, 200, 200)
const defaultOldV3Color = new Vector3(0.0,0.0, 0.0)

const pagesCount = pagesInfo.length
// -1 is because 0 means first page and thats 0 value so the other n-1 pages start at thispage + onePageWorhtOfSCroll
const onePageScroll = 100 / (pagesCount - 1) 

export const ThreeForeground = () => {
  let $mouseStore = useProxy(mousePositionSnapshot)
  const screenSize = useWindowSize()
  const cursorRef = useRef(null)
  const { camera,  } = useThree()
  const pageStore = usePageStore(state => state)
  const gradientTexture = useMemo(() => new TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/200360/gradient-test.jpg'), [])
  

  const scrollOnChange = useCallback(({ value: { scrollYProgress } }) => {
      const scrollProgress = (scrollYProgress * 100)
      const divided = Math.floor(scrollProgress / onePageScroll) 
      const rest = scrollProgress % onePageScroll


      const progressToNextPage = rest / onePageScroll

      pageStore.setPage(pagesInfo[divided].id)
      pageStore.setProgressToNextPage(progressToNextPage)
  }, [])


  useScroll({ 
    container: pageStore.mainScrollablePagesRef,
    onChange: scrollOnChange,
    immediate: true
  })
  
  const computedColor1 = useMemo(() => new Vector3(
    lerp(pageStore.pageColor1.r, pageStore.nextPageColor1.r, pageStore.progressToNextPage), 
    lerp(pageStore.pageColor1.g, pageStore.nextPageColor1.g, pageStore.progressToNextPage),
    lerp(pageStore.pageColor1.b, pageStore.nextPageColor1.b, pageStore.progressToNextPage)
    ), [pageStore])

  const computedColor2 = useMemo(() => new Vector3(
    lerp(pageStore.pageColor2.r, pageStore.nextPageColor2.r, pageStore.progressToNextPage), 
    lerp(pageStore.pageColor2.g, pageStore.nextPageColor2.g, pageStore.progressToNextPage),
    lerp(pageStore.pageColor2.b, pageStore.nextPageColor2.b, pageStore.progressToNextPage)
    ), [pageStore])

  
  const cursorMaterial = useMemo(() => createMaterialFromColors(pageStore.pageColor1, pageStore.pageColor2), [pageStore])


  const { noiseFreq, noiseAmp, scale } = useSpring({
    noiseFreq: $mouseStore.clicked ? 1 : 0.01,
    scale: $mouseStore.clicked ? 0.2 : 0.1,
    noiseAmp: $mouseStore.clicked ? 0.15 : 0.01,
    config: config.gentle
  })


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
        // console.log('intersects be like ', intersects)
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
    useTrans

    useFrame((state) => {
      if (cursorRef.current.material) {
        (cursorRef.current.material).uniforms.time.value = state.clock.elapsedTime;
        (cursorRef.current.material).uniforms.noiseFreq.value = noiseFreq.get();
        (cursorRef.current.material).uniforms.noiseAmp.value = noiseAmp.get();
        (cursorRef.current.material).uniforms.color1.value = computedColor1;
        (cursorRef.current.material).uniforms.color2.value = computedColor2;

        cursorRef.current.rotateX += state.clock.elapsedTime;
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