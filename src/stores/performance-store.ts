import { create } from "zustand"

type GameApi = {
    dpr: number
    setDpr: (value: number) => void,
}


export const usePerformanceStore = create<GameApi>()(
      (set) => ({
        dpr: 1,
        setDpr: (value) => {

            set((state) => ({
                dpr: value
            }))

        }
      }),
)