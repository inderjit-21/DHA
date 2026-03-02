"use client";
import { PerspectiveCamera} from "@react-three/drei";
import { Canvas} from "@react-three/fiber";
import { useEffect, useState } from "react";

const CanvasSection = () => {
  const distance = 200;
  const [fov, setfov] = useState(75);

  useEffect(() => {
    const FovCalculator = () => {
      setfov(
        2 * Math.atan(window.innerHeight / (2 * distance)) * (180 / Math.PI),
      );
    };
    FovCalculator();
    window.addEventListener("resize", FovCalculator);
    return () => window.removeEventListener("resize", FovCalculator);
  }, []);

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[-1]">
      <Canvas className="w-full h-screen">
        <PerspectiveCamera makeDefault fov={fov} position={[0, 0, distance]} />
       
      </Canvas>
    </div>
  );
};

export default CanvasSection;