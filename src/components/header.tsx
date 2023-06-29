
import { a, config, useSpringValue } from "@react-spring/web"
import { useEffect, useRef } from "react"
import { HeaderCard } from "./header-card"
import { useWindowSize } from "@/hooks/use-window-size"
import { clamp } from "three/src/math/MathUtils"
import { useSnapshot } from "valtio"
import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position"
import { Logo } from "./logo"
import { pagesInfo } from "@/constants/pages-consts"
import { Vector3 } from "three"
import Color from "@/utils/Color"

export interface CardInfo {
  text: string,
  id: string,
  color1: Color,
  color2: Color,
}



export const DOCK_ZOOM_LIMIT = [-1, 1]

export const Header = () => {
  const dockRef = useRef<HTMLDivElement>(null!)

  const windowSize = useWindowSize()
  //const mousePosition = useMouseStore((state) => state)
  const mousePosition = useSnapshot(mousePositionSnapshot)




  useEffect(() => {
    // console.log(mousePosition.domMousePosition)
  }, [mousePosition])


  // on Load & on Windowsize change we set the initial data
  // useEffect(() => {

  //   if(windowSize.height && windowSize.width) {
  //     const { x } = dockRef.current.getBoundingClientRect()
  //     console.log('setting initial data: ', {
  //       'middle': x + dockRef.current.clientWidth / 2,
  //       'initWidth': dockRef.current.clientWidth,
  //       'initHeight': dockRef.current.clientHeight
  //     })
  //     dockStore.setDomMiddleX(x + dockRef.current.clientWidth / 2)
  //     dockStore.setInitialWidth('70%')
  //     dockStore.setInitialHeight(dockRef.current.clientHeight)
  //   }
  // }, [windowSize])
  

  // useEffect(() => {
  //   if(windowSize.height && windowSize.width) {
  //     const { x } = dockRef.current.getBoundingClientRect()
  //     console.log('setting initial data: ', {
  //       'middle': x + dockRef.current.clientWidth / 2,
  //       'initWidth': dockRef.current.clientWidth,
  //       'initHeight': dockRef.current.clientHeight
  //     })
  //     dockStore.setDomMiddleX(x + dockRef.current.clientWidth / 2)
  //     dockStore.setInitialWidth('70%')
  //     dockStore.setInitialHeight(dockRef.current.clientHeight)
  //   }
  // }, [])

  return <div className='flex w-full h-16 top-4 fixed text-main z-10 top-0 justify-center'>
    <a.div 
      ref={dockRef} 
      className='w-[60%] darkglassgradient h-24  rounded-3xl flex justify-evenly items-center'
      onMouseOver={() => {
          // dockStore.setHovered(true)
      }}

      onMouseOut={() => {
          // dockStore.setHovered(false)
      }}
      
      // style={ dockStore.initialHeight !== 0 && dockStore.initialWidth !== 0 && dockStore.initialHeight ? {
      //   height: clamp(dockStore.initialHeight * scaleMultiplier.get(), dockStore.initialHeight, 900),
      //   width: dockStore.initialWidth * scaleMultiplier.get(),
      // } : {}}

      >
      {pagesInfo.map((cardInfo, index) =>
         
            <HeaderCard cardInfo={cardInfo} key={cardInfo.id}/>

  
        )}
    </a.div>
  </div>
}