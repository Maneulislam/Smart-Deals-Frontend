import React, { use } from 'react';

import Photo from "../../assets/404.gif";


const RecentProducts = ({ recentProductsPromise }) => {
    // Unwrapping the array of 6 products
    const products = use(recentProductsPromise);

    return (
        <section className="max-w-7xl  mx-auto px-4 py-12">
            {/* Main Heading */}
            <h2 className="text-4xl font-extrabold text-center mb-10 text-[#111827]">
                Recent <span className="text-[#8B5CF6]">Products</span>
            </h2>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products?.map((product) => (
                    console.log(product),
                    <div
                        key={product._id}
                        className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm flex flex-col transition-all duration-300 hover:shadow-md"
                    >
                        {/* 1. Product Image / Placeholder */}
                        <div className="bg-[#E5E7EB] w-full aspect-[16/11] rounded-[18px] border-gray-200 border-2 mb-5 overflow-hidden">
                            <img
                                src={Photo}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>


                        {/* 2. Title with usage/condition in brackets */}
                        <div className="flex-grow">
                            <h3 className="text-[22px] font-bold text-[#374151] leading-snug mb-2">
                                {product.title} [ {product.usage || product.condition || "N/A"} ]
                            </h3>

                            {/* 3. Dynamic Price Range */}
                            <p className="text-[#8B5CF6] text-xl font-bold mb-6">
                                $ {product.price_min?.toLocaleString()} - {product.price_max?.toLocaleString()}
                            </p>
                        </div>

                        {/* 4. View Details Button - Added to every card */}
                        <div className="mt-auto">
                            <button className="btn btn-outline w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#9F62F2]  hover:border-[#8B5CF6] hover:text-white  normal-case text-lg font-semibold transition-all">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentProducts;