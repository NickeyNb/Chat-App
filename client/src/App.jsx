import React, { useState } from "react";
import { io } from "socket.io-client";

const beUrl = "http://localhost:5000";
const socket = io(beUrl);
const App = () => {
  const [username, setUsername] = useState("");
  const [chatActive, setChatActive] = useState(false);

  return (
    <>
      <div className="h-screen w-screen bg-gray-100">
        {chatActive ? (
          <div>Chatting</div>
        ) : (
          <div className="flex h-screen w-screen items-center justify-center gap-2 ">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg px-6 py-4 shadow-md shadow-gray-400 outline-none"
            />
            <button className="rounded-lg bg-rose-400 px-6 py-4 hover:bg-rose-500">
              Start
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
