import React from "react";
import heroBgL from "../../assets/bg-hero-left.png";
import heroBgR from "../../assets/bg-hero-right.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";


const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-[#FFE6FD] via-white to-[#E0F8F5]">
            {/* Decorative curves */}
            <div className="pointer-events-none bg-cover bg-center bg-no-repeat absolute left-0 top-0 hidden h-full w-72 opacity-90 md:block"
                style={{
                    backgroundImage: `url(${heroBgL})`,
                }}
            >

            </div>

            <div className="pointer-events-none bg-cover bg-center bg-no-repeat absolute right-0 top-0 hidden h-full w-72 opacity-80 md:block"
                style={{
                    backgroundImage: `url(${heroBgR})`,
                }}
            >
            </div>

            <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="w-full text-center">
                    <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
                        Deal Your <span className="text-purple-500">Products</span>
                        <br />
                        In A <span className="text-purple-500">Smart</span> Way !
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 sm:text-base md:text-lg">
                        SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
                    </p>

                    {/* Search bar */}
                    <div className="flex justify-center">
                        <div className="flex w-full max-w-xl overflow-hidden rounded-full shadow-md">

                            {/* Input */}
                            <input
                                type="text"
                                placeholder="search For Products, Categories..."
                                className="w-full px-5 py-3 text-sm bg-gray-100 outline-none placeholder:text-gray-400"
                            />

                            {/* Button */}
                            <button className="flex items-center justify-center px-5 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white">
                                <FaSearch className="text-sm" />
                            </button>

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-lg px-6">
                            Watch All Products
                        </Link>
                        <Link

                            className="btn btn-outline border-[#8B5CF6] text-[#8B5CF6] hover:bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:text-white rounded-lg px-6"
                        >
                            Post an Product
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;