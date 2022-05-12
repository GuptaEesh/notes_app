import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col h-[10rem] gap-2 ">
      <div className="loader-skeleton flex flex-col-reverse rounded-sm"></div>
      <section className="flex gap-2">
        <div className="h-6 bg-light_glass flex-[10] rounded-sm"></div>
        <div className="h-6 w-6 bg-light_glass flex-[1] rounded-full"></div>
        <div className="h-6 w-6 bg-light_glass flex-[1] rounded-full"></div>
      </section>
    </div>
  );
};

export { SkeletonLoader };
