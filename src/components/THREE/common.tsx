// import { useMouseStore } from "@/stores/mouse-position"

import { usePerformanceStore } from "@/stores/performance-store"
import { PerformanceMonitor } from "@react-three/drei"


export const CommonItems = () => {
  const { setDpr } = usePerformanceStore()

  return <>
   {/* <PerformanceMonitor 
    flipflops={3} 
    factor={1} 
    // onChange={({ factor }) => setDpr(Math.floor(0.5 + 1.5 * factor))} 
    onDecline={() => { setDpr(0.5) }}
    onIncline={() => { setDpr(2) }}
    /> */}
  </>
}