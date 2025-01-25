"use client"
import React, { useState } from 'react'
import { UserInputContext } from '../_context/UserInputContext';
import { UserButton } from '@clerk/nextjs';

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([])
  return (
    <div>
      <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
        <>
          <div className="flex justify-between items-center p-5 shadow-sm">
            <a href="/">
              <h1 className="text-3xl text-primary">Sally</h1>
            </a>

            <div className="flex">
              <h1 className="p-2 cursor:pointer md:hidden" ></h1>
              <UserButton />
            </div>
          </div>
          {children}
        </>
      </UserInputContext.Provider>
    </div>
  )
}

export default CreateCourseLayout