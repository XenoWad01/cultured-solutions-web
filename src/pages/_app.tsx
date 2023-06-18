import { ThreeBackground } from '@/components/THREE/three-background'
import { ThreeForeground } from '@/components/THREE/three-foreground'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
    
  return <>
  <Component {...pageProps} />
  </>
}