// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import { Link } from "react-router-dom";
// register Swiper custom elements
register();

// bg-[url('./public/showcase-bg.jpg')]
//autoplay
const Hero = () => {
  return (
    <section className=" bg-[url('/carousel-2.jpg')] bg-no-repeat bg-cover z-0 min-h-52">
      <div className="bg-black bg-opacity-80 w-full px-2 md:px-6 lg:px-8 ">
        <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center py-4 md:py-8 lg:py-10">
          Now Playing
        </h1>
        <swiper-container
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#000",
          }}
          scrollbar="true"
          space-between={10}
          speed="500"
          loop="true"
          css-mode="true"
          navigation="true"
          pagination="false"
          draggable="true"
          autoplay-delay="3000"
          // height="1184"
          // width="1184"
          //   className="flex pb-4 md:py-6"
          //   autoplay
          breakpoints={JSON.stringify({
            640: {
              slidesPerView: 1,
              // spaceBetween: 10,
            },

            768: {
              slidesPerView: 3,
              // spaceBetween: 10,
            },

            1024: {
              slidesPerView: 4,
              // spaceBetween: 10,
            },
          })}
        >
          <swiper-slide>
            <div className="bg-black">
              <Link className="flex justify-center flex-col items-center pb-2 gap-4">
                <img src="/poster.jpeg" alt="" />
                <p>RATE 10/10</p>
              </Link>
            </div>
          </swiper-slide>
          <swiper-slide>
          <div className="bg-black">
              <Link className="flex justify-center flex-col items-center pb-2 gap-4">
                <img src="/poster.jpeg" alt="" />
                <p>RATE 10/10</p>
              </Link>
            </div>
          </swiper-slide>
          <swiper-slide>
          <div className="bg-black">
              <Link className="flex justify-center flex-col items-center pb-2 gap-4">
                <img src="/poster.jpeg" alt="" />
                <p>RATE 10/10</p>
              </Link>
            </div>
          </swiper-slide>
          <swiper-slide>
          <div className=" bg-black">
              <Link className="flex justify-center flex-col items-center pb-2 gap-4">
                <img src="/poster.jpeg" alt="" />
                <p>RATE 10/10</p>
              </Link>
            </div>
          </swiper-slide>
          <swiper-slide>
          <div className=" bg-black">
              <Link className="flex justify-center flex-col items-center pb-2 gap-4">
                <img src="/poster.jpeg" alt="" />
                <p>RATE 10/10</p>
              </Link>
            </div>
          </swiper-slide>
          ...
        </swiper-container>
      </div>
    </section>
  );
};

export default Hero;
