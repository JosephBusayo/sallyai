import React from "react";
import CategoryList from "../../_shared/CategoryList";
import Image from "next/image";
import { UserInputContext } from "../../_context/UserInputContext";
import { useContext } from "react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category,
    }));
  };
  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5">Select course category</h2>

      <div className="grid grid-cols-3 gap-10 ">
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-green-200 cursor-pointer ${userCourseInput.category == item.name && 'border-primary bg-green-200'}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} width={50} height={50} alt="cat-icon" />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
