import { ReactElement } from 'react'
import { Layout } from './full-page-layout'

export const pageId = 'Projects' as const

export const ProjectsPage = (): ReactElement => {
  
  return <Layout>
    <div id={pageId} className="w-full h-full pt-36">
    <h1 className='text-8xl text-main'>Projects</h1>
    </div>
  </Layout>
  
}