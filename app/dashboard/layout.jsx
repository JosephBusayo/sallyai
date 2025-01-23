"use client"

import React, { useState } from "react";
import SideBar from "./_components/Sidebar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([])

  return (
    <UserCourseListContext.Provider value={{userCourseList, setUserCourseList}}>

      <section>
        <div className="md:2-64 hidden md:block">
          <SideBar />
        </div>

        <div className="md:ml-64">
          <Header />
          <div className="p-10">{children}</div>
        </div>
      </section>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;
