"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "./../../configs/db";
import ChapterList from "./_components/ChapterList";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import { CourseList } from './../../configs/schema';

function CourseLayout({ params }) {
    const { user } = useUser();
    const [course, setCourse] = useState([]);

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
    return (
        <div className="mt-10 px-7 md:px-20 lg:px-44">
            <h2 className="font-bold text-center text-2xl"> Course Layout </h2>

            <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
            <CourseDetail course={course} />
            <ChapterList course={course} />
        </div>
    );
}

export default CourseLayout;
