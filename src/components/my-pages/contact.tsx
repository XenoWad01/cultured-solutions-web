import { ReactElement } from 'react'
import { Layout } from './full-page-layout'

export const pageId = 'Contact' as const

export const ContactPage = (): ReactElement => {
  
  return <Layout>
    <div id={pageId} className="w-full h-full pt-36">
    <h1 className='text-8xl text-main'>Contact</h1>
    </div>
  </Layout>
  
}