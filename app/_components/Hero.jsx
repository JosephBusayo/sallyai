import { Button } from "@/components/ui/button";
import React from "react";

function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold sm:text-5xl text-primary">
            AI Course Generator.
            <p className="text-black text-2xl md:text-3xl sm:block ">
              Custom Learning Paths, Powered by AI
            </p>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Unlock personalized education with Ai-driven course creation. Tailor
            your learning journey to fit your unique goals and pace.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="/dashboard" >
                  <Button >Get started </Button>
                </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
