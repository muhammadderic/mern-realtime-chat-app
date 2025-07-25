import { Link } from "react-router-dom";
import { useState } from "react";
import type { Gender } from "../types/types";
import useSignup from "../hooks/useSignup";
import GenderCheckbox from "../components/GenderCheckbox";

export type UserSignupProps = {
  fullName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  gender: Gender;
}

const SignupPage = () => {
  const [inputs, setInputs] = useState<UserSignupProps>({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender: Gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup(inputs);
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>

            <input
              type='text'
              placeholder='John Doe'
              className='w-full input input-bordered  h-10'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>

            <input
              type='text'
              placeholder='johndoe'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>

            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>

            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link
            to={"/login"}
            className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
          >
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;