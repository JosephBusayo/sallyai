import React from 'react'
import { HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi2'
import EditChapters from './EditChapters'

function ChapterList({ course, refreshData, edit=true }) {
    return (
        <div className='mt-3'>
            <h2 className='font-medium text-xl'>Chapters</h2>
            <div className='mt-2'>
                {course?.courseOutput?.course?.chapters.map((chapter, index) => (
                    <div className='border p-5 rounded-lg mb-2 flex items-center justify-between' key={index}>
                        <div className='flex gap-2 md:items-center'>
                            <h2 className='bg-primary flex-none w-7 h-7 md:h-10 md:w-10 text-white p-1 md:p-2 rounded-full text-center'>{index + 1}</h2>
                            <div>
                                <h2 className='font-medium text-lg'>{chapter?.name} 
                                    {edit && <EditChapters course={course} index={index} refreshData={() => refreshData(true)}/>}
                                    </h2>
                                <p className='text-[11px] md:text-sm text-gray-500'>{chapter?.description}</p>
                                {chapter?.duration && <p className='flex gap-2 text-primary items-center'><HiOutlineClock />{chapter?.duration}</p>
                                }
                            </div>
                        </div>
                        <HiOutlineCheckCircle  className='text-4xl text-gray-300 flex-none hidden md:block'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList
