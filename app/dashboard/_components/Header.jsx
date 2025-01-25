"use client"
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { UserButton } from "@clerk/nextjs";
import React, { useContext } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

function Header() {
  const { toggle, setToggle } = useContext(UserCourseListContext);

  const handleToggle = () => {
    setToggle(!toggle);
    console.log(toggle)
  };

  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <a href="/">
        <h1 className="text-3xl text-primary">Sally</h1>
      </a>

      <div className="flex">
        <h1 className="p-2 cursor:pointer md:hidden" onClick={handleToggle}><FaBarsStaggered /></h1>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
