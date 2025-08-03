import React from "react";
import Rive from '@rive-app/react-canvas';
import animated from "./shadow_arrow.riv";

const TestAnimation = () => {
  return (
    <div className="w-full h-full absolute top-0 z-0">
      <Rive src={animated}  loop/>
      
    </div>
  );
};

export default TestAnimation;