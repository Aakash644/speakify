import React from "react";
import myImage from './images/image.jpg';
import './auth.css'; // Make sure to include your CSS file

const Signup = () => {
  return (
    <div className="moving-gradient flex h-screen justify-center items-center"> {/* Set parent div to full height */}
      <div className="w-full max-w-md p-8 mt-[30px] mb-[30px] bg-white rounded-[10px] shadow-md mx-auto lg:mx-0 lg:max-w-lg lg:w-1/2 flex flex-col justify-between"> {/* Form container */}
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>

      
    </div>
  );
};

export default Signup;
