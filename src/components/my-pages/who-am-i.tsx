import { ReactElement } from 'react'
import { Layout } from './full-page-layout'
import { BlackGlassContainer } from '../black-glass-container'

export const pageId = 'WhoAmI' as const

export const WhoAmIPage = (): ReactElement => {
  
  return <Layout>
    <div id={pageId} className="w-full h-full pt-36">
      <h1 className='text-8xl text-main'>Who am i?</h1>
      <BlackGlassContainer>
        <h1>Who? Me!</h1>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, </p>
        <p>This is a post on an advanced topic of threejs that has to do with the position attributes of buffer geometry instances, and one way to go about transitioning between the two. In other words there is creating two geometries both with a similar count of points and lerping all the points from one state to another for another geometry that is the geometry used for a mesh object. This is then not a post for people that are new to threejs, so I trust that you have at least a little background when it comes to the basics. In any case in this section I will write about a few things you might want to read a little more on that is related to this sort of thing. </p>      
      </BlackGlassContainer>
    </div>
  </Layout>
  
}