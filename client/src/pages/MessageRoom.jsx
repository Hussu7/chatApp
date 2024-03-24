import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { HiUserCircle } from "react-icons/hi";
const MessageRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newUser, setNewUser]=useState([])
  const messageBoxHeight = useRef(null);
  let { id } = useParams();
  const socket = useMemo(() => io("https://chatapp-nai7.onrender.com"), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, id });
    setMessage("");
    socrollMessage()
  };
  const socrollMessage=()=>{
    messageBoxHeight.current.scrollTop =
    messageBoxHeight.current.scrollHeight;
  }

  useEffect(() => {
    // alert(`Welcome to Chatbox ${id}`)

    socket.on("connect", () => {
      socket.emit('newUser',id)
      socket.on('newUser', (newUser)=>{
        setNewUser((prevUser)=>[...prevUser, newUser])
    
{}
      })
    });
    
    socket.on("message", (messageData) => {
      setMessages((messages) => [...messages, messageData]);
      socrollMessage()
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <div className="h-screen relative w-full bg-slate-300 flex flex-col justify-center items-center  px-12 py-2 dark:bg-slate-900 text-white">
      {/* <div className="absolute h-4/6 border-2 top-20 left-20">
        <h1>Connectd Users</h1>
        <ul>
          {
            newUser && newUser.map((user,i)=>{<li key={i}>{user}</li>})
          }
        </ul>

      </div> */}
      <h1>Welcome</h1>
      <div className="flex flex-col items-center w-3/5 h-4/5 shadow-xl ">
        <div className="w-full bg-blue-600 h-14 flex justify-between items-center px-4">
          <h1>
            Chat-Bo<span className="text-bold text-base italic">X</span>
          </h1>
          <div className="flex items-center">
            <span className="px-1 text-bold"> {id}</span>
            <HiUserCircle size={30} />
          </div>
        </div>
        <div
          ref={messageBoxHeight}
          className=" w-full border-2 h-4/5  px-4 pt-4 pb-16 m-2 flex flex-col overflow-hidden  bg-white dark:bg-slate-900 "
        >
          {messages &&
            messages.map((message, i) => (
              <div
                key={i}
                className={
                  id === message.id
                    ? "self-end h-auto w-fit px-6 py-1 mb-4 flex flex-col bg-blue-500  rounded-2xl"
                    : "h-auto w-fit px-6 py-1 mb-4 flex flex-col bg-blue-700  rounded-2xl"
                }
              >
                <span className="text-xs h-auto ">
                  {id === message.id ? "you" : message.id}:
                </span>
                <span className="text-sm italic h-auto ">
                  {message.message}
                </span>
              </div>
            ))}
        </div>
        <form className="flex w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            id="message"
            name="message"
            value={message}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type your message here"
            required
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageRoom;
