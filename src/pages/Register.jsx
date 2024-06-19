//REACT
import { useState } from "react";

//ROUTER DOM
import { Link, useNavigate } from "react-router-dom";

//UTILS
import { userRegistration, googleRegistration, validatePassword } from "../utils/userAuth.js";

//ICONS
import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

const Register = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [dbError, setDbError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => {
      return {
        ...current,
        [name]: value,
      };
    });
  };

  const handleGoogleAuth = async (event) => {
    event.preventDefault();
    googleRegistration(navigate, setCurrentUser, setDbError, setLoading)
  };

  // TODO: CREATE A UTILS FOLDER TO DO ALL THE AUTH CALLS
  const handleSubmit = (event) => {
    event.preventDefault()
    if(validatePassword(formData.password, formData.confirmPassword, setPasswordError)){
      userRegistration(formData.username, formData.email, formData.password, setLoading, setDbError, setCurrentUser, navigate)
    }
  };

  return (
    <section className="background">
      <div className="container m-auto max-w-lg py-10 md:py-24 px-5">
        <div className="form__section relative bg-slate-900 text-white px-4 py-8 mb-4 shadow-md shadow-white ">
          <div className="mb-4">
            <button
              onClick={handleGoogleAuth}
              className="flex gap-2 text-white bg-gray-700 py-3 px-4 w-full font-medium rounded-full"
            >
              <FcGoogle className="text-2xl" /> Sign in with Google
            </button>
          </div>
          <h1 className="mb-6 text-3xl text-center">Register</h1>
          {passwordError && (
            <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center "'>
              <span className="font-bold ">{passwordError}</span>
            </div>
          )}
          {dbError && (
            <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center "'>
              <span className="font-bold ">{dbError}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="flex gap-2 items-center">
              Username
              {!formData.username && <p className="text-red-400">Required</p>}
            </label>
            <input
              type="text"
              className={`block bg-slate-100 text-black border border-grey-light w-full p-3 rounded-md ${
                !formData.username ? "border-red-600 border-4" : ""
              } `}
              name="username"
              id="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
              required
            />
            {/* {!formData.username && <p className="text-red-400 mb-4">This field is required</p>} */}

            <label htmlFor="email" className="flex gap-2 items-center">
              Email
              {!formData.username && <p className="text-red-400">Required</p>}
            </label>

            <input
              type="email"
              className={`block bg-slate-100 text-black border border-grey-light w-full p-3 rounded-md ${
                !formData.email ? "border-red-600 border-4" : ""
              } `}
              name="email"
              id="email"
              value={formData.email}
              placeholder="Email address"
              onChange={handleChange}
              required
            />
            {/* {!formData.email && <p className="text-red-400 mb-4">This field is required</p>} */}
            <label htmlFor="password" className="flex gap-2 items-center">
              Password
              {!formData.username && <p className="text-red-400">Required</p>}
            </label>
            <input
              type="password"
              className={`${
                passwordError || !formData.password
                  ? " border-red-600 border-4"
                  : ""
              } block bg-slate-100 text-black border border-grey-light w-full p-3 rounded-md outline-none`}
              name="password"
              id="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
              // pattern="^[a-zA-Z0-9_.-]{6,50}$"
              title="Password must be longer than 5 characters. Include a mix of letters, numbers"
            />

            <label
              htmlFor="confirmPassword"
              className="flex gap-2 items-center"
            >
              Confirm Password
              {!formData.username && <p className="text-red-400">Required</p>}
            </label>
            <input
              type="password"
              className={`${
                passwordError || !formData.confirmPassword
                  ? " border-red-600 border-4"
                  : ""
              } block bg-slate-100 text-black border border-grey-light w-full p-3 rounded-md outline-none`}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <button
              disabled={loading}
              className=" w-full rounded-md py-3 text-white bg-transparent bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-150 ease-in"
            >
              Create Account
            </button>
            <hr className="my-6" />
            <div className="mt-4 text-center">
              <p className="text-white">Already have an account?</p>
              <button className="form__btn py-3 w-[60%] mt-2 rounded-md bg-transparent bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-150 ease-in text-center text-white">
                <Link to="/login">
                  <span> Login</span>
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
