import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className=' flex justify-end w-full shadow-sm p-4'>
      <UserButton/>
    </div>
  )
}

export default Header