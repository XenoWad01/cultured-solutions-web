import React, { ReactElement } from 'react'

type layoutProps = {
  children: ReactElement
}
export const Layout = ({ children }: layoutProps) => {
  return <div className='w-full h-full relative'>
    {children}
  </div>
}