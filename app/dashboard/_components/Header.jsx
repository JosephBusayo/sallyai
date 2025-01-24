import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
        <a href="/">
        <h1 className="text-3xl text-primary">Sally</h1>
      </a>
      <UserButton />
    </div>
  );
}

export default Header;
