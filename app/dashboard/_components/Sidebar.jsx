"use client";
import React, { useContext } from "react";
import { TiHomeOutline } from "react-icons/ti";
import { GoStack } from "react-icons/go";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function SideBar() {
    const { userCourseList, setUserCourseList, toggle, setToggle } = useContext(UserCourseListContext); // Access toggle and setToggle from context
    const path = usePathname();

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
    ];

    const handleMenuClick = () => {
        setToggle(false); // Close sidebar when a menu item is clicked
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full w-[100vw] md:w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${toggle ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
        >
            <a href="/">
                <h1 className="text-3xl text-primary p-5">Sally</h1>
            </a>
            <hr className="my-5" />

            <ul>
                {Menu.map((item, index) => (
                    <Link href={item.path} key={index} onClick={handleMenuClick}>
                        <div
                            className={`flex items-center mb-3 gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg ${item.path === path && "bg-gray-100 text-black"
                                }`}
                        >
                            <div className="text-2xl">{item.icon}</div>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </ul>

            <div className="absolute bottom-10 w-[80%] px-5">
                <Progress value={(userCourseList?.length / 5) * 100} />
                <h2 className="text-sm my-2">
                    {userCourseList?.length} out of 5 courses created
                </h2>
                <h2 className="text-xs text-gray-500">
                    Upgrade your plan for unlimited course generation
                </h2>
            </div>
        </div>
    );
}

export default SideBar;
