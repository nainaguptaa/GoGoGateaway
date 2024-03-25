import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import { useUserContext } from '../../context/userContext';
import Signin1 from '../../assets/svgs/signin1.svg';
import Signin2 from '../../assets/svgs/signin2.svg';
const Signup = () => {
  const {
    googleSignIn,
    emailSignUp,
    emailSignIn,
    setSignPopup,
    checkError,
    emailCheck,
  } = useUserContext();
  const [error, setError] = useState('');
  const [type, setType] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ARE YOU READING THIS?
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type);
    if (type === 0 && step === 0) {
      // If type is 0 and step is 0, proceed with initial signup step
      try {
        await emailCheck({
          email: formData.email,
        });
        setStep(1); // Move to the next step after successful email check
        console.log('Signup success, proceed to next step');
      } catch (error) {
        console.error('Signup error:', error);
        setError(error.message);
        // Handle errors (e.g., show error message)
      }
    } else if (type === 1) {
      console.log('loggin');
      // If type is 1, proceed with login
      try {
        await emailSignIn(formData.email, formData.password);
        console.log('Login success');
        // Optionally, redirect the user or show a success message
      } catch (error) {
        console.error('Login error:', error);
        // Handle errors (e.g., show error message)
      }
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (type === 0 && step === 1) {
      // If type is 0 and step is 1, proceed with email signup
      try {
        await emailSignUp({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        console.log('Signup complete');
        // Optionally, redirect the user or show a success message
        // You might want to navigate to a different page or reset the form
      } catch (error) {
        console.error('Email signup error:', error);
        // Handle errors (e.g., show error message)
      }
    }
  };
  console.log(type);
  return (
    <div className="absolute top-0 z-40 flex h-screen w-full items-center justify-center bg-black/30 backdrop-blur">
      <div className="absolute right-20 top-16">
        <IoMdClose
          size={55}
          onClick={() => setSignPopup(false)}
          className="ease cursor-pointer transition duration-100 hover:brightness-125"
        />
      </div>
      <div className="flex h-2/3 w-4/5 rounded-3xl bg-card p-4 shadow-lg dark:bg-zinc-800">
        {/* Left side */}
        <div className="relative  w-1/2 grow justify-center px-10 py-4">
          <img src={Signin1} className="absolute bottom-12 h-60" />
          <img src={Signin2} className=" w-full" />
        </div>
        {/* Right Side */}

        {/* <div className="flex h-full w-1/2 flex-col items-center  rounded-2xl p-4 shadow-inner">
          <div className="flex w-56 overflow-hidden rounded-xl border-2 border-ring">
            <div
              onClick={() => setType(0)}
              className={`duration-400 w-full cursor-pointer px-4 py-2 text-center text-lg transition hover:bg-lime-600 hover:text-white ${type == 0 ? 'bg-teal-500 text-white' : 'text-'}`}
            >
              Sign Up
            </div>
            <div
              onClick={() => setType(1)}
              className={`duration-400 w-full cursor-pointer px-4 py-2 text-center text-lg transition hover:bg-lime-600 hover:text-white ${type == 1 ? 'bg-teal-500 text-white' : 'text-primary'}`}
            >
              Log In
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`mt-8 flex h-72 w-full flex-col gap-3  ${type == 0 ? '' : 'h-52'}`}
          >
            {type === 0 && (
              <>
                <div className="flex  gap-2">
                  <div className="flex w-1/2 flex-col gap-2">
                    <label htmlFor="firstName" className="label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={'rounded-lg border-2 px-3 py-2 outline-none'}
                    />
                  </div>

                  <div className="flex w-1/2 flex-col gap-2">
                    <label htmlFor="lastName" className="label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={'rounded-lg border-2 px-3 py-2 outline-none'}
                    />
                  </div>
                </div>{' '}
              </>
            )}
            <div className="flex  flex-col gap-2">
              {' '}
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={'rounded-lg border-2 px-3 py-2 outline-none'}
              />
            </div>
            <div className="flex flex-col gap-2">
              {' '}
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={'rounded-lg border-2 px-3 py-2 outline-none'}
              />
            </div>

            <button
              type="submit"
              className="mt-3 rounded bg-orange-400 py-2 font-semibold text-white transition duration-100 hover:brightness-110"
            >
              {type === 0 ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <div class="mt-10 flex w-full items-center justify-center ">
            <div class="flex-grow border-t border-gray-300"></div>
            <span class="mx-4 flex-shrink text-sm text-gray-600">Or</span>
            <div class="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            onClick={googleSignIn}
            className="mt-4 flex w-full items-center justify-center rounded-lg border bg-secondary px-4 py-2 shadow-sm hover:bg-gray-50"
          >
            <FcGoogle className="mr-6" size={20} />
            <div className="text-lg">Continue with Google</div>
          </button>
        </div> */}
        {step == 0 ? (
          <>
            {' '}
            <div className="shadow-deep-inner flex h-full w-1/2 flex-col  items-center rounded-2xl p-4">
              <div className="flex w-56 overflow-hidden rounded-xl border-2">
                <div
                  onClick={() => setType(0)}
                  className={`duration-400 w-full cursor-pointer px-4 py-2 text-center text-lg transition hover:bg-lime-600 hover:text-white ${type == 0 ? 'bg-teal-500 text-white' : 'text-'}`}
                >
                  Sign Up
                </div>
                <div
                  onClick={() => setType(1)}
                  className={`duration-400 w-full cursor-pointer px-4 py-2 text-center text-lg transition hover:bg-lime-600 hover:text-white ${type == 1 ? 'bg-teal-500 text-white' : 'text-primary'}`}
                >
                  Log In
                </div>
              </div>
              {error && <div className="error">{error}</div>}

              <form
                onSubmit={handleSubmit}
                className={`mt-8 flex  w-full flex-col gap-3  ${type == 0 ? '' : 'h-52'}`}
              >
                <div className="flex  flex-col gap-2">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={'rounded-lg border-2 px-3 py-2 outline-none'}
                  />
                </div>
                {type == 1 && (
                  <div className="mt-6 flex flex-col gap-2">
                    {' '}
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={'rounded-lg border-2 px-3 py-2 outline-none'}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="mt-3 rounded bg-purple-400 py-2 font-semibold text-white transition duration-100 hover:brightness-110"
                >
                  {type === 0 ? 'Continue' : 'Log In'}
                </button>
              </form>

              <div class="mt-20 flex w-full items-center justify-center ">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="mx-4 flex-shrink text-sm text-gray-600">Or</span>
                <div class="flex-grow border-t border-gray-300"></div>
              </div>

              <button
                onClick={googleSignIn}
                className="mt-4 flex w-full items-center justify-center rounded-lg border bg-white px-4 py-2 shadow-sm hover:bg-gray-50"
              >
                <FcGoogle className="mr-6" size={20} />
                <div className="text-lg">Continue with Google</div>
              </button>
            </div>
          </>
        ) : (
          <>
            {' '}
            <div className="shadow-deep-inner flex  w-1/2 flex-col  items-center rounded-2xl p-4">
              <form onSubmit={handleFinalSubmit}>
                <div className="flex  gap-2">
                  <div className="flex w-1/2 flex-col gap-2">
                    <label htmlFor="firstName" className="label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={'rounded-lg border-2 px-3 py-2 outline-none'}
                    />
                  </div>

                  <div className="flex w-1/2 flex-col gap-2">
                    <label htmlFor="lastName" className="label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={'rounded-lg border-2 px-3 py-2 outline-none'}
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  {' '}
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={'rounded-lg border-2 px-3 py-2 outline-none'}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label htmlFor="age" className="label">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="rounded-lg border-2 px-3 py-2 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full rounded bg-amber-500 py-2 font-semibold text-white transition duration-100 hover:brightness-110"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
