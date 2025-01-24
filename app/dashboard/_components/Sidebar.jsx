"use client";
import Image from "next/image";
import React, { useContext } from "react";
import {
    TiHomeOutline,
    HiOutlineShieldCheck,
    HiOutlinePower,
} from "react-icons/ti";
import { GoStack } from "react-icons/go";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { IoPowerOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress"
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";


function SideBar() {
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)

    const Menu = [
        {
            id: 1,
            name: "Home",
            icon: <TiHomeOutline />,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Explore",
            icon: <GoStack />,
            path: "/dashboard/explore",
        },
        {
            id: 3,
            name: "Upgrade",
            icon: <IoShieldCheckmarkOutline />,
            path: "/dashboard/upgrade",
        },
    /*     {
            id: 4,
            name: "Logout",
            icon: <IoPowerOutline />,
            path: "/dashboard/logout",
        }, */
    ];

    const path = usePathname();
    return (
        <div className="fixed h-full md:w-64 p-5 shadow-md">
            <a href="/">
                <h1 className="text-3xl text-primary">Sally</h1>
            </a>
            <hr className="my-5" />

            <ul>
                {Menu.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <div
                            className={`flex items-center mb-3 gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg ${item.path == path && "bg-gray-100 text-black"
                                }`}
                        >
                            <div className="text-2xl">{item.icon}</div>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </ul>

            <div className="absolute bottom-10 w-[80%]">
                <Progress value={(userCourseList?.length / 5) * 100} />
                <h2 className="text-sm my-2">{userCourseList?.length} out of 5 courses created</h2>
                <h2 className="text-xs text-gray-500">Upgrade your plan for unlimited course generation</h2>
            </div>
        </div>
    );
}

export default SideBar;
