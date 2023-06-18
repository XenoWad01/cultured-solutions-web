import { a, config, useSpring } from "@react-spring/web"
import { animated } from "@react-spring/three";
import { Canvas, useFrame } from "@react-three/fiber"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Mesh, MeshBasicMaterial, PerspectiveCamera, SphereGeometry, Vector3 } from "three"
import { createMaterialFromColors } from '@/shaders/cursor/material'
import { usePageStore } from "@/stores/page-store";
import { pagesInfo } from "@/constants/pages-consts";
import { InsideHeaderCardCanvas } from "./inside-header-card-canvas";
const ballPosition = new Vector3(-10,0,-10)
const sphereGeometry = new SphereGeometry(1, 200, 200)

const defaultHeaderBallMaterial = new MeshBasicMaterial({ color: 'blue' })
export const HeaderCard = ({ cardInfo }) => {
  const pageInfo = useMemo(() => pagesInfo.find((info) => info.id === cardInfo.id), [pagesInfo])
  const headerBallMaterial = useMemo(() => createMaterialFromColors(pageInfo.color1, pageInfo.color2), [pageInfo])
  
  const pageStore = usePageStore(state => state)

  const isActive = useMemo(() => cardInfo.id === pageStore.id, [pageStore])


  const { noiseFreq, noiseAmp, scale } = useSpring({
    noiseFreq: isActive ? 1 : 0.01,
    scale: isActive ? 6.5 : 4,
    noiseAmp: isActive ? 0.15 : 0.01,

    config: config.gentle
  })

  const cardCanvasRef = useRef(null!)
  const ballRef = useRef(null!)
  const [cardRect, setCardRect] = useState(null)

  const whatever = (id) => {
    pageStore.setPage(id)
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

  return <a.div onClick={() => { whatever(cardInfo.id)}}  className='relative h-[70%] w-[15%] bg-headerCardBg rounded-2xl '>

    <Canvas
        id={`canvas-${cardInfo.id}`}
        ref={cardCanvasRef}
        gl={{

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
    <div className='absolute right-5 top-1/3'>
      {cardInfo.text}
    </div>

  </a.div>
}