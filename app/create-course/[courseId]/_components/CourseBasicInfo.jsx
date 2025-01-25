"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
/* import { storge } from '@/configs/firebaseConfig' */
import Link from "next/link";
import axios from "axios";
import { db } from "@/app/configs/db";
import { CourseList } from "@/app/configs/schema";
import { eq } from "drizzle-orm";

function CourseBasicInfo({ course, refreshData, edit }) {
    const [selectedFile, setSelectedFile] = useState()
    const [uploadUrl, setUploadUrl] = useState("")

    useEffect(() => {
        if (course) {
            setSelectedFile(course?.courseBanner)
        }
    }, [course])

    const onFileSelected = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setSelectedFile(URL.createObjectURL(file));

        // Create form data for Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "sallyai")

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dvos6rdeb/image/upload`,
                formData
            );

            if (response.status === 200) {
                setUploadUrl(response.data.secure_url); // Cloudinary's hosted image URL
                console.log("File uploaded successfully:", response.data.secure_url);
                await db.update(CourseList).set({
                    courseBanner : uploadUrl
                }).where(eq(CourseList.id,course?.id)).execute
            } else {
                console.error("Failed to upload to Cloudinary:", response);
            }
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
        }
    };


    return (
        <div className="p-4 md:p-10 border rounded-xl shadow-sm mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h2 className="font-bold text-2xl md:text-3xl">
                        {course?.courseOutput?.course?.name}
                        {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}
                    </h2>
                    <p className="text-[14px] md:text-sm text-gray-400 mt-3">
                        {course?.courseOutput?.course?.description}
                    </p>
                    <h2 className="font-medium mt-2 flex gap-2 items-center">
                        <HiOutlinePuzzle />
                        {course?.category}
                    </h2>
                    {!edit && <Link href={`/course/${course?.courseId}/start`}>
                        <Button className="w-full mt-7">Start</Button>
                    </Link>}
                </div>

                <div>
                    <label htmlFor="upload-image">
                        <Image
                            className="w-full rounded-xl h-[200px] md:h-[300px] object-cover cursor-pointer"
                            src={selectedFile ? selectedFile : "/creative.png"}
                            alt="course-img"
                            width={300}
                            height={300}
                        />
                    </label>
                    {edit && <input type="file" id="upload-image" className="opacity-0" onChange={onFileSelected} />}
                </div>
            </div>
        </div>
    );
}

export default CourseBasicInfo;
