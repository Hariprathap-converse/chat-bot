import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      className="w-[22px] h-[22px] rounded-full animate-conic-spin"
      style={{
        background:
          "conic-gradient(from 90deg at 30% 50%, rgba(29, 87, 199, 0.0001) 0deg, #1D57C7 359.96deg, rgba(29, 87, 199, 0.0001) 360deg)",
        // clipPath: "circle(50% at 50% 50%)",
        WebkitMask:
          "radial-gradient(circle at 50% 50%, transparent 50%, black 60%)",
      }}
    />
  );
};

export default Loader;
