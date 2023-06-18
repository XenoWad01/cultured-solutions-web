import { useDockStore } from "@/stores/dock-store"
import { useSpringValue } from "@react-spring/web"
import { useRef } from "react"
import { CardInfo, HeaderCard } from "./header-card"

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


export const Header = () => {
  const dockRef = useRef<HTMLDivElement>(null!)
  const dockStore = useDockStore((state) => state)
  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      dockStore.setWidth(dockRef.current.clientWidth)
    },
  })

  return <div className='flex w-full h-16 top-10 fixed text-main z-10 top-0 justify-center'>
    <div className='w-[90%] bg-headerBg h-18 rounded-3xl flex'>
      {headerItems.map((cardInfo, index) =>
         
            <HeaderCard cardInfo={cardInfo} key={cardInfo.id}/>

  
        )}
    </div>
  </div>
}