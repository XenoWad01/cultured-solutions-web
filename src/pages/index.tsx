import Image from 'next/image'
import { Inter } from 'next/font/google'
import { pages } from '@/components/my-pages/pages'
const inter = Inter({ subsets: ['latin'] })
import { WelcomePage } from '@/components/my-pages/welcome-page'
import { WhoAmIPage } from '@/components/my-pages/who-am-i'
import { Canvas, RootState, Camera } from '@react-three/fiber'
import { ThreeForeground } from '@/components/THREE/three-foreground'
import { ThreeBackground } from '@/components/THREE/three-background'
import { MutableRefObject, useEffect, useMemo, useRef } from 'react'
import { Color, PerspectiveCamera } from 'three'
import { useWindowSize } from '@/hooks/use-window-size'
import { Header } from '@/components/header'
import { Bloom, DepthOfField, EffectComposer, Noise } from '@react-three/postprocessing'
import { usePageStore } from '@/stores/page-store'


export default function Home() {
  const mainPagesRef = useRef<HTMLElement>()
  const screenSize = useWindowSize()
  const pageStore = usePageStore(state => state)




  const initialGLStateSetterBG = useMemo(() => (state: RootState) => {
    state.gl.setClearColor(new Color("rgb(23,23,23)"), 1) 
    state.camera =  new PerspectiveCamera( 1, screenSize.width / screenSize.height, 1, 2000 );
    return state
  }, [])

  const initialGLStateSetterFG = useMemo(() => (state: RootState) => {
    state.gl.setClearColor("black", 0) 
    state.camera =  new PerspectiveCamera( 1, screenSize.width / screenSize.height, 1, 2000 );
    
    return state
  }, [])

  
  return (
    <main
      className={`h-screen w-screen overflow-x-clip  relative font-overpass-mono`}
      ref={mainPagesRef}
    >
      <Header/>

      {/* <== Canvases ==> */}
      
        {/* (*) => Foreground */}
      <Canvas
        id='Foreground'
        gl={{

          powerPreference: "default", // indicating what configuration of GPU is suitable for this WebGL context.
          alpha: true,
          antialias: true
          
        }}

        style={{
          position: 'fixed',
          pointerEvents: 'none'
        }}
        className=" fixed h-full w-full z-20"
        onCreated={initialGLStateSetterFG}
      >

        <ThreeForeground/>
      </Canvas>

     
        {/* (*) => Background */}
      <Canvas
        id='Background'
        gl={{

          powerPreference: "default", // indicating what configuration of GPU is suitable for this WebGL context.
          alpha: true,

        }}
        style= {{
          position: 'fixed'
        }}
        
        className=" fixed h-full w-full z-0"
        onCreated={initialGLStateSetterBG}
      >
              {/* <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer> */}


        <ThreeBackground/>
      </Canvas>
      


      {/* <== PAGES ==> */}
      <div className='top-0 left-0 absolute w-full h-full z-5 scroll-smooth' >
        {pages.map(page => page)}
      </div>


    </main>
  )
}
