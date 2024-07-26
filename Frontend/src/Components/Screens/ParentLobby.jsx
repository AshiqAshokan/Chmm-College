import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import regpic from '../../assets/login2.jpg';
import { io } from 'socket.io-client'; // Import socket.io-client

const socket = io('http://localhost:7000'); // Replace with your server URL and port

const ParentLobby = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [teacherEmail, setTeacherEmail] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = (e) => {
        e.preventDefault();
        console.log('Joining room with teacher email:', teacherEmail, 'and room number:', roomNumber);
        socket.emit('join', { userId: 'parentId', receiverId: userInfo._id, room:roomNumber }); // Adjust userId and receiverId accordingly
        navigate(`/Parent/room/${roomNumber}`);
    };

    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Parent's Lobby</h2>
                    <p className="text-xs mt-4 text-[#002D74]">Enter the teacher's email and room number to join the meeting</p>

                    <form className="flex flex-col gap-4 mt-8" onSubmit={handleJoinRoom}>
                        <input
                            className="p-2 rounded-xl border"
                            type="email"
                            name="teacherEmail"
                            placeholder="Teacher's Email"
                            value={teacherEmail}
                            onChange={(e) => setTeacherEmail(e.target.value)}
                            required
                        />
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
                    <img className="rounded-2xl" src={regpic} alt='Lobby' />
                </div>
            </div>
        </section>
    );
};

export default ParentLobby;
