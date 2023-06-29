import { pageId } from "@/components/my-pages/pages"
import { SpringValue } from "@react-spring/web"
import { Vector3 } from "three"
import { create } from "zustand"
import { pagesInfo } from '@/constants/pages-consts'
import { MutableRefObject } from "react"
import Color from "@/utils/Color"

type PageApi = {
  id: pageId,
  nextPageId: pageId,
  pageColor1: Color,
  pageColor2: Color,
  nextPageColor1: Color,
  nextPageColor2: Color,
  progressToNextPage: number,
  setProgressToNextPage: (newVal: number) => void,
  setPage: (newVal: pageId) => void,
}
const welcomePageInfo = pagesInfo.find(info => info.id === 'Welcome')
const whoAmIPageInfo = pagesInfo.find(info => info.id === 'WhoAmI')

export const usePageStore = create<PageApi>()(
      (set) => ({
        mainScrollablePagesRef: null,
        // set on init / window size change
        pageColor1: welcomePageInfo.color1,
        pageColor2: welcomePageInfo.color2,
        nextPageColor1: whoAmIPageInfo.color1,
        nextPageColor2: whoAmIPageInfo.color2,
        progressToNextPage: 0,
        id: 'Welcome',
        nextPageId: 'WhoAmI',
        setProgressToNextPage: (newVal) => set((state) => ({
          progressToNextPage: newVal
        })),
        setPage: (newVal) => set((state) => {
          let currentIndex = 0
          const foundPageInfo = pagesInfo.find((info, index) => {
            if(info.id === newVal) {
              currentIndex = index
              return true
            }
          })

          let nextPageInfo = pagesInfo.find((info, index) => index === currentIndex+1) || pagesInfo[pagesInfo.length-1]
          
          return { 
            id: foundPageInfo.id as pageId, 
            nextPageId: nextPageInfo.id as pageId,
            pageColor1: foundPageInfo.color1,
            pageColor2: foundPageInfo.color2,
            nextPageColor1: nextPageInfo.color1,
            nextPageColor2: nextPageInfo.color2
          }
        }),

      }),
)