//REACT
import { useState } from "react";

//ROUTER DOM
import { Link, useNavigate } from "react-router-dom";

//ICONS
import { FcGoogle } from "react-icons/fc";

import { googleLogin, userLogin } from "../utils/userAuth";

const Login = ({ setCurrentUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleGoogleAuth = async (event) => {
    event.preventDefault();
    googleLogin(setCurrentUser, setLoading, setError, navigate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    userLogin(
      formData.email,
      formData.password,
      setCurrentUser,
      setLoading,
      setError,
      navigate
    );
  };

  return (
    <section className="background">
      <div className="container m-auto max-w-lg py-10 md:py-24 px-5">
        <div className="form__section relative bg-slate-900 text-white px-4 py-8 mb-4 shadow-md shadow-white">
          <div className="mb-4">
            <button
              onClick={handleGoogleAuth}
              className="flex gap-2 text-white bg-gray-700 py-3 px-4 w-full font-medium rounded-full"
            >
              <FcGoogle className="text-2xl" /> Sign in with Google
            </button>
          </div>
          <h1 className="mb-6 text-3xl text-center">Log in</h1>
          {error && (
            <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center "'>
              <span className="font-bold ">{error}</span>
            </div>
          )}
          {/* {dbError && (
            <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center "'>
              <span className="font-bold ">{dbError}</span>
            </div>
          )} */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="block bg-slate-100 text-black border border-grey-light w-full p-3 rounded-md mb-4"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Email address"
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`block bg-slate-100 text-black border border-grey-light w-full p-3 rounded-md mb-4 outline-none`}
              name="password"
              id="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
              // pattern="^[a-zA-Z0-9_.-]{6,50}$"
              title="Password must be longer than 5 characters. Include a mix of letters, numbers"
            />
            <button
              disabled={loading}
              className=" w-full rounded-md py-3 text-white bg-transparent bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-150 ease-in"
            >
              Login
            </button>
            <div className="my-4 text-center">
              <span>Forgotten Password? </span>
              <Link className="underline font-black" to="/reset-password">
                Click here
              </Link>
              <span> to reset it.</span>
            </div>
            <hr />
            <div className="mt-4 text-center">
              <p className="text-white">Do not have an account?</p>
              <button className="form__btn py-3 w-[60%] mt-2 rounded-md bg-transparent bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-150 ease-in text-center text-white">
                <Link to="/register">
                  <p>Create an account</p>
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
