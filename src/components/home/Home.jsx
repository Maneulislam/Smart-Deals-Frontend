import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import RecentProducts from '../RecentProducts/RecentProducts';


const recentProductsPromise = fetch("https://smart-deals-backend-beige.vercel.app/recent-products").then(res => res.json());
// console.log(recentProductsPromise);

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <div className='bg-[#F5F5F5]'>
                <RecentProducts recentProductsPromise={recentProductsPromise}></RecentProducts>
            </div>
        </div>
    );
};

export default Home;