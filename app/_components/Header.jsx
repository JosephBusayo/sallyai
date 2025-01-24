import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-md">
      {/* <Image src={'/logo.png'} width={150} height={100}/>*/}

      <a href="/">
        <h1 className="text-2xl md:text-3xl text-primary">Sally</h1>
      </a>
      <a href="/dashboard" >
        <Button >Get started </Button>
      </a>
    </div>
  );
}

export default Header;
