import { ReactElement } from 'react'
import { Layout } from './full-page-layout'

export const pageId = 'WhoAmI' as const

export const WhoAmIPage = (): ReactElement => {
  
  return <Layout>
    <div id={pageId} className="w-full h-full pt-36">
    <h1 className='text-8xl text-main'>Who am i?</h1>
    </div>
  </Layout>
  
}