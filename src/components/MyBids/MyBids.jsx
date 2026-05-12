import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {

    const { user } = use(AuthContext);
    // console.log("token", user.accessToken);

    const [bids, setBids] = useState([]);



    // JWT tOKEN

    useEffect(() => {
        if (user?.email) {
            fetch(`https://smart-deals-backend-two.vercel.app/bids?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setBids(data);
                })
        }
    }, [user?.email, user.accessToken])







    // Firebase token

    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`https://smart-deals-backend-two.vercel.app/bids?email=${user.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${user.accessToken}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 // console.log(data);
    //                 setBids(data);
    //             })
    //     }
    // }, [user?.email, user.accessToken])



    const handleBidDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)

                fetch(`https://smart-deals-backend-two.vercel.app/bids/${_id}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success",
                                timer: 1500
                            });

                            const remainingBids = bids.filter(bid => bid._id !== _id);
                            setBids(remainingBids);
                        }

                    });



        });
    }





    return (
        <div>

            {/* Bids show */}


            <div className="p-4 md:p-8 w-7xl mx-auto my-16  ">
                {/* Header Section */}
                <div className="flex justify-center  mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                        My Bids: <span className="text-[#9365E6]">0{bids.length}</span>
                    </h2>
                </div>

                {/* Responsive Table Wrapper */}
                <div className="overflow-x-auto bg-base-100 rounded-xl mt-12 border border-base-200 shadow-sm">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-base-200/50">
                            <tr className="text-slate-600 uppercase text-xs">
                                <th className="py-4">SL No</th>

                                {/* <th>Product</th> */}

                                <th>Buyer Info</th>
                                <th className="text-center">Bid Price</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Actions</th>
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
                                        <span className="text-lg font-semibold text-slate-900">
                                            ${bid.bidPrice}
                                        </span>
                                    </td>


                                    <td className="text-center">
                                        <span className="text-4  text-slate-900 badge badge-warning">
                                            {bid.status}
                                        </span>
                                    </td>


                                    {/* Actions */}
                                    <td className="text-center">
                                        <div className="flex flex-wrap gap-2 justify-center">

                                            <button
                                                onClick={() => handleBidDelete(bid._id)}
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