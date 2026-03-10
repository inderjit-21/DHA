import ScreenBlank from "@/components/common/ScreenBlank";
import AboutUs from "@/components/home/AboutUs";
import ChoseUs from "@/components/home/ChoseUs";
import HeroSection from "@/components/home/HeroSection";
import Sketcher from "@/components/home/Sketcher";


export default function Home() {
  return (
    <>
      {/* Main-Container */}
      <div className="w-full min-h-screen relative">
        <HeroSection/>
        <AboutUs/>
        <Sketcher/>
        <ScreenBlank/>
        <ChoseUs/>
      </div>
    </>
  );
}
