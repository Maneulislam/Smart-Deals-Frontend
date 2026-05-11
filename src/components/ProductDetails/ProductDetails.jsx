import { FaArrowLeft, FaMapPin, FaPhone, FaUser } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import image from "../../assets/404.gif";
import { GrStatusGood } from "react-icons/gr";
import { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";



const ProductDetails = () => {

    const product = useLoaderData();
    // console.log(product);

    const { user } = use(AuthContext);
    // console.log(user);

    const {
        title,
        price_min,
        price_max,
        email,
        category,
        created_at,
        status,
        location,
        seller_image,
        seller_name,
        condition,
        usage,
        description,
        seller_contact,
        _id
    } = product;

    const [bids, setBids] = useState([]);
    // console.log(bids);


    useEffect(() => {
        fetch(`https://smart-deals-backend-beige.vercel.app/products/bids/${_id}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setBids(data))
            .catch(err => console.error(err));
    }, [_id, user]);





    const modalRef = useRef(null);

    const openModal = () => {
        modalRef.current?.showModal();
    };


    const handleBidSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const buyerImage = form.buyerImage.value;
        const bidPrice = form.bidPrice.value;
        const contactInfo = form.contactInfo.value;

        // Create an object to send to your database/API
        const bidData = {
            product: _id,
            buyerName,
            buyerEmail,
            buyerImage,
            bidPrice,
            contactInfo,
            status: 'pending'
        };

        // console.log("Collected Bid Data:", bidData);



        fetch('https://smart-deals-backend-beige.vercel.app/bids', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bidData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                    modalRef.current?.close();
                }

                bidData._id = data.insertedId;

                const newBids = [...bids, bidData];
                newBids.sort((a, b) => b.bidPrice - a.bidPrice);
                setBids(newBids);

            });
    };




    const formattedDate = created_at ? new Date(created_at).toLocaleDateString('en-US') : "N/A";

    return (
        <div className="bg-slate-50">

            <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
                <div className="max-w-6xl mx-auto">
                    {/* Navigation */}
                    <Link to={"/"}
                        className="flex items-center text-xl gap-2 text-black hover:text-[#7C3AED] mb-6 font-bold transition-colors"
                    >
                        <FaArrowLeft size={16} />
                        <span>Back To Products</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left Column: Image and Description */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="w-full aspect-square bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="card bg-white rounded-xl shadow-sm border border-slate-100">
                                <div className="card-body p-6">
                                    <h2 className="text-xl font-bold text-slate-800 mb-4">Product Description</h2>

                                    <div className="flex justify-between items-center mb-4 text-sm">
                                        <p className="font-semibold text-indigo-600">Condition : <span className="text-slate-900 capitalize">{condition}</span></p>
                                        <p className="font-semibold text-indigo-600 text-right">Usage Time : <span className="text-slate-900">{usage}</span></p>
                                    </div>

                                    <div className="divider my-0"></div>

                                    <p className="text-slate-500 text-sm leading-relaxed mt-4">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Title, Price, and Info */}
                        <div className="lg:col-span-7 flex flex-col gap-4">
                            <div>
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{title}</h1>
                                <div className="badge badge-soft badge-primary border-none text-[10px] font-bold px-3 py-3 uppercase">
                                    {category}
                                </div>
                            </div>

                            {/* Price Card */}
                            <div className="card bg-white rounded-xl shadow-sm border border-slate-100">
                                <div className="card-body p-6">
                                    <h3 className="text-3xl font-bold text-green-500">
                                        ${price_min?.toLocaleString()} - {price_max?.toLocaleString()}
                                    </h3>
                                    <p className="text-slate-400 text-sm">Price starts from</p>
                                </div>
                            </div>

                            {/* Product Details Card */}
                            <div className="card bg-white rounded-xl shadow-sm border border-slate-100">
                                <div className="card-body p-6">
                                    <h3 className="text-lg font-bold text-slate-800 mb-3">Product Details</h3>
                                    <div className="space-y-2 text-sm">
                                        <p className="font-bold text-slate-800">Product ID: <span className="font-medium text-slate-600">{_id}</span></p>
                                        <p className="font-bold text-slate-800">Posted: <span className="font-medium text-slate-600">{formattedDate}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Seller Information Card */}
                            <div className="card bg-white rounded-xl shadow-sm border border-slate-100">
                                <div className="card-body p-6">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4">Seller Information</h3>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="avatar">
                                            <div className="w-12 rounded-full ring ring-slate-100">
                                                {seller_image ? (
                                                    <img src={seller_image} alt={seller_name} />
                                                ) : (
                                                    <div className="bg-slate-200 w-full h-full flex items-center justify-center text-slate-400">
                                                        <FaUser size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{seller_name}</h4>
                                            <p className="text-xs text-slate-400">{email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <p className="font-bold text-slate-800 flex items-center gap-2">
                                            <FaMapPin size={14} className="text-slate-400" />
                                            Location: <span className="font-medium text-slate-600">{location}</span>
                                        </p>
                                        <p className="font-bold text-slate-800 flex items-center gap-2">
                                            <FaPhone size={14} className="text-slate-400" />
                                            Contact: <span className="font-medium text-slate-600">{seller_contact}</span>
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <GrStatusGood size={14} className="text-slate-400" />
                                            <span className="font-bold text-slate-800">Status:</span>
                                            <span className={`badge ${status === 'pending' ? 'badge-warning' : 'badge-success'} text-[10px] font-bold h-5 uppercase`}>
                                                {status === 'pending' ? 'On Sale' : status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Purchase Button */}

                            {/* Your Purchase Button */}
                            <button
                                onClick={openModal}
                                className="btn btn-primary w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white normal-case text-lg h-14 rounded-xl mt-2 shadow-lg shadow-indigo-100"
                            >
                                I Want Buy This Product
                            </button>




                        </div>
                    </div>
                </div>
            </div>






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
                                <th>Product</th>
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
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 bg-base-300">
                                                    {/* Assuming image is part of product details or handled via ID */}
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
                                    </td>

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
                                                className="btn btn-outline btn-success btn-sm normal-case border-2 hover:text-white"
                                                disabled={bid.status !== 'pending'}
                                            >
                                                Accept Offer
                                            </button>
                                            <button
                                                className="btn btn-outline btn-error btn-sm normal-case border-2 hover:text-white"
                                                disabled={bid.status !== 'pending'}
                                            >
                                                Reject Offer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>




            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl bg-white rounded-xl p-8">
                    {/* Header */}
                    <h3 className="font-bold text-2xl text-center text-slate-800 mb-8">
                        Give Seller Your Offered Price
                    </h3>

                    <form method="dialog" onSubmit={handleBidSubmit} className="space-y-5">
                        {/* Input Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Buyer Name</span></label>
                                <input type="text" name="buyerName" readOnly defaultValue={user?.displayName} className="input input-bordered w-full bg-white border-slate-300" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Buyer Email</span></label>
                                <input type="email" readOnly name="buyerEmail" defaultValue={user?.email} placeholder="Your Email" className="input input-bordered w-full bg-white border-slate-300" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Buyer Image URL</span></label>
                            <input type="url" readOnly name="buyerImage" defaultValue={user?.photoURL} placeholder="https://..." className="input input-bordered w-full bg-white border-slate-300" />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Place your Price</span></label>
                            <input type="text" name="bidPrice" placeholder="e.g. 500" className="input input-bordered w-full bg-white border-slate-300" />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Contact Info</span></label>
                            <input type="text" name="contactInfo" placeholder="e.g. +1-555-1234" className="input input-bordered w-full bg-white border-slate-300" />
                        </div>

                        {/* Action Buttons */}
                        <div className="modal-action flex justify-end gap-3 mt-6">
                            {/* method="dialog" on the form or button automatically closes the modal */}
                            <button type="button" onClick={() => modalRef.current?.close()} className="btn btn-outline border-[#9365E6] text-[#9365E6] hover:bg-purple-50 min-w-[100px]">
                                Cancel
                            </button>
                            <button className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2]  hover:bg-[#7e52cc] text-white border-none min-w-[120px]">
                                Submit Bid
                            </button>
                        </div>
                    </form>
                </div>

                {/* Backdrop: clicking outside closes the modal */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};
export default ProductDetails;