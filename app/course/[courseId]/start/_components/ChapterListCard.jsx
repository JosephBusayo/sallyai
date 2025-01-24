import React from 'react'
import { HiOutlineClock } from 'react-icons/hi2'


function ChapterListCard({chapter, index}) {
  console.log(`nav-chapter ${chapter}`)
  console.log(`nav_index ${index}`)
  return (
    <div className='grid grid-cols-5 p-5 items-center border-b'>
        <div>
            <h2 className='p-2 bg-primary text-white rounded-full'>{index+1}</h2>
        </div>
        <div className='col-span-4'>
            <h2 className='font-mediuw'>{chapter?.name}</h2>
            <h2 className='flex items-center gap-2 text-sm text-primary'> <HiOutlineClock/> {chapter?.duration} </h2>
        </div>
    </div>
  )
}

export default ChapterListCard