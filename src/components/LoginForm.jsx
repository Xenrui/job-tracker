import React from "react";

const LoginForm = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Image with Bottom-Left Text */}
      <div className="relative hidden lg:block w-1/2 bg-[#8dafa8] rounded-2xl">

        {/* Bottom-left Overlay Content */}
        <div className="absolute bottom-0 left-0 p-8 text-white bg-opacity-50 w-full px-30 py-45">
          <h2 className="text-5xl font-bold">About Us</h2>
          <p className="text-l mt-2 max-w-m">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100">
        <div className="w-full max-w-md px-8 py-12 bg-white rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Login
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8dafa8] text-white py-2 rounded-lg hover:bg-cyan-600 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <span className="text-[#8dafa8] cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
