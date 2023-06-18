import Image from 'next/image'
import { Inter } from 'next/font/google'
import { pages } from '@/components/my-pages/pages'
const inter = Inter({ subsets: ['latin'] })
import { WelcomePage } from '@/components/my-pages/welcome-page'
import { WhoAmIPage } from '@/components/my-pages/who-am-i'
import { Canvas, RootState, Camera } from '@react-three/fiber'
import { ThreeForeground } from '@/components/THREE/three-foreground'
import { ThreeBackground } from '@/components/THREE/three-background'
import { useMemo } from 'react'
import { Color, PerspectiveCamera } from 'three'
import { useWindowSize } from '@/hooks/use-window-size'
import { Header } from '@/components/header'
export default function Home() {
  const screenSize = useWindowSize()
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
      className={`h-screen w-screen overflow-x-clip  relative ${inter.className}`}
    >
      <Header/>

      {/* <== Canvases ==> */}
      
        {/* (*) => Foreground */}
      <Canvas
        id='Foreground'
        gl={{

          powerPreference: "default", // indicating what configuration of GPU is suitable for this WebGL context.
          // (high performance/default are not needed as im trying to make this as light as possible)
          alpha: true,
          antialias: true
          
        }}
        // TODO: MAKE THESE BUBBLE DOWN SOMEHOW
        // FUCK THIS...
        onPointerMove={(e) => { e.bubbles = true }}
        onPointerDown={(e) => { e.bubbles = true }}
        onPointerUp={(e) => { e.bubbles = true}}
        style={{
          position: 'fixed'
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
          // (high performance/default are not needed as im trying to make this as light as possible)
          alpha: true,

        }}
        style= {{
          position: 'fixed'
        }}
        
        className=" fixed h-full w-full z-0"
        onCreated={initialGLStateSetterBG}
      >
        <ThreeBackground/>
      </Canvas>
      


      {/* <== PAGES ==> */}
      <div className='top-0 left-0 absolute w-full h-full z-5'>
        { pages.map(page => page)}
      </div>


    </main>
  )
}
