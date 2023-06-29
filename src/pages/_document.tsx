import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='scroll-smooth overpass-mono' style={{scrollBehavior:'smooth'}}>
      <Head />
      <body className='w-screen h-screen relative'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
