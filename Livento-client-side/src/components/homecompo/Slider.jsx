import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

const Slider = ({ data }) => {
  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          
        }}
        navigation={true}
        className="w-full h-full"
      >
        {data.
        filter(item => item.ratings && item.ratings.length > 0)
        .map((item, index) => {
          const rating = item.ratings[0]; // single review object

          return (
            <SwiperSlide key={index}>
              {/* Background Image */}
              <div
                className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] flex items-center justify-center bg-center bg-cover"
                style={{
                  backgroundImage: `url(${item.image}?auto=format&fit=crop&w=1200&q=80)`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 text-start sm:text-center max-w-3xl px-4 sm:px-6 md:px-8 lg:px-10">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
                    {item.propertyName}
                  </h1>

                  <p className="text-gray-200 italic text-sm sm:text-lg md:text-xl mb-6">
                    "{rating.reviewText}"
                  </p>

                  <div className="flex  px-6 sm:px-0 sm:justify-center gap-1 sm:gap-2 mb-4 text-sm sm:text-lg md:text-xl ">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-yellow-400   ${
                          i < rating.starRating ? "" : "opacity-40"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300 font-medium text-xs sm:text-sm md:text-base mb-6">
                    Reviewed by{" "} <br className="sm:hidden"/>
                    <span className="text-[#FFD580] font-semibold">
                      {rating.reviewerName}
                    </span>{" "}<br className="sm:hidden"/>
                    on{" "}
                    {new Date(rating.reviewDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <Link to='/properties'>
                  <button className="mt-4 slice px-2 sm:px-8 py-2 sm:py-3 bg-[#EC6325] hover:bg-[#d15c20] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 text-sm sm:text-base">
                    <span className="text">Explore All Properties →</span>
                  </button>
                  </Link>
                </div>

                {/* Floating Info Card */}
                <div className="absolute bottom-5 sm:bottom-10 right-[2%] lg:right-10 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-lg text-white text-left w-30 sm:w-50 lg:w-72 border border-white/20">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{item.category}</h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2">{item.location}</p>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-[#FFD580]">
                    ${item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2 sm:mt-3">
                    <img
                      src={item.postedBy.profilePhoto}
                      alt={item.postedBy.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 border border-white/40"
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">
                        {item.postedBy.name}
                      </p>
                      <p className="text-[10px] sm:text-xs opacity-80">
                        Posted:{" "}
                        {new Date(item.postedDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
