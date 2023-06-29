import Color from "../utils/Color";
import { CardInfo } from "@/components/header";


export const pagesInfo: Array<CardInfo>  = [
  {
    text: 'welcome',
    id: 'Welcome',
    color1: new Color(0.914, 0.192, 0.651 ),
    color2: new Color(1, 0.776, 0.051),
  },
  {
    text: 'whoami',
    id: 'WhoAmI',
    color1: new Color(1, 0.427, 0.427),
    color2: new Color(1,0.961,0.604),

  },
  {
    text: 'tech',
    id: 'Technologies',
    color1: new Color(0.4,0.408,0.894),
    color2: new Color(0.765,0.961,0.749),
  },
  {
    text: 'projects',
    id: 'Projects',

    color1: new Color(0.737,0.459,0.922),
    color2: new Color(0.055,0.949,0.871),
  },
  {
    text: 'contact',
    id: 'Contact',
    color1: new Color(0.902,0.859,0.427),
    color2: new Color(0.059, 0.616, 0.714),
  }
]



let tailwindColors = {}

Object.entries(pagesInfo).map((x) => {
  tailwindColors[x[1].id.toLowerCase()] = {
    color1: x[1].color1,
    color2: x[1].color2
  }
})

export { tailwindColors }