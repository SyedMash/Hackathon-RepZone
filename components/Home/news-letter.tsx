import React from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const NewLetter = () => {
  return (
    <section className="relative h-[50vh] mt-12">
      <h1 className="text-red-900 text-[20vw] tracking-widest top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute">
        RepZone
      </h1>
      <div className="container mx-auto rounded-lg h-full bg-black/50 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center gap-5">
        <h1 className="uppercase text-center text-xl font-semibold">
          Subscribe to newsletter
        </h1>
        <form action="">
          <div className="flex border h-16 rounded-full items-center px-5">
            <input
              type="email"
              placeholder="enter your email"
              className="bg-transparent border-none outline-none h-full px-2"
            />
            <Button>
              <Send />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewLetter;
