import React, { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";

const instagramReels = [
  "https://www.instagram.com/reel/DG3CDyqzzpT/embed",
  "https://www.instagram.com/reel/DGVlseRM2Lt/embed",
  "https://www.instagram.com/reel/DG11punzhCA/embed",
  "https://www.instagram.com/reel/C0JiahxvNzE/embed",
  "https://www.instagram.com/reel/CzlFWyUSt2x/embed",
  "https://www.instagram.com/reel/CzoFHWRqF29/embed",
  "https://www.instagram.com/reel/C0ZGMAupslV/embed",
  "https://www.instagram.com/reel/DCvgaoJSoGb/embed",
  "https://www.instagram.com/reel/C_hpsXwPiBE/embed",
  "https://www.instagram.com/reel/C9fRif2yeQz/embed",
];

const InfluencerSpotlight = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".multiple-slide-carousel", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }, []);

  return (
    <div className="w-full py-16 bg-white relative">
      {/* Heading Section */}
      <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#3D342F] uppercase tracking-wide"
        style={{ fontFamily: "Cormorant Garamond, serif" }}>
        Influencer Spotlight
      </h2>
        <p className="text-[#8E7A69] text-sm md:text-lg mt-3 w-3/4 md:w-1/2 mx-auto"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}>
          Discover the trendsetters who are shaping the fashion world with their unique style and influence.
        </p>
      </div>

      {/* Swiper Container */}
      <div className="relative w-11/12 md:w-4/5 mx-auto">
        <div className="swiper multiple-slide-carousel swiper-container">
          <div className="swiper-wrapper mb-16">
            {instagramReels.map((reel, index) => (
              <div key={index} className="swiper-slide">
              <div className="bg-[#F5F3F0] shadow-lg rounded-lg h-[600px] min-h-[600px] flex justify-center items-center border border-[#E7A695] transition-transform transform hover:scale-105 overflow-hidden">
                <iframe
                  src={reel}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Updated for a Clean White Background */}
        <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-10 z-10 bg-[#3D342F] !w-12 !h-12 flex justify-center items-center rounded-full shadow-md hover:bg-[#8E7A69] transition-all duration-300">
          <svg
            className="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-10 z-10 bg-[#3D342F] !w-12 !h-12 flex justify-center items-center rounded-full shadow-md hover:bg-[#8E7A69] transition-all duration-300">
          <svg
            className="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InfluencerSpotlight;