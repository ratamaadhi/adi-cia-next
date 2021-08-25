import React, { useState } from "react";
import { RiAtLine, RiLockLine, RiUser4Line } from "react-icons/ri";
import { registerApi } from "../lib/api";
import { mailFormat } from "../util/regularExp";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [alert, setAlert] = useState({status:false, field: ''});
  const [progress, setProgress] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)

  const onSubmitRegister = (e) => {
    e.preventDefault();
    // console.log(mailFormat.test(email.toString().toLocaleLowerCase()))
    if(username.length < 5){
      setAlert({status: true, field: 'username'})
      return false
    }
    if (!mailFormat.test(email.toString().toLocaleLowerCase())) {
      setAlert({status: true, field: 'email'})
      return false
    }
    if (password1.length < 5 || password2.length < 5 || password1 !== password2) {
      setAlert({status: true, field: 'password'})
      return false
    }

    submitRegister()
  };

  async function submitRegister() {
    setProgress(true)
    const body = {
      username,
      email,
      password: password1
    }

    try {
      const res = await registerApi(body)
      console.log("res",res)
      setProgress(false)
      if (res.data.jwt) {
        setSuccess(true)
        setUsername('')
        setEmail('')
        setPassword1('')
        setPassword2('')
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
        <div className="absolute inset-0 z-10 bg-gray-200 opacity-20 flex justify-center items-center" />
      : null}
      <div className="flex flex-col justify-between mt-8">
        <h2 className="text-lg font-light">Welcome,</h2>
        <h1 className="font-semibold text-2xl">Let's sign you up.</h1>
      </div>
      <form
        className="h-full flex flex-col justify-between pb-16"
        autoComplete="off"
        onSubmit={(e) => !success ? onSubmitRegister(e) : null}
      >
        <div className="space-y-4 h-full">
          <div className={`flex justify-between border ${alert.status && alert.field === 'username' ? 'border-red-500' : 'border-gray-700'} rounded-xl overflow-hidden`}>
            <input
              autoComplete="new-email"
              type="text"
              className="w-full bg-gray-800 p-3 text-xs outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => {setUsername(e.target.value.toLocaleLowerCase()); setAlert({...alert, status: false})}}
              onKeyDown={(e) => e.keyCode == 32 ? e.preventDefault() : true }
            />
            <span className="p-3 bg-gray-800">
              <RiUser4Line />
            </span>
          </div>
          <div className={`flex justify-between border ${alert.status && alert.field === 'email' ? 'border-red-500' : 'border-gray-700'} rounded-xl overflow-hidden`}>
            <input
              autoComplete="new-email"
              type="email"
              className="w-full bg-gray-800 p-3 text-xs outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => {setEmail(e.target.value); setAlert({...alert, status: false})}}
            />
            <span className="p-3 bg-gray-800">
              <RiAtLine />
            </span>
          </div>
          <div className={`flex justify-between border ${alert.status && alert.field === 'password' ? 'border-red-500' : 'border-gray-700'} rounded-xl overflow-hidden`}>
            <input
              autoComplete="new-password"
              type={!showPass ? "password" : "text"}
              className="w-full bg-gray-800 p-3 text-xs outline-none"
              placeholder="Password"
              value={password1}
              onChange={(e) => {setPassword1(e.target.value); setAlert({...alert, status: false})}}
            />
            <span className="p-3 bg-gray-800">
              <RiLockLine />
            </span>
          </div>
          <div className={`flex justify-between border ${alert.status && alert.field === 'password' ? 'border-red-500' : 'border-gray-700'} rounded-xl overflow-hidden`}>
            <input
              autoComplete="new-password"
              type={!showPass ? "password" : "text"}
              className="w-full bg-gray-800 p-3 text-xs outline-none"
              placeholder="Confirm password"
              value={password2}
              onChange={(e) => {setPassword2(e.target.value); setAlert({...alert, status: false})}}
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
            {failed ? 'Sign up failed' : success ? 'Sign up success' : progress ? 'Loading...' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
