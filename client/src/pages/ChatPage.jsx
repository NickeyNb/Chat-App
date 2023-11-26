import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatPage = ({ username }) => {
  // Socket connection with backend
  const beUrl = "http://localhost:5000";
  const socket = io(beUrl);

  const [messages, setMessages] = useState([]); // it will be array of objects
  const [newMessage, setNewMessage] = useState("");

  // receiving the event from server
  useEffect(() => {
    socket.on("received-message", (message) => {
      // Add new message to this array while copying previous messages
      setMessages([...messages, message]);
    });
  }, [messages, socket]);
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // message data
    const messageData = {
      message: newMessage,
      username: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    if (newMessage === "") {
      alert("Message can't be empty");
    } else {
      // emitting send-message event to server
      socket.emit("send-message", messageData);
    }
    setNewMessage("");
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200">
      <h1 className="mb-3 text-center text-3xl underline">Let's go chatters</h1>
      <div className="flex min-h-[70vh] min-w-[70vh] flex-col justify-between rounded-lg  bg-slate-100 px-2 py-2 shadow-xl shadow-slate-700 ">
        <div className="h-full overflow-scroll">
          {messages.map((message, i) => {
            return (
              <div
                key={i}
                className={`flex rounded-md ${
                  username === message.username && "ml-96"
                }`}
              >
                <div className="bg-green-400">
                  {message.message && (
                    <h3 className="textlg px-2 font-bold">
                      {message.username.charAt(0).toUpperCase()}
                    </h3>
                  )}
                </div>
                <div>
                  <span>{message.username}</span>
                  <h3>{message.message}</h3>
                  <h3>{message.time}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="flex w-full gap-2 ">
          <input
            type="text"
            placeholder="Enter Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-4/5 rounded-lg border-2 px-3 py-2 shadow-lg shadow-gray-500 outline-none"
          />
          <button
            type="submit"
            className="w-1/5 rounded-lg bg-rose-400 px-3 py-2 outline-none hover:bg-rose-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
