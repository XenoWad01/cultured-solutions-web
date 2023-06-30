import { Color, MeshBasicMaterial, MeshLambertMaterial, MeshPhysicalMaterial, MeshPhongMaterial, Object3D, PlaneGeometry, Vector3, MeshToonMaterial, ShadowMaterial, BoxGeometry, Camera, PerspectiveCamera, Mesh } from "three"
import { CommonItems } from "./common"
import { useLayoutEffect, useMemo, useState, useRef } from "react"
// import { useMouseStore } from "@/stores/mouse-position"
import { config, useSpring } from "@react-spring/web"
import { a } from '@react-spring/three'
import { useProxy } from "valtio/utils"
import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position"
import { usePageStore } from "@/stores/page-store"
import { to } from "@react-spring/web"
import { lerp } from "three/src/math/MathUtils"
import { OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export const ADJUSTING_FACTOR = 3
export const ADJUSTING_FACTOR_Z = 3

const defaultVec3 = new Vector3(0,0,0)
const adjustedPosVec = new Vector3()

const planeGeometry = new PlaneGeometry(400,400,4,4)
// original ->
 const planeMaterial = new MeshPhongMaterial({color: new Color("rgb(23,23,23)")})
const cubeGeometry = new BoxGeometry(5,5, 5)
const markerGeom = new BoxGeometry(1,1,1)
// const planeMaterial = new MeshPhysicalMaterial({ color: new Color("rgb(23,23,23)"), metalness: 0.6, reflectivity: 0.5, clearcoat: 0.5 })
const markerMaterial = new MeshPhysicalMaterial({ color: new Color("rgb(255,0,0)"), metalness: 0.6, reflectivity: 0.5, clearcoat: 0.5 })
// const planeMaterial = new ShadowMaterial({ color: new Color("rgb(23,23,23)")})
const randoCameraForOrbitHackRef = new PerspectiveCamera(1,1,1,1)
randoCameraForOrbitHackRef.position.set(-5,8,-3)

export const ThreeBackground = () => {
  const pageStore = usePageStore(state => state)
  const $mouseStore = useProxy(mousePositionSnapshot)
  const cubeRef = useRef(null)
  const markerRef = useRef(null)

  const { lightIntensity } = useSpring({
    lightIntensity: $mouseStore.clicked ? 10 : 0,
    config: config.gentle,
  })

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.lookAt(randoCameraForOrbitHackRef.position)
    }
  });


  return <>
    <CommonItems/>

    <OrbitControls 
      enableZoom={false} 
      enableDamping={true} 
      enablePan={false}
      target={cubeRef.current?.position || defaultVec3}
      reverseOrbit={true}
      camera={randoCameraForOrbitHackRef} 
      domElement={document.body}
      maxAzimuthAngle={Infinity}
      minAzimuthAngle={-Infinity}
      maxPolarAngle={Infinity}
      minPolarAngle={-Infinity}
      dampingFactor={0.01}
      rotateSpeed={2}
      autoRotate={true}
      autoRotateSpeed={5}
      />
    <mesh
    ref={cubeRef}
    geometry={cubeGeometry}
    position={[-5,0,-3]}
    material={planeMaterial}
    />


    <mesh
    geometry={planeGeometry}
    position={[0,0,-10]}
    material={planeMaterial}
    />
    

    <a.pointLight 
      
      color={[
        lerp(pageStore.pageColor1.r, pageStore.nextPageColor1.r, pageStore.progressToNextPage),
        lerp(pageStore.pageColor1.g, pageStore.nextPageColor1.g, pageStore.progressToNextPage),
        lerp(pageStore.pageColor1.b, pageStore.nextPageColor1.b, pageStore.progressToNextPage)]} 
      //intensity={lightIntensity}  
            intensity={10}  
      position={$mouseStore.mousePosition.setX($mouseStore.mousePosition.x * ADJUSTING_FACTOR).setY($mouseStore.mousePosition.y * ADJUSTING_FACTOR).setZ($mouseStore.mousePosition.z * ADJUSTING_FACTOR_Z)}/>
  </>
}