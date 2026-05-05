import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';
import useAxios from '../../useAxios/useAxios';
import Swal from 'sweetalert2';

const CreateProduct = () => {

    const axiosInstance = useAxios();

    const [condition, setCondition] = React.useState('Brand New');

    const handleCreateProduct = (e) => {
        e.preventDefault();
        const form = e.target;

        // Data extraction using the 'name' attributes defined in the JSX below
        const title = form.title.value;
        const category = form.category.value;
        const minPrice = form.minPrice.value;
        const maxPrice = form.maxPrice.value || minPrice;
        const condition = form.condition.value;
        const usageTime = form.usageTime.value;
        const productImage = form.productImage.value;
        const sellerName = form.sellerName.value;
        const sellerEmail = form.sellerEmail.value;
        const sellerContact = form.sellerContact.value;
        const sellerImage = form.sellerImage.value;
        const location = form.location.value;
        const description = form.description.value;


        const newProduct = {
            title,
            category,
            price: {
                min: parseFloat(minPrice),
                max: parseFloat(maxPrice)
            },
            condition,
            usageTime,
            productImage,
            seller: {
                name: sellerName,
                email: sellerEmail,
                contact: sellerContact,
                image: sellerImage
            },
            location,
            description,
            createdAt: new Date().toISOString()
        };

        console.log("Form Data Collected:", newProduct);

        axiosInstance.post("/products", newProduct)
            .then(data => {
                console.log("after", data.data);

                if (data.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your product has been created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // form.reset();
                }
            })
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-10 px-4 flex flex-col items-center font-sans">


            {/* Header */}
            <div className="w-full max-w-4xl flex flex-col items-center mb-8">
                <Link
                    to={"/all-products"}
                    type="button"
                    className="flex items-center gap-2 text-xl font-bold text-slate-700 hover:text-[#8b5cf6] transition-colors mb-3"
                >
                    <FaArrowLeft />
                    Back To Products
                </Link>
                <h1 className="text-4xl font-extrabold text-[#1e293b]">
                    Create <span className="text-[#8b5cf6]">A Product</span>
                </h1>
            </div>

            {/* Form Card */}
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-sm p-8 md:p-10 border border-gray-100">
                <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                    {/* Title */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Title</span>
                        </label>
                        <input
                            name="title"
                            type="text"
                            placeholder="e.g. Yamaha Fz Guitar for Sale"
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Category</span>
                        </label>
                        <select
                            name="category"
                            className="select select-bordered w-full bg-white font-normal text-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                            required
                        >
                            <option value="" disabled selected>Select a Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="musical-instruments">Musical Instruments</option>
                            <option value="vehicles">Vehicles</option>
                        </select>
                    </div>

                    {/* Min Price */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Min Price You want to Sale ($)</span>
                        </label>
                        <input
                            name="minPrice"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 18.5"
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                            required
                        />
                    </div>

                    {/* Max Price */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Max Price You want to Sale ($)</span>
                        </label>
                        <input
                            name="maxPrice"
                            type="number"
                            step="0.01"
                            placeholder="Optional (default = Min Price)"
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                        />
                    </div>



                    {/* Product Condition */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Product Condition</span>
                        </label>
                        <div className="flex gap-6 items-center h-12">
                            <label className="cursor-pointer flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="condition"
                                    value="Brand New"
                                    className="radio checked:bg-[#8b5cf6] border-gray-300 w-5 h-5"
                                    checked={condition === 'Brand New'}
                                    onChange={(e) => setCondition(e.target.value)}
                                />
                                <span className="text-sm font-medium text-gray-700">Brand New</span>
                            </label>
                            <label className="cursor-pointer flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="condition"
                                    value="Used"
                                    className="radio checked:bg-[#8b5cf6] border-gray-300 w-5 h-5"
                                    checked={condition === 'Used'}
                                    onChange={(e) => setCondition(e.target.value)}
                                />
                                <span className="text-sm font-medium text-gray-700">Used</span>
                            </label>
                        </div>
                    </div>


                    {/* Product Usage Time */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Product Usage time</span>
                        </label>
                        <input
                            name="usageTime"
                            type="text"
                            placeholder={condition === 'Brand New' ? "N/A (Brand New)" : "e.g. 1 year 3 month"}
                            // The Magic Line: Field is disabled if condition is 'Brand New' *
                            disabled={condition === 'Brand New'}
                            className={`input input-bordered w-full focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] 
                          ${condition === 'Brand New' ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'bg-white'}`}
                        />
                    </div>

                    {/* Product Image URL */}
                    <div className="form-control w-full md:col-span-2">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Your Product Image URL</span>
                        </label>
                        <input
                            name="productImage"
                            type="url"
                            placeholder="https://..."
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                            required
                        />
                    </div>

                    {/* Seller Info */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Seller Name</span>
                        </label>
                        <input
                            name="sellerName"
                            type="text"
                            placeholder="e.g. Artisan Roasters"
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Seller Email</span>
                        </label>
                        <input
                            name="sellerEmail"
                            type="email"
                            placeholder="leli31955@nrlord.com"
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Seller Contact</span>
                        </label>
                        <input
                            name="sellerContact"
                            type="text"
                            placeholder="e.g. +1-555-1234"
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Seller Image URL</span>
                        </label>
                        <input
                            name="sellerImage"
                            type="url"
                            placeholder="https://..."
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                        />
                    </div>

                    <div className="form-control w-full md:col-span-2">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Location</span>
                        </label>
                        <input
                            name="location"
                            type="text"
                            placeholder="City, Country"
                            className="input input-bordered w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                        />
                    </div>

                    <div className="form-control w-full md:col-span-2">
                        <label className="label pb-1">
                            <span className="label-text text-xs font-semibold text-gray-600">Simple Description</span>
                        </label>
                        <textarea
                            name="description"
                            className="textarea textarea-bordered h-20 w-full bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
                            placeholder="Describe your product here..."
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="btn w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-none normal-case text-lg h-14"
                        >
                            Create A Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;