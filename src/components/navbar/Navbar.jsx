import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#8B5CF6] font-semibold" : "text-gray-600 hover:text-[#8B5CF6]"}>Home</NavLink></li>
            <li><NavLink to="/all-products" className="text-gray-600 hover:text-[#8B5CF6]">All Products</NavLink></li>
            <li><NavLink to="/my-products" className="text-gray-600 hover:text-[#8B5CF6]">My Products</NavLink></li>
            <li><NavLink to="/my-bids" className="text-gray-600 hover:text-[#8B5CF6]">My Bids</NavLink></li>
            <li><NavLink to="/create-product" className="text-gray-600 hover:text-[#8B5CF6]">Create Product</NavLink></li>
        </>
    );

    return (
        <div className="bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mobile Menu Toggle */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden p-0 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-white rounded-box w-64 gap-2">
                            {navLinks}
                            <hr className="my-2 border-gray-100" />
                            <div className="flex flex-col gap-2">
                                <Link to="/login" className="btn btn-sm btn-outline border-[#8B5CF6] text-[#8B5CF6]">Login</Link>
                                <Link to="/register" className="btn btn-sm bg-[#8B5CF6] text-white border-none">Register</Link>
                            </div>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="flex items-center text-xl md:text-3xl font-extrabold tracking-tight">
                        <span className="text-[#0F172A]">Smart</span>
                        <span className="text-[#8B5CF6]">Deals</span>
                    </Link>
                </div>

                {/* Center Links - Desktop Only */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 xl:gap-4 font-medium">
                        {navLinks}
                    </ul>
                </div>

                {/* Buttons - Hidden on small mobile, visible on tablet/desktop */}
                <div className="navbar-end flex gap-2 md:gap-4">
                    <Link
                        to="/login"
                        className="hidden sm:flex btn btn-outline border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] px-6 min-h-0 h-10 normal-case font-semibold rounded-md"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="btn bg-[#8B5CF6] border-none text-white hover:bg-[#7C3AED] px-4 md:px-8 min-h-0 h-10 normal-case font-semibold rounded-md"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;