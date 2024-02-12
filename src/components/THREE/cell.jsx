

import { a } from '@react-spring/three'
import { BoxGeometry, Color, MeshPhongMaterial, Vector3 } from 'three'
import { gameConfig } from './config'
import { config, useSpring } from '@react-spring/web'
import { useGameStore } from '@/stores/game-store'
import { usePageStore } from '@/stores/page-store'
import { createMaterialFromColors } from '@/shaders/cursor/material'
import { useMemo, useRef } from 'react'
import { useProxy } from 'valtio/utils'
import { mousePositionSnapshot } from '@/stores/valtio-mutable-mouse-position'
import { useFrame  } from '@react-three/fiber'
import { lerp } from "three/src/math/MathUtils";
import { MeshDistortMaterial } from '@react-three/drei'

// const cellMaterial = new MeshPhongMaterial({color: new Color("rgb(23,23,23)")})
// const cellMaterial = new MeshWobbleMaterial({ factor: 1, speed: 10})
const cellGeometry = new BoxGeometry(gameConfig.size, gameConfig.size, gameConfig.size, 10,10,10)


// props: {
//     position: {
//         x: number,
//         y: number,
//         z: number
//     },
//     isAlive: boolean
// }

export const Cell = (props) => {
    const { gameState } = useGameStore()
    // const pageStore = usePageStore()
    // const cellRef = useRef(null)

    // let $mouseStore = useProxy(mousePositionSnapshot)


    const fadeStyles = useSpring({
        config: { ...config.stiff },
        from: { scale: 0 },
        to: {
            scale: gameState[props.position.x][props.position.y][props.position.z] ? 1 : 0
        },
    });

//     const computedColor1 = useMemo(() => new Vector3(
//         lerp(pageStore.pageColor1.r, pageStore.nextPageColor1.r, pageStore.progressToNextPage), 
//         lerp(pageStore.pageColor1.g, pageStore.nextPageColor1.g, pageStore.progressToNextPage),
//         lerp(pageStore.pageColor1.b, pageStore.nextPageColor1.b, pageStore.progressToNextPage)
//         ), [pageStore])
    
//       const computedColor2 = useMemo(() => new Vector3(
//         lerp(pageStore.pageColor2.r, pageStore.nextPageColor2.r, pageStore.progressToNextPage), 
//         lerp(pageStore.pageColor2.g, pageStore.nextPageColor2.g, pageStore.progressToNextPage),
//         lerp(pageStore.pageColor2.b, pageStore.nextPageColor2.b, pageStore.progressToNextPage)
//         ), [pageStore])
    

//   const { noiseFreq, noiseAmp, scale } = useSpring({
//     noiseFreq: $mouseStore.clicked ? 1 : 0.01,
//     scale: $mouseStore.clicked ? 0.2 : 0.1,
//     noiseAmp: $mouseStore.clicked ? 0.15 : 0.01,
//     config: config.gentle
//   })


//     const cursorMaterial = useMemo(() => createMaterialFromColors(pageStore.pageColor1, pageStore.pageColor2), [pageStore])
   
//     useFrame((state) => {
//         if (cellRef.current.material) {
//           (cellRef.current.material).uniforms.time.value = state.clock.elapsedTime;
//           (cellRef.current.material).uniforms.noiseFreq.value = noiseFreq.get();
//           (cellRef.current.material).uniforms.noiseAmp.value = noiseAmp.get();
//           (cellRef.current.material).uniforms.color1.value = computedColor1;
//           (cellRef.current.material).uniforms.color2.value = computedColor2;
  
//           cellRef.current.rotateX += state.clock.elapsedTime;
//         }
//       });
    return <a.mesh
            castShadow={true}
            receiveShadow={true}
            position={[( props.position.x - .5 * gameConfig.side ) * gameConfig.size, ( props.position.y - .5 * gameConfig.side ) * gameConfig.size, ( props.position.z - .5 * gameConfig.side ) * gameConfig.size]}
            // material={cellMaterial}
            geometry={cellGeometry}
            scale={fadeStyles.scale}
        >
              <MeshDistortMaterial factor={1} speed={5} color={new Color(0.7,0.2,0)} />    
        </a.mesh>
}