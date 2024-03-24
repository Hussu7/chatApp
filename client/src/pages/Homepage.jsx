import React, { useState } from "react";


import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [userName, setUserName]=useState('')

  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(userName){
      navigate(`/messageroom/${userName}`)
    }
    setUserName("")
  }
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center px-12 py-24 dark:bg-slate-900 dark:text-white">
        <div className="wrapper h-full flex flex-col gap-12 items-center justify-center">
          <h1 className="text-3xl font-bold text-center ">
            Welcome to ChatAPp
          </h1>

          <form className="w-full flex flex-col items-center gap-3" onSubmit={handleSubmit}>
            <h1 className="text-center text-lg">
              Please enter username to continue
            </h1>
            <input
              type="userName"
              id="userName"
              name="userName"
              value={userName}
              className=" bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Username"
              onChange={(e)=>{setUserName(e.target.value)}}
            />
             <button
              type="submit"
              className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Continue
            </button>
          </form>
        </div>

        
      </div>
    </>
  );
};

export default Homepage;
