import { Vector2, Vector3 } from 'three'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface MousePositionState {
  mousePosition: Vector3,
  domMousePosition: Vector2,
  clicked: boolean,
  setMousePosition: (newVal: Vector3) => void,
  setDomMousePosition: (newVal: Vector2) => void,
  setClicked: (newVal: boolean) => void
}

export const useMouseStoreOld = create<MousePositionState>()(
  // devtools(
  //   persist(
      (set) => ({
        mousePosition: new Vector3(0,0,0),
        domMousePosition: new Vector2 (0,0),
        clicked: false,
        setMousePosition: (newVal) => set((state) => ({ mousePosition: newVal })),
        setDomMousePosition: (newVal) => set((state) => ({ domMousePosition: newVal })),
        setClicked: (newVal) => set((state) => ({ clicked: newVal })),
      }),
      // {
      //   name: 'bear-storage',
      // }
  //   )
  // )
)