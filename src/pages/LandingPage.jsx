import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  // className="h-screen flex items-center justify-center"
  return (
    <main className=" pt-10 md:pt-20 lg:pt-40 ">
      <section className="container m-auto my-6 md:my-8 lg:my-10 px-2 md:px-6 lg:px-8 ">
        <div className="md:max-w-5xl lg:max-w-7xl border-8 rounded-lg p-4 md:p-8 text-center mx-auto flex flex-col items-center justify-centerborder-gray-600 ">
          <h1 className="text-2xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-4">Welcome to TVSync</h1>
          <p className="my-4 md:text-xl md:w-2/3 lg:w-full">
            Dive into a world of entertainment with our curated collection of
            trending movies and tv shows.
          </p>
          <p className="md:text-xl md:w-2/3">
            Explore top-rated movies and binge-worthy series on our platform.
            Your next favourite show awaits!
          </p>
        </div>
        <div className="max-w-xl border-8 rounded-lg mt-8 md:mt-10 p-4 md:p-8 mx-auto flex flex-col items-center justify-center text-center gap-3 border-x-red-500 border-y-yellow-500">
            <p className="md:text-xl">Create an account below to checkout what everyone is watching.</p>
            <Link to="/register" className="block px-6 py-2 md:px-10 md:py-3 rounded-md bg-transparent bg-gradient-to-r from-pink-500 to-yellow-500 md:text-lg">Create account</Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
