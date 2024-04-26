import React from "react";
// import Banner1 from "../../../../public/banner/Banner1.png";
import Image from "next/image";

function BannerSection() {
  return (
    <div className="grid grid-rows-2 grid-flow-col items-center mx-auto gap-2 relative  w-fit">
      <div className="row-span-2">
        <Image
          src={"/banner/Banner1.png"}
          height={300}
          width={300}
          priority
          className="rounded-md w-full md:w-[700px] "
          alt={"Banner1"}
        />
      </div>
      <div className="row-span-1 ">
        <Image
          src={"/banner/Banner1.png"}
          height={120}
          width={300}
          priority
          className="rounded-md hidden md:block"
          alt={"Banner1"}
        />
      </div>
      <div className="row-span-1 ">
        <Image
          src={"/banner/Banner1.png"}
          height={120}
          width={300}
          priority
          className="rounded-md hidden md:block"
          alt={"Banner1"}
        />
      </div>
    </div>
  );
}

export default BannerSection;
