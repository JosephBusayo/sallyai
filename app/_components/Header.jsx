import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-md">
      {/* <Image src={'/logo.png'} width={150} height={100}/>*/}

      <h1 className="text-3xl">Sally</h1>
      <Button>Get started </Button>
    </div>
  );
}

export default Header;
