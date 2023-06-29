import { Color, MeshBasicMaterial, MeshLambertMaterial, MeshPhysicalMaterial, MeshPhongMaterial, Object3D, PlaneGeometry, Vector3, MeshToonMaterial, ShadowMaterial } from "three"
import { CommonItems } from "./common"
import { useLayoutEffect, useMemo, useState} from "react"
// import { useMouseStore } from "@/stores/mouse-position"
import { config, useSpring } from "@react-spring/web"
import { a } from '@react-spring/three'
import { useProxy } from "valtio/utils"
import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position"
import { usePageStore } from "@/stores/page-store"
import { to } from "@react-spring/web"
import { lerp } from "three/src/math/MathUtils"

export const ADJUSTING_FACTOR = 3
export const ADJUSTING_FACTOR_Z = 3


const adjustedPosVec = new Vector3()

const planeGeometry = new PlaneGeometry(400,400,4,4)
// original ->
// const planeMaterial = new MeshPhongMaterial({color: new Color("rgb(23,23,23)")})

const planeMaterial = new MeshPhysicalMaterial({ color: new Color("rgb(23,23,23)"), metalness: 0.6, reflectivity: 0.5, clearcoat: 0.5 })

// const planeMaterial = new ShadowMaterial({ color: new Color("rgb(23,23,23)")})


export const ThreeBackground = () => {
  const pageStore = usePageStore(state => state)
  const $mouseStore = useProxy(mousePositionSnapshot)


  const { lightIntensity } = useSpring({
    lightIntensity: $mouseStore.clicked ? 10 : 0,
    config: config.gentle,
  })


  return <>
    <CommonItems/>
    <mesh
    geometry={planeGeometry}
    position={[0,0,-5]}
    material={planeMaterial}
    />

    <a.pointLight 
      
      color={[
        lerp(pageStore.pageColor1.r, pageStore.nextPageColor1.r, pageStore.progressToNextPage),
        lerp(pageStore.pageColor1.g, pageStore.nextPageColor1.g, pageStore.progressToNextPage),
        lerp(pageStore.pageColor1.b, pageStore.nextPageColor1.b, pageStore.progressToNextPage)]} 
      intensity={lightIntensity}  
      position={$mouseStore.mousePosition.setX($mouseStore.mousePosition.x * ADJUSTING_FACTOR).setY($mouseStore.mousePosition.y * ADJUSTING_FACTOR).setZ($mouseStore.mousePosition.z * ADJUSTING_FACTOR_Z)}/>
  </>
}