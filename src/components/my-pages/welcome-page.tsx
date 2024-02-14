import { ReactElement } from 'react'
import { Layout } from './full-page-layout'
import { BlackGlassContainer } from '../black-glass-container'

export const pageId = 'Welcome' as const

export const WelcomePage = (): ReactElement => {
  
  return <Layout>
    <div id={pageId} className="w-full h-full pt-36">
      <h1 className='text-8xl text-main'>Welcome</h1>
      <div className='ml-96'>
        <BlackGlassContainer>
          <h1>This here represents a game of life in 3d and is a WIP.</h1>
          <p>Also this is not how it will look as I want to morph between these states with a fraction passed in a shader such that the cell morphs from and to being instable before dying. And I also want to use the page colors seen above in the header. Each material is formed from 2 colors. I want to use those the same way that I interpolate the light and cursor color.</p>
          <p>It is not very optimized atm. The lag on scroll will also be fixed as I know the exact thing to tweak.(not relying on zustand for scroll state change and just directly using the optimized hook provided). I also just found out about https://motion.dev and https://protectwise.github.io/troika/three-instanced-uniforms-mesh/</p>
          <p>Being able to have diferent uniforms for diferent instances of a mesh was the main thing stopping me from using instancing but with this its basically solved. And motion runs animation or 'state' interpolations on the gpu and obviously doesent block the main js thread. </p>      
          <ul>
            <li>Small red cells are dead.</li> 
            <li>Small blue cells are about to be born.</li>
            <li>Green Cells are alive and will live to the next generation. </li>
            <li>'Instable' red cells are about to die.</li>
          </ul>
        </BlackGlassContainer>
      </div>

    </div>
  </Layout>
  
}