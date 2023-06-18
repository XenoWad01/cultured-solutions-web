import { CardInfo } from "@/components/header";
import { Vector3 } from "three";

export const pagesInfo: Array<CardInfo>  = [
  {
    text: 'welcome',
    id: 'Welcome',
    color1: new Vector3(0.912,0.191,0.652),
    color2: new Vector3(1.000,0.777,0.0522),
  },
  {
    text: 'whoami',
    id: 'WhoAmI',
    color1: new Vector3(0.988,0.349,0.667),
    color2: new Vector3(0.106,0.949,0.878),
  },
  {
    text: 'tech',
    id: 'Technologies',
    color1: new Vector3(0.765,0.961,0.749),
    color2: new Vector3(0.4,0.408,0.894),
  },
  {
    text: 'projects',
    id: 'Projects',
    color1: new Vector3(0.055,0.949,0.871),
    color2: new Vector3(0.737,0.459,0.922),
  },
  {
    text: 'contact',
    id: 'Contact',
    color1: new Vector3(0.624,0.882,0.984),
    color2: new Vector3(0.937,0.278,0.106),
  }
]

