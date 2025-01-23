import Image from 'next/image'
import React from 'react'
import { HiOutlinePuzzle } from 'react-icons/hi'
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from './EditCourseBasicInfo';


function CourseBasicInfo({ course, refreshData }) {
    return (
        <div className='p-10 border rounded-xl shadow-sm mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <h2 className='font-bold text-3xl'>{course?.courseOutput?.course?.name} <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)}/></h2>
                    <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.course?.description}</p>
                    <h2 className='font-medium mt-2 flex gap-2 items-center'> <HiOutlinePuzzle/>{course?.category}</h2>
                    <Button className="w-full mt-7">Start</Button>
                </div>

                <div>
                    <Image className="w-full rounded-xl h-[300px] object-cover" src={'/creative.png'} alt="course-img" width={300} height={300} />
                </div>
            </div>
        </div>
    )
}

export default CourseBasicInfo
