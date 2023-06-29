import { a, config, useSpring } from "@react-spring/web"
import { animated } from "@react-spring/three";
import { Canvas, useFrame } from "@react-three/fiber"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Mesh, MeshBasicMaterial, PerspectiveCamera, SphereGeometry, Vector3 } from "three"
import { createMaterialFromColors } from '@/shaders/cursor/material'
import { usePageStore } from "@/stores/page-store";
import { pagesInfo } from "@/constants/pages-consts";
import { InsideHeaderCardCanvas } from "./inside-header-card-canvas";
import { cx } from "@/utils/cx";
import { lerp } from "three/src/math/MathUtils";
import { computePageLerp } from "@/utils/compute-page-lerp";
import { relative } from "path";
import { colors } from "@/constants/colors";

const ballPosition = new Vector3(-10,0,-10)

const sphereGeometry = new SphereGeometry(1, 200, 200)
const defaultHeaderBallMaterial = new MeshBasicMaterial({ color: 'blue' })

export const HeaderCard = ({ cardInfo }) => {
  const pageInfo = useMemo(() => pagesInfo.find((info) => info.id === cardInfo.id), [pagesInfo])
  const headerBallMaterial = useMemo(() => createMaterialFromColors(pageInfo.color1, pageInfo.color2), [pageInfo])
  
  const pageStore = usePageStore(state => state)
  
  const isActive = useMemo(() => cardInfo.id === pageStore.id, [pageStore])
  const isNext = useMemo(() => cardInfo.id === pageStore.nextPageId, [pageStore])
  
  const { noiseFreq, noiseAmp, scale, translateY, bgOpacity } = useSpring({

    noiseFreq: computePageLerp(0.1, 1, pageStore.progressToNextPage, isActive, isNext),
    
    scale: computePageLerp(4, 6.5, pageStore.progressToNextPage, isActive, isNext),
    noiseAmp:computePageLerp(0.01, 0.15, pageStore.progressToNextPage, isActive, isNext),
    translateY: computePageLerp(0, 24, pageStore.progressToNextPage, isActive, isNext),
    bgOpacity: computePageLerp(0, 1, pageStore.progressToNextPage, isActive, isNext),
    config: config.gentle
  })

  const cardCanvasRef = useRef(null!)
  const ballRef = useRef(null!)
  const [cardRect, setCardRect] = useState(null)

  const whatever = (id) => {
    // pageStore.setPage(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }


  useEffect(() => {
    if(cardCanvasRef.current) {
      setCardRect(cardCanvasRef.current.getBoundingClientRect())
    }
  }, [])
  // const headerCanvaInitialStateSetter = useMemo(() => (state) => {

  //   state.gl.setClearColor("black", 0)
  
  //   if(cardRect) {
  //     state.camera = new PerspectiveCamera( 1, cardRect.width / cardRect.height, 1, 200 );
  //     state.camera.position = new Vector3(0,0,0)
  //   }
  //   return state
  // }, [cardRect])


  return <a.div 
    onClick={() => {whatever(cardInfo.id)}} 
    style={{
      position: 'relative',
      translateY: translateY,
      backgroundColor: `rgba(${colors.darkglass.r}, ${colors.darkglass.g}, ${colors.darkglass.b}, 1)`,
      background: `linear-gradient(166deg, rgba(27,26,34,${0.15 * bgOpacity.get()}) 0%, rgba(27,26,34,${0.69 * bgOpacity.get()}) 47%, rgba(27,26,34,${0.69 * bgOpacity.get()}) 50%, rgba(27,26,34,${0.15 * bgOpacity.get()}) 100%)`,
      backdropFilter: `blur(${3 * bgOpacity.get()})`,
      boxShadow: `0 4px 30px rgba(0, 0, 0, ${0.4 * bgOpacity.get()})`
    }} 
    className={cx(
      'relative', 
      'h-[70%] w-[18%]',

      // 'box-shadow-black shadow-header',
      'hover:shadow-sm',
      undefined,
      // 'transition-all duration-500',
      'rounded-2xl '
    )}>

    <Canvas
        id={`canvas-${cardInfo.id}`}
        ref={cardCanvasRef}
        gl= {{

          powerPreference: "default", // indicating what configuration of GPU is suitable for this WebGL context.
          alpha: true,
          antialias: true
          
        }}

        style={{
          position: 'absolute',
          pointerEvents: 'none',
        }}
        className="absolute h-100 w-full z-20"
        onCreated={()=> {}}
        // onCreated={headerCanvaInitialStateSetter}
      >
      <InsideHeaderCardCanvas noiseAmp={noiseAmp} noiseFreq={noiseFreq} ballRef={ballRef}/>
      <animated.mesh
        ref={ballRef}
        visible={true}
        position={ballPosition}
        material={headerBallMaterial}
        geometry={sphereGeometry}
        scale={scale}
        ></animated.mesh>

    </Canvas>
    <div className={cx(
      'absolute', 
      'top-4 right-5',
      'text-lg',
      'transition-all duration-500',
      )}>
      {cardInfo.text}
    </div>

  </a.div>
}