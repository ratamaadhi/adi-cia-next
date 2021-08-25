import React, { useState } from "react";
import { RiAtLine, RiLockLine } from "react-icons/ri";
import { loginApi } from "../lib/api";
import nookies from 'nookies'
import Router from 'next/router'

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [progress, setProgress] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)

  const onSubmitLogin = (e) => {
    e.preventDefault();
    submitLogin()
  };

  async function submitLogin() {
    setProgress(true)
    const body = {
      identifier: email,
      password: password
    }

    try {
      const res = await loginApi(body)
      console.log("res",res)
      setProgress(false)
      if (res.data.jwt) {
        nookies.set(null,'uat', res.data.jwt)
        setSuccess(true)
        setEmail('')
        setPassword('')
        Router.replace('/dashboard')
        setInterval(() => {
          setSuccess(false)
        },3000)
      }
    } catch (error) {
      setProgress(false)
      setFailed(true)
      setInterval(() => {
        setFailed(false)
      },3000)
    }
  }

  return (
    <div className="flex flex-col text-gray-200 px-6 h-full w-80 mx-auto space-y-8">
      {progress ? 
        <div className="absolute inset-0 z-10 bg-gray-200 opacity-25" />
      : null}
      <div className="flex flex-col justify-between mt-8">
        <h2 className="text-lg font-light">Welcome back,</h2>
        <h1 className="font-semibold text-2xl">Let's sign you in.</h1>
      </div>
      <form
        className="h-full flex flex-col"
        autoComplete="off"
        onSubmit={(e) => onSubmitLogin(e)}
      >
        <div className="space-y-4 h-full">
          <div className={`flex justify-between border ${failed ? 'border-red-500' : 'border-gray-700'} rounded-xl overflow-hidden`}>
            <input
              autoComplete="new-email"
              type="email"
              className={`w-full bg-gray-800 p-3 text-xs outline-none`}
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="p-3 bg-gray-800">
              <RiAtLine />
            </span>
          </div>
          <div className={`flex justify-between border ${failed ? 'border-red-500' : 'border-gray-700'} rounded-xl overflow-hidden`}>
            <input
              autoComplete="new-password"
              type={!showPass ? "password" : "text"}
              className={`w-full bg-gray-800 p-3 text-xs outline-none`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="p-3 bg-gray-800">
              <RiLockLine />
            </span>
          </div>
          <div className="flex space-x-2 px-2">
            <input
              className="outline-none"
              type="checkbox"
              checked={showPass}
              onChange={() => setShowPass(!showPass)}
            />
            <span className="text-xs font-extralight">Show password</span>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            className={`w-full p-3 rounded-xl ${failed ? 'text-red-500 border border-red-500 bg-gray-300' : success ? 'text-green-500 border border-green-500 bg-gray-300' : progress ? 'text-gray-500 border border-gray-500 bg-gray-200' : 'text-gray-900 border-0 bg-gray-200'} text-xs font-semibold shadow-lg`}
            type="submit"
          >
            {failed ? 'Sign in failed' : success ? 'Sign in success' : progress ? 'Loading...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
