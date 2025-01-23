"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "./../../configs/db";
import ChapterList from "./_components/ChapterList";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import { CourseList } from './../../configs/schema';
import { Button } from "@/components/ui/button";
import { GenerateCourseLayout_AI2 } from "@/app/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";

function CourseLayout({ params }) {
    const { user } = useUser();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        params && GetCourse();
    }, [params, user]);

    const GetCourse = async () => {
        try {
            const query = db
                .select()
                .from(CourseList)
                .where(
                    and(
                        eq(CourseList.courseId, params?.courseId),
                        eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                );

            const result = await query;
            setCourse(result[0]);
            console.log(result.length);
        } catch (error) {
            console.error("Error in GetCourse:", error);
        }
    };

    const GenerateChapterContent = () => {
        setLoading(true);
        const chapters = course?.courseOutput?.course?.chapters

        chapters.forEach(async (chapter, index) => {
            const PROMPT = `Explain the concept in Detail on Topic:${course?.name}, Chapter:${chapter?.name} strictly in JSON format with list of array with fields as title, description in detail and Code Example(if applicable)`;
            console.log(PROMPT)

            if (index >= 0) {
                try {
                    const result = await GenerateCourseLayout_AI2.sendMessage(PROMPT)
                    const responseText = result.response?.text();
                    console.log("Response Text:", responseText);
                    setLoading(false);

                } catch (e) {
                    setLoading(false);
                    console.log(e)
                }
            }
        })
    }
    return (
        <div className="mt-10 px-7 md:px-20 lg:px-44">
            <h2 className="font-bold text-center text-2xl"> Course Layout </h2>

            <LoadingDialog loading={loading} />
            <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
            <CourseDetail course={course} />
            <ChapterList course={course} refreshData={() => GetCourse()} />

            <Button className="my-10" onClick={GenerateChapterContent}>Generate course content</Button>
        </div>
    );
}

export default CourseLayout;
