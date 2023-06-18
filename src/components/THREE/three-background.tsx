import { Color, MeshBasicMaterial, MeshPhongMaterial, PlaneGeometry, Vector3 } from "three"
import { CommonItems } from "./common"
import { useMemo } from "react"
import { useMouseStore } from "@/stores/mouse-position"

export const ADJUSTING_FACTOR = 1.5
export const ADJUSTING_FACTOR_Z = 10

export const ThreeBackground = () => {
  const mouseStore = useMouseStore((state) => state)
  
  const adjustedPosition = useMemo(() => 
  new Vector3(
    mouseStore.mousePosition.x * ADJUSTING_FACTOR, 
    mouseStore.mousePosition.y * ADJUSTING_FACTOR, 
    mouseStore.mousePosition.z * ADJUSTING_FACTOR_Z
    ), [mouseStore.mousePosition])

  return <>
    <CommonItems/>
    <mesh
    geometry={new PlaneGeometry(400,400,4,4)}
    position={[0,0,-5]}
    material={new MeshPhongMaterial({color: new Color("rgb(23,23,23)")})}
    />
    <pointLight position={adjustedPosition} color={new Color('rgb(232, 46, 169)')} intensity={10}/>
  </>
}