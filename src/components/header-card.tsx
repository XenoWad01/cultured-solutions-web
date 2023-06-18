import Link from "next/link"
import { useCallback } from "react"


export interface CardInfo {
  text: string,
  id: string,
  color1: string,
  color2: string,
  color3: string
}
export const HeaderCard = ({ cardInfo }: { cardInfo: CardInfo }) => {



  return <Link onClick={() => { console.log('clicked???')}} href={`#${cardInfo.id}`} className='h-10 w-24 bg-headerCardBg rounded 3xl hover:scale-[1.2]'>
    {cardInfo.text}
  </Link>
}