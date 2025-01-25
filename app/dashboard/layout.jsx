"use client"

import React, { useState } from "react";
import SideBar from "./_components/Sidebar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([])
  const [toggle, setToggle] = useState(false);

  return (
    <UserCourseListContext.Provider value={{userCourseList, setUserCourseList, toggle, setToggle}}>

      <section>
        <div className="md:2-64 absolute md:block">
          <SideBar />
        </div>

        <div className="md:ml-64">
          <Header />
          <div className="p-4 md:p-10">{children}</div>
        </div>
      </section>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;
