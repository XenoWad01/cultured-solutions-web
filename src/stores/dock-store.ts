import { SpringValue } from "@react-spring/web"
import { create } from "zustand"

type DockApi = {
  initialWidth: number | string
  initialHeight: number | string
  domMiddleX: number
  hovered: boolean
  areChildrenHovered: boolean
  setInitialWidth: (newVal: number | string) => void
  setInitialHeight: (newVal: number | string) => void
  setDomMiddleX: (newVal: number) => void
  setHovered: (newVal: boolean) => void
  setAreChildrenHovered: (newVal: boolean) => void
}



export const useDockStore = create<DockApi>()(
      (set) => ({

        // set on init / window size change
        initialWidth: 0,
        initialHeight: 0,
        domMiddleX: 0,
        setInitialWidth: (newVal) => set((state) => ({ initialWidth: newVal })),
        setInitialHeight: (newVal) => set((state) => ({ initialHeight: newVal })),
        setDomMiddleX: (newVal) => set((state) => ({ domMiddleX: newVal })),


        // booleans
        hovered: false,
        areChildrenHovered: false,
        setAreChildrenHovered: (newVal) => set((state) => {
          if(newVal === true) {
            return { areChildrenHovered: true, hovered: true }
          } else {
            return { areChildrenHovered: true }
          }

        }),
        setHovered: (newVal) => set((state) => {
          if(state.areChildrenHovered) {
            return { hovered: true }
          } else {
            return { hovered: newVal }
          }
        }),
      }),
)