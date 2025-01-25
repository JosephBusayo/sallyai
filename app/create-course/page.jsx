"use client";

import React, { useContext, useEffect, useState } from "react";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiLightBulb } from "react-icons/hi2";
import { HiClipboardCheck } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOptions from "./_components/SelectOptions";
import { UserInputContext } from "./../_context/UserInputContext";
import { GenerateCourseLayout_AI2 } from "./../configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { CourseList } from "./../configs/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from './../configs/db';

function CreateCourse() {
    const StepperOptions = [
        {
            id: 1,
            name: "category",
            icon: <HiMiniSquares2X2 />,
        },
        {
            id: 2,
            name: "Topic & Desc",
            icon: <HiLightBulb />,
        },
        {
            id: 3,
            name: "Options",
            icon: <HiClipboardCheck />,
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [loading, setLoading] = useState(false);
    const { user } = useUser()
    const router = useRouter()
    useEffect(() => {
        console.log(userCourseInput);
    }, [userCourseInput]);

    /* Used to make next button enabled or disabled*/
    const checkStatus = () => {
        if (userCourseInput?.length == 0) {
            return true;
        }
        if (
            activeIndex == 0 &&
            (userCourseInput?.category?.length == 0 ||
                userCourseInput?.category == undefined)
        ) {
            return true;
        }
        if (
            activeIndex == 1 &&
            (userCourseInput?.topic?.length == 0 ||
                userCourseInput?.topic == undefined)
        ) {
            return true;
        } else if (
            activeIndex == 2 &&
            (userCourseInput?.level == undefined ||
                userCourseInput?.duration == undefined ||
                userCourseInput?.displayVideo == undefined ||
                userCourseInput?.noOfChapters == undefined)
        ) {
            return true;
        }
        return false;
    };

    const JSON_DEFAULT_FORMAT = `{
  "course": {
    "category": "course category",
    "topic": "course topic",
    "level": "course level",
    "duration": "course duration",
    "name": "course name",
    "description": "course description",
    "chapters": [
      {
        "number": "chapter number",
        "name": "chapter name",
        "description": "chapter description",
        "duration": "duration"
      },
    ]
  }
}`

    const generateCourseLayout = async (userCourseInput) => {
        setLoading(true);

        const BASIC_PROMPT =
            `Generate a course tutorial on the following details in strict JSON format with fields for course name, description, chapter names, about, and duration following strictly this structure ${JSON_DEFAULT_FORMAT}`;
        const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapters}, in JSON format`;
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
        console.log("Final Prompt:", FINAL_PROMPT);

        try {
            const result = await GenerateCourseLayout_AI2.sendMessage(FINAL_PROMPT);
            const responseText = result.response?.text();
            console.log("Response Text:", responseText);

            // Check if the response contains JSON markers and clean it
            const cleanedResponse = responseText?.replace(/```json|```/g, "").trim();
            const parsedResponse = JSON.parse(cleanedResponse);
            console.log("Parsed Response:", parsedResponse);
            setLoading(false);
            SaveCourseLayoutInDb(JSON.parse(cleanedResponse))
            return parsedResponse;
        } catch (error) {
            console.error("Error generating course layout:", error);
            setLoading(false);
            throw error;
        }
    };
    const SaveCourseLayoutInDb = async (courseLayout) => {
        var id = uuid4()
        setLoading(true);
        const result = await db.insert(CourseList).values({
            courseId: id,
            name: userCourseInput?.topic,
            level: userCourseInput?.level,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            UserProfileImage: user?.imageUrl
        });
        console.log("Saved to DB")
        setLoading(false)
        router.replace(`/create-course/${id}`);
    };
    return (
        <div>
            {/* Stepper*/}
            <div className="flex flex-col justify-center items-center mt-10">
                <h2 className="text-4xl text-primary font-medium">Create Course</h2>

                    <div className="flex mt-10">
                        {StepperOptions.map((item, index) => (
                            <div className="flex items-center" key={index}>
                                <div className="flex flex-col items-center w-[80px] md:w-[100px]">
                                    <div
                                        className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && "bg-primary"
                                            }`}
                                    >
                                        {item.icon}
                                    </div>
                                    <h2 className="md:blcok text-[13px] md:text-sm"> {item.name}</h2>
                                </div>

                                {index != StepperOptions?.length - 1 && (
                                    <div
                                        className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index && "bg-blue-500"
                                            }`}
                                    >
                                        {" "}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                <div className="px-10 md:px-20 lg:px-44 mt-6 md:mt-10">
                    {/*Component*/}
                    {activeIndex == 0 ? (
                        <SelectCategory />
                    ) : activeIndex == 1 ? (
                        <TopicDescription />
                    ) : (
                        <SelectOptions />
                    )}
                    {/*Next Previous Button*/}
                    <div className="flex justify-between mt-10">
                        <Button
                            disabled={activeIndex == 0}
                            variant="outline"
                            onClick={() => setActiveIndex(activeIndex - 1)}
                        >
                            Previous
                        </Button>

                        {activeIndex < 2 && (
                            <Button
                                disabled={checkStatus()}
                                onClick={() => setActiveIndex(activeIndex + 1)}
                            >
                                Next
                            </Button>
                        )}
                        {activeIndex == 2 && (
                            <Button
                                disabled={checkStatus()}
                                onClick={() => generateCourseLayout(userCourseInput)}
                            >
                                Generate Course Layout
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    );
}

export default CreateCourse;
