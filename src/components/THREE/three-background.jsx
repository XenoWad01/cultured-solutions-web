import { Color, MeshBasicMaterial, Mesh, MeshLambertMaterial, MeshPhysicalMaterial, MeshPhongMaterial, Object3D, PlaneGeometry, Vector3, MeshToonMaterial, ShadowMaterial, BoxGeometry, Camera, PerspectiveCamera } from "three"
import { CommonItems } from "./common"
import { useLayoutEffect, useMemo, useState, useRef, useEffect, useCallback } from "react"
// import { useMouseStore } from "@/stores/mouse-position"
import { config, useSpring } from "@react-spring/web"
import { a } from '@react-spring/three'
import { useProxy } from "valtio/utils"
import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position"
import { usePageStore } from "@/stores/page-store"
import { to } from "@react-spring/web"
import { lerp } from "three/src/math/MathUtils"
import { Box, Merged, OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { gameConfig } from "./config"
import { Cell } from "./cell"
import { Mesh as THREEMESH } from "three"
import { useGameStore } from "@/stores/game-store"
const side = gameConfig.side
const size = gameConfig.size

export const ADJUSTING_FACTOR = 3
export const ADJUSTING_FACTOR_Z = 5

const defaultVec3 = new Vector3(0,0,0)
const adjustedPosVec = new Vector3()

const planeGeometry = new PlaneGeometry(400,400,4,4)
// original ->
 const planeMaterial = new MeshPhongMaterial({color: new Color("rgb(23,23,23)")})
const cubeGeometry = new BoxGeometry(size, size, size)
const markerGeom = new BoxGeometry(1,1,1)
// const planeMaterial = new MeshPhysicalMaterial({ color: new Color("rgb(23,23,23)"), metalness: 0.6, reflectivity: 0.5, clearcoat: 0.5 })
const markerMaterial = new MeshPhysicalMaterial({ color: new Color("rgb(255,0,0)"), metalness: 0.6, reflectivity: 0.5, clearcoat: 0.5 })
// const planeMaterial = new ShadowMaterial({ color: new Color("rgb(23,23,23)")})
const randoCameraForOrbitHackRef = new PerspectiveCamera(1,1,1,1)
randoCameraForOrbitHackRef.position.set(-5,8,-3)


export const ThreeBackground = () => {

  const { gameState, updateGame } = useGameStore()
  useEffect(() => {

    const interval = setInterval(updateGame, gameConfig.stepDurationInMs)

    return () => {
      clearInterval(interval);
    };
  }, [])

  const pageStore = usePageStore(state => state)
  const $mouseStore = useProxy(mousePositionSnapshot)
  const cubeRef = useRef(null)
  const markerRef = useRef(null)

  const { lightIntensity } = useSpring({
    lightIntensity: $mouseStore.clicked ? 4 : 2,
    config: config.gentle,
  })

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.lookAt(randoCameraForOrbitHackRef.position)
    }
  });




  const computedCells = useMemo(() => {
    const cubes = []
    
    for( let x = 0; x < side; x++ ) {
			for( let y = 0; y < side; y++ ) {
				for( let z = 0; z < side; z++ ) {
          cubes.push(
            <Cell
              position={{x,y,z}}
              key={`${x}-${y}-${z}`}
            />
          )
				}
			}
		}

    return cubes

  }, [])


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
      <group 
        ref={cubeRef}
        position={[-10,0,-10]}
        
      >

          {...computedCells}
  
      </group>
    {/* <mesh
    ref={cubeRef}
    geometry={cubeGeometry}
    position={[-5,0,-10]}
    material={planeMaterial}
    /> */}


    <mesh
    geometry={planeGeometry}
    position={[0,0,-20]}
    material={planeMaterial}
    />
    
    <mesh></mesh>
    <a.pointLight 
      
      color={[
        lerp(pageStore.pageColor1.r, pageStore.nextPageColor1.r, pageStore.progressToNextPage),
        lerp(pageStore.pageColor1.g, pageStore.nextPageColor1.g, pageStore.progressToNextPage),
        lerp(pageStore.pageColor1.b, pageStore.nextPageColor1.b, pageStore.progressToNextPage)]} 
       intensity={lightIntensity}  
      position={$mouseStore.mousePosition.setX($mouseStore.mousePosition.x * ADJUSTING_FACTOR).setY($mouseStore.mousePosition.y * ADJUSTING_FACTOR).setZ($mouseStore.mousePosition.z * ADJUSTING_FACTOR_Z)}/>
  </>
}