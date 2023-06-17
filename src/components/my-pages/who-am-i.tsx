import { ReactElement } from 'react'
import { Layout } from './full-page-layout'

export const pageId = 'WhoAmI' as const

export const WhoAmIPage = (): ReactElement => {
  
  return <Layout>
    <div id={pageId} className="w-full h-full">
      Who am i? 
    </div>
  </Layout>
  
}