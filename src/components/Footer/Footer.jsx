import { use } from "react";
import { FaFacebook, FaLinkedin, FaEnvelope, FaPhone, FaLocationDot, FaGithub, FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {

    const { user, logOut } = use(AuthContext);

    const navLinks = (

        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#8B5CF6] font-semibold" : "text-white hover:text-[#8B5CF6]"}>Home</NavLink></li>
            <li><NavLink to="/all-products" className={({ isActive }) => isActive ? "text-[#8B5CF6] font-semibold" : "text-white hover:text-[#8B5CF6]"}>All Products</NavLink></li>

            {
                user && <>
                    <li><NavLink to="/my-products" className={({ isActive }) => isActive ? "text-[#8B5CF6] font-semibold" : "text-white hover:text-[#8B5CF6]"}>My Products</NavLink></li>
                    <li><NavLink to="/myBids" className={({ isActive }) => isActive ? "text-[#8B5CF6] font-semibold" : "text-white hover:text-[#8B5CF6]"}>My Bids</NavLink></li>
                    <li><NavLink to="/create-product" className={({ isActive }) => isActive ? "text-[#8B5CF6] font-semibold" : "text-white hover:text-[#8B5CF6]"}>Create Product</NavLink></li>

                </>
            }

        </>
    );



    return (
        <footer className="bg-[#001529] text-gray-300  py-16 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">

                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Smart<span className="text-purple-500">Deals</span>
                    </h2>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Your trusted marketplace for authentic local products. Discover the best deals from across Bangladesh.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        {
                            navLinks
                        }

                    </ul>
                </div>



                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact & Support</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-gray-400" />
                            <span>maneulislam512@gmail.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhone className="text-gray-400" />
                            <span>+880 1791-106969</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaLocationDot className="text-gray-400 mt-1" />
                            <span>Dhaka, Bangladesh</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
                    <div className="flex gap-4">
                        {[
                            { icon: <FaFacebookF />, link: "https://www.facebook.com/mdmaneul.islam" },
                            { icon: <FaGithub />, link: "https://github.com/Maneulislam" },
                            { icon: <FaWhatsapp />, link: "https://wa.me/01791106969" },
                            { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/maneul-islam-690603236/" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white text-[#3b2f2f] rounded-full shadow-md hover:bg-[#3b2f2f] hover:text-white transition-all duration-300 text-xl"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;