import { Color, MeshBasicMaterial, MeshPhongMaterial, PlaneGeometry, Vector3 } from "three"
import { CommonItems } from "./common"
import { useMemo } from "react"
// import { useMouseStore } from "@/stores/mouse-position"
import { config, useSpring } from "@react-spring/web"
import { a } from '@react-spring/three'
import { useProxy } from "valtio/utils"
import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position"
import { usePageStore } from "@/stores/page-store"

export const ADJUSTING_FACTOR = 3
export const ADJUSTING_FACTOR_Z = 10
const adjustedPosVec = new Vector3()
export const ThreeBackground = () => {
  const pageStore = usePageStore(state => state)
  const $mouseStore = useProxy(mousePositionSnapshot)
  const { lightIntensity } = useSpring({

    lightIntensity: $mouseStore.clicked ? 10 : 0,
    config: config.gentle
  })

  const lightColor = useMemo(() => {
    return new Color(pageStore.pageColor1.x,pageStore.pageColor1.y,pageStore.pageColor1.z)
  }, [pageStore])
  return <>
    <CommonItems/>
    <mesh
    geometry={new PlaneGeometry(400,400,4,4)}
    position={[0,0,-5]}
    material={new MeshPhongMaterial({color: new Color("rgb(23,23,23)")})}
    />
    <a.pointLight color={lightColor} position={$mouseStore.mousePosition.setX($mouseStore.mousePosition.x * ADJUSTING_FACTOR).setY($mouseStore.mousePosition.y * ADJUSTING_FACTOR).setZ($mouseStore.mousePosition.z * ADJUSTING_FACTOR_Z)} intensity={lightIntensity}/>
  </>
}