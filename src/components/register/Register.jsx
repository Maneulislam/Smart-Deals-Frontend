import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';



const Register = () => {


    const { signInWithGoogle, createUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const form = event.target;

        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then((result) => {
                // console.log(result);

                const newUser = {
                    name: name,
                    email: email,
                    image: photo
                };

                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log("After", data);
                    })


                // return updateProfile(user, {
                //     displayName: name,
                //     photoURL: photo,
                // });
            })
            .then(() => {
                setSuccess('Registration successful!');
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log(result);
                const user = result.user;

                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                };

                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log("After", data);
                    })

            })
            .catch(error => {
                // console.log(error);
            })
    }


    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[440px] rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-[#0f172a]">Register Now!</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-[#8b5cf6] font-semibold hover:underline"
                        >
                            Login Now
                        </Link>
                    </p>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                {success && (
                    <p className="text-green-600 text-sm mb-3">{success}</p>
                )}

                <form onSubmit={handleRegister} className="space-y-3">
                    <div className="form-control">
                        <label className="label py-0.5">
                            <span className="label-text font-bold text-[#1e293b] text-sm">
                                Name
                            </span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered input-sm w-full bg-white border-gray-200 focus:outline-[#8b5cf6] h-10"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-0.5">
                            <span className="label-text font-bold text-[#1e293b] text-sm">
                                Image URL
                            </span>
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Enter your image URL"
                            className="input input-bordered input-sm w-full bg-white border-gray-200 focus:outline-[#8b5cf6] h-10"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-0.5">
                            <span className="label-text font-bold text-[#1e293b] text-sm">
                                Email
                            </span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered input-sm w-full bg-white border-gray-200 focus:outline-[#8b5cf6] h-10"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-0.5">
                            <span className="label-text font-bold text-[#1e293b] text-sm">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="input input-bordered input-sm w-full bg-white border-gray-200 focus:outline-[#8b5cf6] h-10"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-none normal-case font-bold mt-2 h-11 min-h-0"
                    >
                        Register
                    </button>
                </form>

                <div className="divider my-4 text-gray-500 font-bold text-xs">OR</div>

                <Link
                    to={'/'}
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 normal-case gap-3 text-[#0f172a] font-bold h-11 min-h-0"
                >
                    <FcGoogle size={20} />
                    Signin With Google
                </Link>
            </div>
        </div>
    );
};
export default Register;