import { Zen_Dots } from "next/font/google";

//components imports
import Slider from "@/components/Home/slider";
import NewArrivals from "@/components/Home/new-arrivals";
import Category from "@/components/Home/category";
import MostLoved from "./most-loved";
import Review from "./review";

const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: "400",
});

const Hero = () => {
  return (
    <section className="min-h-screen">
      <div className="h-screen w-full relative">
        <div className="bg-black h-screen absolute opacity-50"></div>
        <video
          src="/videos/Cinematic Fitness Video (Featuring DVTraining).mp4"
          className="h-full w-full object-cover"
          // autoPlay
          loop
          muted 
        ></video>
        <h1
          className={`${zenDots.className} absolute bottom-2 tracking-widest text-[8vw] font-bold text-center w-full text-white`}
        >
          RepZone
        </h1>
      </div>
      <Slider />
      <div className="h-fit">
        <NewArrivals />
      </div>
      <Category />
      <MostLoved />
      <Review />
    </section>
  );
};

export default Hero;
