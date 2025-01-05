import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

export type UserLoginProps = {
  username?: string;
  password?: string;
}

const LoginPage = () => {
  const [inputs, setInputs] = useState<UserLoginProps>({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(inputs);
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>

            <input
              type='text'
              placeholder='Enter username'
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

          <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
              {loading ? <span className='loading loading-spinner '></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;