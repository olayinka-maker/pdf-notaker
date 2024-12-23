"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DialogDemo } from './Dashboarddialog'
import { Shield, WorkflowIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const currentPath = usePathname()

  return (
    <div className='shadow-md h-screen text-black'>
      <div className='flex items-center justify-center mt-4'>
        <Image
          src={'/cards.jpeg'}
          alt='logo'
          width={100}
          height={100}
        />
      </div>
      <div>
        <div className='w-full mt-7 flex-col flex gap-y-4 items-center justify-center'>
          <DialogDemo>+ Upload Pdf File </DialogDemo>
          <Link href={'/dashboard/workspace'}>
            <Button className={`text-black py-4  border-none w-[90%] flex items-center justify-center ${currentPath === '/dashboard/workspace' ? 'bg-gray-300' : 'bg-white '}`}>
              <WorkflowIcon />
              <p>WorkSpace</p>
            </Button>
          </Link>
          <Link href={'/dashboard/upgrade'} >
            <Button className={`text-black py-4 w-[90%] border-none flex items-center justify-center ${currentPath === '/dashboard/upgrade' ? 'bg-gray-200' : 'bg-white rounded-none '}`}>
              <Shield />
              <p>Upgrade</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar