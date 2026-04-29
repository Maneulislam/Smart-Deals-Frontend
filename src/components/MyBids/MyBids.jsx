import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MyBids = () => {

    const { user } = use(AuthContext);

    const [bids, setBids] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setBids(data);
                })
        }
    }, [user?.email])

    return (
        <div>

            {/* Bids show */}


            <div class="p-4 md:p-8 w-7xl mx-auto mt-14 ">
                {/* Header Section */}
                <div class="mb-8">
                    <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800">
                        Bids For This Product: <span class="text-[#9365E6]">0{bids.length}</span>
                    </h2>
                </div>

                {/* Responsive Table Wrapper */}
                <div class="overflow-x-auto bg-base-100 rounded-xl mt-12 border border-base-200 shadow-sm">
                    <table class="table w-full">
                        {/* Table Head */}
                        <thead class="bg-base-200/50">
                            <tr class="text-slate-600 uppercase text-xs">
                                <th class="py-4">SL No</th>

                                {/* <th>Product</th> */}

                                <th>Buyer Info</th>
                                <th class="text-center">Bid Price</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Dynamic Mapping Starts Here */}
                            {bids.map((bid, index) => (
                                <tr key={bid._id} className="hover:bg-base-200/30 transition-colors">
                                    {/* Serial Number */}
                                    <td className="font-bold text-slate-500">
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </td>

                                    {/* Product Details (from product object) */}
                                    {/* <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 bg-base-300">
                                                    
                                                    <img src={product.image || "/placeholder.jpg"} alt={product.title} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800 truncate max-w-[150px]">
                                                    {product.title}
                                                </div>
                                                <div className="text-xs font-semibold opacity-60">
                                                    Range: ${product.price_min} - ${product.price_max}
                                                </div>
                                            </div>
                                        </div>
                                    </td> */}

                                    {/* Buyer/Seller Info (from bid data) */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                                    <img src={bid.buyerImage} alt={bid.buyerName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-slate-700">{bid.buyerName}</div>
                                                <div className="text-xs opacity-50">{bid.buyerEmail}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Bid Price */}
                                    <td className="text-center">
                                        <span className="text-lg font-black text-slate-900">
                                            ${bid.bidPrice}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="text-center">
                                        <div className="flex flex-wrap gap-2 justify-center">

                                            <button
                                                className="btn btn-outline btn-error btn-sm normal-case border-2 hover:text-white"
                                                disabled={bid.status !== 'pending'}
                                            >
                                                Remove Bid
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBids;