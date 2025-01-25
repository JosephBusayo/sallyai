import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from "./../../_context/UserInputContext";

function TopicDescription() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };
    return (
        <div className="mx-4 my-4 md:mx-20 lg:mx-44">
            {/* Topic*/}
            <div>
                <label className="text-sm md:text-xl">
                    Write the topic for which you want to create a course (e.g python,
                    fitness, yoga)
                </label>
                <Input
                    placeholder={"Topic"}
                    className="h-14 text-sm md:text-xl"
                    defaultValue = {userCourseInput?.topic}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label>Describe the topic in detail</label>
                <Textarea
                    className="h-24 text-sm md:text-xl"
                    placeholder={"About your course"}
                    defaultValue = {userCourseInput?.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                />
            </div>
            {/* Text area desc*/}
        </div>
    );
}

export default TopicDescription;
