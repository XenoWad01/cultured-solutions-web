

import { a } from '@react-spring/three'
import { BoxGeometry, Color, MeshPhongMaterial, Vector3 } from 'three'
import { gameConfig } from './config'
import { config, useSpring, useSpringValue } from '@react-spring/three'
import { useGameStore } from '@/stores/game-store'
import { usePageStore } from '@/stores/page-store'
import { createMaterialFromColors } from '@/shaders/cell/material'
import { useEffect, useMemo, useRef } from 'react'
import { useProxy } from 'valtio/utils'
import { mousePositionSnapshot } from '@/stores/valtio-mutable-mouse-position'
import { useFrame  } from '@react-three/fiber'
import { lerp } from "three/src/math/MathUtils";

const red = new Vector3(1,0,0)  
const almostREd = new Vector3(0.7,0.1,0.1)
const green = new Vector3(0,1,0)
const white = new Vector3(1,1,1)
const blue = new Vector3(0,0,1)


export const Cell = ({position: {x,y,z}}) => {
    const { prevGameState, gameState, nextGameState } = useGameStore()
  
    const pageStore = usePageStore()
    const cellRef = useRef(null)



  useEffect(() => {
    if(x ===0 && y ===0 && z === 0) {
      console.log('PREVIOUS: ', prevGameState[x][y][z])
      console.log('CURRENT : ', gameState[x][y][z])
      console.log('NEXT    : ', nextGameState[x][y][z])
    }



  }, [prevGameState, gameState, nextGameState, x, y, z])

    let $mouseStore = useProxy(mousePositionSnapshot)
    const willDieNextGeneration = useMemo(() => !nextGameState[x][y][z] && gameState[x][y][z], [nextGameState, gameState, x,y,z])
    const willBeBornNextGeneration = useMemo(() => nextGameState[x][y][z] && !gameState[x][y][z], [nextGameState, gameState, x,y,z])

    const fadeStyles = useSpring({
        config: { ...config.slow },
  
 
        to: {
          scale: willDieNextGeneration ? 0.9 : gameState[x][y][z] ? 1 : 0.1
        },
    });




    const geometry = useMemo(() => new BoxGeometry(
      gameConfig.size, 
      gameConfig.size, 
      gameConfig.size,
      willDieNextGeneration ? gameConfig.aboutToDieCubeSegments : gameConfig.defaultCubeSegments,
      willDieNextGeneration ? gameConfig.aboutToDieCubeSegments : gameConfig.defaultCubeSegments,
      willDieNextGeneration ? gameConfig.aboutToDieCubeSegments : gameConfig.defaultCubeSegments
      ), [willDieNextGeneration])

    const computedColor1 = useMemo(() => new Vector3(
        lerp(pageStore.pageColor1.r, pageStore.nextPageColor1.r, pageStore.progressToNextPage), 
        lerp(pageStore.pageColor1.g, pageStore.nextPageColor1.g, pageStore.progressToNextPage),
        lerp(pageStore.pageColor1.b, pageStore.nextPageColor1.b, pageStore.progressToNextPage)
        ), [pageStore])
    
      const computedColor2 = useMemo(() => new Vector3(
        lerp(pageStore.pageColor2.r, pageStore.nextPageColor2.r, pageStore.progressToNextPage), 
        lerp(pageStore.pageColor2.g, pageStore.nextPageColor2.g, pageStore.progressToNextPage),
        lerp(pageStore.pageColor2.b, pageStore.nextPageColor2.b, pageStore.progressToNextPage)
        ), [pageStore])
    

  const { noiseFreq, noiseAmp, scale } = useSpring({
    noiseFreq: $mouseStore.clicked ? 1 : 0.01,
    scale: $mouseStore.clicked ? 0.2 : 0.1,
    noiseAmp: $mouseStore.clicked ? 0.15 : 0.01,
    config: config.gentle
  })


    const cursorMaterial = useMemo(() => createMaterialFromColors(pageStore.pageColor1), [pageStore])
   
    useFrame((state) => {
  

        if (cellRef.current.material) {
          (cellRef.current.material).uniforms.time.value = state.clock.elapsedTime;
          (cellRef.current.material).uniforms.noiseFreq.value = willDieNextGeneration ? 1 : 0;
          (cellRef.current.material).uniforms.noiseAmp.value = willDieNextGeneration ? 0.15 : 0;


          if (willDieNextGeneration) {
            (cellRef.current.material).uniforms.color.value = almostREd
          } else if (willBeBornNextGeneration) {
            (cellRef.current.material).uniforms.color.value = blue
          } else  if (gameState[x][y][z]) {
            (cellRef.current.material).uniforms.color.value = green
          } else if (!gameState[x][y][z]) {
            (cellRef.current.material).uniforms.color.value = red
          }






          // (cellRef.current.material).uniforms.aboutToDie.value = willDieNextGeneration;
          
        }
      });
    return <a.mesh
            ref={cellRef}
            castShadow={true}
            receiveShadow={true}
            position={[( x - .5 * gameConfig.side ) * gameConfig.size, ( y - .5 * gameConfig.side ) * gameConfig.size, ( z - .5 * gameConfig.side ) * gameConfig.size]}
            material={cursorMaterial}
            geometry={geometry}
            scale={fadeStyles.scale}
        />
}