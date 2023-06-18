import { SpringValue } from "@react-spring/web"
import { create } from "zustand"

type DockApi = {
  hovered: boolean
  width: number
  zoomLevel?: SpringValue
  setZoomLevel: (newVal: SpringValue) => void
  setWidth: (newVal: number) => void
  setHovered: (newVal: boolean) => void
  setIsZooming: (newVal: boolean) => void
  generalSet: (newVal: DockApi) => void
}



export const useDockStore = create<DockApi>()(
      (set) => ({
        width: 0,
        hovered: false,
        zoomLevel: undefined,
        setWidth: (newVal) => set((state) => ({ width: newVal })),
        setZoomLevel: (newVal) => set((state) => ({ zoomLevel: newVal })),
        setIsZooming: (newVal) => set((state) => ({ isZooming: newVal, hovered: !newVal })),
        setHovered: (newVal) => set((state) => ({ hovered: newVal, isZooming: !newVal })),
        generalSet: (newVal) => set(state => ({...newVal}))
      }),
)