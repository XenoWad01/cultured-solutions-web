import { pageId } from "@/components/my-pages/pages"
import { SpringValue } from "@react-spring/web"
import { Vector3 } from "three"
import { create } from "zustand"
import { pagesInfo } from '@/constants/pages-consts'

type PageApi = {
  pageColor1: Vector3,
  pageColor2: Vector3,
  id: pageId,
  setPage: (pageId) => void,
}
const welcomePageInfo = pagesInfo.find(info => info.id === 'Welcome')


export const usePageStore = create<PageApi>()(
      (set) => ({

        // set on init / window size change
        pageColor1: welcomePageInfo.color1,
        pageColor2: welcomePageInfo.color2,
        id: 'Welcome',
        setPage: (newVal) => set((state) => {
          const foundPageInfo = pagesInfo.find(info => info.id === newVal)
          return { 
            id: foundPageInfo.id as pageId, 
            pageColor1: foundPageInfo.color1,
            pageColor2: foundPageInfo.color2 
          }
        }),

      }),
)