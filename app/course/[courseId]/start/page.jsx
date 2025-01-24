"use client"
import { db } from '@/app/configs/db'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { Chapters, CourseList } from '@/app/configs/schema'

function CourseStart({ params }) {
    const [course, setCourse] = useState()
    const [selectedChapter, setSelectedChapter] = useState()
    const [chapterContent, setChapterContent] = useState()

    useEffect(() => {
        params && GetCourse()
    }, [params])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))

        setCourse(result[0])
        GetSelectedChapterContent(0)
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)))
        setChapterContent(result[0])
        console.log(result)
    }
    return (
        <div>

            <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
                <h2 className='font-medium text-lg bg-primary p-3 text-white'>{course?.courseOutput?.course?.name}</h2>

                <div>
                    {course?.courseOutput?.course?.chapters.map((chapter, index) => (
                        <div key={index} className={`cursor-pointer hover:bg-green-200'
                        ${selectedChapter?.name == chapter?.name && 'bg-green-200'} `}
                            onClick={() => { setSelectedChapter(chapter); GetSelectedChapterContent(index) }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='md:ml-64'>
                <ChapterContent chapter={selectedChapter} content={chapterContent}/>
            </div>
        </div>
    )
}

export default CourseStart