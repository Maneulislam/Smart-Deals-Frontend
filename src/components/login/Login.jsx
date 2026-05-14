import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {

    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState('');

    // Email/Password Login
    const handleLogin = (event) => {
        event.preventDefault();
        setError('');

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then((result) => {
                // console.log(result.user);
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    // Google Login
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden bg-gray-100 flex items-center justify-center p-4">
            <div className="card max-w-[400px] bg-base-100 shadow-xl rounded-lg p-8 md:p-12">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Login</h1>
                    <p className="text-sm text-slate-600">
                        Don't have an account?
                        <Link to="/register" className="text-purple-600 font-medium hover:underline ml-1">
                            Register Now
                        </Link>
                    </p>
                </div>

                {/* ❗ Error Message */}
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-slate-700">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            className="input input-bordered w-full focus:border-purple-500 text-slate-500"
                            defaultValue="maneulislam512@gmail.com"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-slate-700">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                            className="input input-bordered w-full focus:border-purple-500 text-slate-500"
                            defaultValue="12345678"
                            required
                        />
                        <label className="label">
                            <span className="label-text-alt text-slate-500 cursor-pointer hover:underline">
                                Forgot password?
                            </span>
                        </label>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="btn w-full bg-violet-600 hover:bg-violet-700 border-none text-white normal-case text-lg font-medium shadow-md"
                    >
                        Log In
                    </button>
                </form>

                <div className="divider my-5 text-xs font-bold text-slate-800">OR</div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 hover:border-gray-400 normal-case text-slate-800 font-bold gap-3 shadow-sm"
                >
                    <FcGoogle size={22} />
                    Login With Google
                </button>

            </div>
        </div>
    );
};

export default Login;