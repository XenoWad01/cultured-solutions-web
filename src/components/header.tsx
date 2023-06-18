import { useDockStore } from "@/stores/dock-store"
import { a, config, useSpringValue } from "@react-spring/web"
import { useEffect, useRef } from "react"
import { CardInfo, HeaderCard } from "./header-card"
import { useWindowSize } from "@/hooks/use-window-size"
import { clamp } from "three/src/math/MathUtils"
import { useSnapshot } from "valtio"
import { mousePositionSnapshot } from "@/stores/valtio-mutable-mouse-position"
//import { useMouseStore } from "@/stores/mouse-position"

const headerItems: Array<CardInfo>  = [
  {
    text: 'welcome',
    id: 'Welcome',
    color1: 'rgb(240,33,14)',
    color2: 'rgb(203,237,251)',
    color3: 'rgb(129,200,249)'

  },
  {
    text: 'whoami',
    id: 'WhoAmI',
    color1: 'rgb(84,238,246)',
    color2: 'rgb(89,190,249)',
    color3: 'rgb(193,113,236)'
  }
]

export const DOCK_ZOOM_LIMIT = [-1, 1]

export const Header = () => {
  const dockRef = useRef<HTMLDivElement>(null!)
  const dockStore = useDockStore(state => state)
  const windowSize = useWindowSize()
  //const mousePosition = useMouseStore((state) => state)
  const mousePosition = useSnapshot(mousePositionSnapshot)



  useEffect(() => {

  }, [dockStore, dockRef, mousePosition])

  useEffect(() => {

  }, [dockStore])

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

  return <div className='flex w-full h-16 top-10 fixed text-main z-10 top-0 justify-center'>
    <a.div 
      ref={dockRef} 
      className='w-[70%] bg-headerBg h-18  rounded-3xl flex'
      onMouseOver={() => {
          dockStore.setHovered(true)
      }}

      onMouseOut={() => {
          dockStore.setHovered(false)
      }}
      
      // style={ dockStore.initialHeight !== 0 && dockStore.initialWidth !== 0 && dockStore.initialHeight ? {
      //   height: clamp(dockStore.initialHeight * scaleMultiplier.get(), dockStore.initialHeight, 900),
      //   width: dockStore.initialWidth * scaleMultiplier.get(),
      // } : {}}

      >
      {headerItems.map((cardInfo, index) =>
         
            <HeaderCard cardInfo={cardInfo} key={cardInfo.id}/>

  
        )}
    </a.div>
  </div>
}