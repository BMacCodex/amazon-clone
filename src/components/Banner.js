import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactDOM from "react-dom";
import Image from "next/image";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoplay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image
            loading="lazy"
            src="https://links.papareact.com/gi1"
            alt=""
            width="2000"
            height="2000"
          />
        </div>
        <div>
          <Image
            loading="lazy"
            src="https://links.papareact.com/6ff"
            alt=""
            width="2000"
            height="2000"
          />
        </div>
        <div>
          <Image
            loading="lazy"
            src="https://links.papareact.com/7ma"
            alt=""
            width="2000"
            height="2000"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
