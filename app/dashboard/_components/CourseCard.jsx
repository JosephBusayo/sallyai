import Image from 'next/image'
import React from 'react'
import { HiOutlineBookOpen } from 'react-icons/hi2'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'
import DropdownOption from './DropdownOption'
import { CourseList } from '@/app/configs/schema'
import Link from 'next/link'


function CourseCard({ course, refreshData, displayUser=false }) {
    const handleOnDelete = async () => {
        const resp = await db.delete(CourseList)
            .where(eq(CourseList.id, course?.id))
            .returning({ id: CourseList?.id })

        if (resp) {
            refreshData()
        }
    }

    return (
        <div className='shadow-sm rounded-lg border p-2 md:hover:scale-105 transition-all cursor-pointer mt-4 '>
            <Link href={`/course/${course?.courseId}`}>
                <Image src={course?.courseBanner} width={300} height={300} className='w-full h-[150px] md:h-[200px] object-cover rounded-lg ' />
            </Link>

            <div className='p-2'>
                {/*install schcn dropdown*/}
                <h2 className='font-medium text-1xl md:text-lg flex justify-between items-center'>{course?.courseOutput?.course?.name}
                    {!displayUser && <DropdownOption handleOnDelete={() => handleOnDelete()}>
                        <HiMiniEllipsisVertical />
                    </DropdownOption>}
                </h2>
                <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
                <div className='flex items-center justify-between'>
                    <h2 className='flex gap-2 items-cente text-primary text-sm rounded-sm'><HiOutlineBookOpen />{course?.courseOutput?.course?.numberOfChapters} 2 Chapters</h2>
                    <h2 className='text-sm text-primary p-1 rounded-sm'>{course?.level} </h2>
                </div>

                <div className='flex gap-2 items-center mt-2'>
                    <Image src={course?.userProfileImage} width={30} height={30} className='rounded-full'/>
                    <h2 className='text-sm'>{course?.userName}</h2>
                </div>
            </div>
        </div>
    )
}

export default CourseCard