import { Vector3 } from 'three'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface MousePositionState {
  mousePosition: Vector3,
  clicked: boolean,
  setMousePosition: (newVal: Vector3) => void,
  setClicked: (newVal: boolean) => void
}

export const useMouseStore = create<MousePositionState>()(
  // devtools(
  //   persist(
      (set) => ({
        mousePosition: new Vector3(0,0,0),
        clicked: false,
        setMousePosition: (newVal) => set((state) => ({ mousePosition: newVal })),
        setClicked: (newVal) => set((state) => ({ clicked: newVal })),
      }),
      // {
      //   name: 'bear-storage',
      // }
  //   )
  // )
)