import { ReactElement } from 'react'
import { Layout } from './full-page-layout'

export const pageId = 'Welcome' as const

export const WelcomePage = (): ReactElement => {
  
  return <Layout>
    <div id={pageId} className="w-full h-full">
      <h1 className='text-8xl mt-36 text-white'>Hello</h1>
    </div>
  </Layout>
  
}