import React, { use } from 'react';
import Photo from "../../assets/404.gif";
import { Link } from 'react-router';



const productsPromise = fetch("https://smart-deals-backend-two.vercel.app/products").then(res => res.json());


const MyProducts = () => {

    const products = use(productsPromise);
    // console.log(products);

    return (
        <section className="max-w-7xl  mx-auto px-4 py-20 ">
            {/* Main Heading */}
            <h2 className="text-4xl font-extrabold text-center mb-14 text-[#111827]">
                My <span className="text-[#8B5CF6]">Products</span>
            </h2>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
                {products?.map((product) => (
                    // console.log(product),
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


                        <div className="badge badge-soft my-2 badge-primary border-none text-[10px] font-bold px-3 py-3 uppercase">
                            {product.condition}
                        </div>




                        {/* 2. Title with usage/condition in brackets */}
                        <div className="flex-grow">
                            <h3 className="text-5 font-extrabold text-[#374151] leading-snug mb-2">
                                {product.title} [ {product.usage || product.condition || "N/A"} ]
                            </h3>

                            {/* 3. Dynamic Price Range */}
                            <p className="text-[#8B5CF6] text-2 font-bold mb-4">
                                $ {product.price_min?.toLocaleString()} - {product.price_max?.toLocaleString()}
                            </p>
                        </div>

                        {/* 4. View Details Button - Added to every card */}
                        <div className="mt-0">
                            <Link to={`/productDetails/${product._id}`} className="btn btn-outline w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#9F62F2]  hover:border-[#8B5CF6] hover:text-white  normal-case  text-3 font-semibold transition-all">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyProducts;