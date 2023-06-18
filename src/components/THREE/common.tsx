// import { useMouseStore } from "@/stores/mouse-position"

import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position"
import { useSnapshot } from "valtio"

export const CommonItems = () => {
  const mousePosition = useSnapshot(mousePositionSnapshot)

  return <>
   
  </>
}