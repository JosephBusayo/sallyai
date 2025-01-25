"use client";
import { db } from "@/app/configs/db";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { Chapters, CourseList } from "@/app/configs/schema";
import { UserButton } from "@clerk/nextjs";
import { FaBarsStaggered } from "react-icons/fa6";

function CourseStart({ params }) {
    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState();
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
        console.log(toggle);
    };

    useEffect(() => {
        params && GetCourse();
    }, [params]);

    const GetCourse = async () => {
        const result = await db
            .select()
            .from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId));

        setCourse(result[0]);
        GetSelectedChapterContent(0);
    };

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db
            .select()
            .from(Chapters)
            .where(
                and(
                    eq(Chapters.chapterId, chapterId),
                    eq(Chapters.courseId, course?.courseId)
                )
            );
        setChapterContent(result[0]);
        console.log(result);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center p-5 shadow-sm">
                <a href="/">
                    <h1 className="text-3xl text-primary">Sally</h1>
                </a>

                <div className="flex">
                    <h1
                        className="p-2 cursor-pointer md:hidden"
                        onClick={handleToggle}
                    >
                        <FaBarsStaggered />
                    </h1>
                    <UserButton />
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed w-[100vw] md:w-72 md:block h-screen border-r shadow-sm bg-white transform transition-transform duration-300 ease-in-out ${toggle ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                <div>
                    {course?.courseOutput?.course?.chapters.map((chapter, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer hover:bg-blue-200 ${selectedChapter?.name === chapter?.name && "bg-blue-200"
                                }`}
                            onClick={() => {
                                setSelectedChapter(chapter);
                                GetSelectedChapterContent(index);
                                setToggle(false)
                            }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="md:ml-72">
                <ChapterContent
                    chapter={selectedChapter}
                    content={chapterContent}
                />
            </div>
        </div>
    );
}

export default CourseStart;
