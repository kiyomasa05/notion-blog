"use client";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";

const Slider = () => {
  const options = {
    type: "loop",
    autoplay: true, //自動再生を有効にするかどうかを決定
    pauseOnHover: false, //マウスオーバーしたときに自動再生を停止するかどうかを決定
    resetProgress: false, //自動再生が中断されたのち再開する際、それまでの経過時間を維持するか破棄するかを決定
  };
  return (
    <Splide hasTrack={false} options={options} aria-label="Top Slider">
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
      <div className="splide__progress">
        <div className="splide__progress__bar" />
      </div>
      <button className="splide__toggle" type="button">
        <span className="splide__toggle__play">Play</span>
        <span className="splide__toggle__pause">Pause</span>
      </button>
    </Splide>
  );
};

export default Slider;
