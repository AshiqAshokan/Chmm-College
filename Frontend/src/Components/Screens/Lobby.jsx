import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import { FaUsers } from "react-icons/fa";
import regpic from "../../assets/login2.jpg";

const Lobby = () => {
  const { socket, connected } = useContext(SocketContext);
  const [email, setEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const navigate = useNavigate();

  console.log(socket)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, roomNumber });
    // Handle joining room logic here
    socket.emit("joinRoom", { email, roomNumber });
  
  };

  const handleJoinRoom = (data)=>{
    const { email, roomNumber }=data
    console.log({ email, roomNumber });
      navigate(`/room/${roomNumber}`);

  }
  useEffect(() => {
    if (!socket) {
      console.error("Socket is null or undefined");
      return;
    }
    socket.on("joinRoom", handleJoinRoom);
    return ()=>{
        socket.off("joinRoom", handleJoinRoom)
    }
  }, [socket, handleJoinRoom]);


  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Welcome to the Lobby</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Please enter your Email and room number to join the meeting
          </p>

          <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
            <label htmlFor="email">Email ID</label>
            <input
              className="p-2 rounded-xl border"
              type="email"
              name="email"
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="roomNumber">Room Number</label>
            <input
              className="p-2 rounded-xl border"
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
            <button
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 flex justify-center items-center"
              type="submit"
            >
              <FaUsers className="mr-2" /> Join Room
            </button>
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={regpic} alt="Lobby" />
        </div>
      </div>
    </section>
  );
};

export default Lobby;