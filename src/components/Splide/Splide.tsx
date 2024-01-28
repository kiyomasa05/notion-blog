"use client";
import Image from "next/image";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Slider = () => {
  return (
    <Splide
      hasTrack={false}
      options={{
        rewind: true,
      }}
      aria-label="Top Slider"
    >
      <SplideTrack>
        <SplideSlide>
          <Image
            src="/youkoso.jpg"
            height={600}
            width={850}
            alt="topimage"
            className="lg:h-5/6 lg:w-4/6 h-fit"
            priority={true}
          />
        </SplideSlide>
        <SplideSlide>
          <Image
            src="/youkoso.jpg"
            height={600}
            width={850}
            alt="topimage"
            className="lg:h-5/6 lg:w-4/6 h-fit"
            priority={true}
          />
        </SplideSlide>
      </SplideTrack>
    </Splide>
  );
};

export default Slider;
