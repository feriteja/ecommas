import React from "react";
import Banner1 from "../../../../public/banner/banner1.png";
import Banner2 from "../../../../public/banner/banner2.png";
import Banner3 from "../../../../public/banner/banner3.png";
import Image from "next/image";

function BannerSection() {
  return (
    <div className="grid grid-rows-2 grid-flow-col items-center mx-auto w-fit gap-4">
      <div className="row-span-2 ">
        <Image
          src={Banner1}
          height={300}
          className="rounded-md w-full md:w-[700px] "
          alt={"Banner1"}
        />
      </div>
      <div className="row-span-1 ">
        <Image
          src={Banner1}
          height={125}
          className="rounded-md hidden md:block"
          alt={"Banner1"}
        />
      </div>
      <div className="row-span-1 ">
        <Image
          src={Banner1}
          height={125}
          className="rounded-md hidden md:block"
          alt={"Banner1"}
        />
      </div>
    </div>
  );
}

export default BannerSection;
