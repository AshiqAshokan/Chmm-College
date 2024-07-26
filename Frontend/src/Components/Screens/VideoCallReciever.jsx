import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:7000');

const VideoCallReceiver = () => {
    const { roomNumber } = useParams();
    const localVideoRef = useRef();
    const remoteVideoRefs = useRef({});
    const peerConnections = useRef({});
    const [peers, setPeers] = useState([]);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        getUserMedia();
    }, []);

    useEffect(() => {
        if (!roomNumber) {
            console.warn('roomNumber is undefined or null.');
            return;
        }

        console.log(`Joining room: ${roomNumber}`);
        socket.emit('join', { room: roomNumber });

        socket.on('webrtc-offer', handleOffer);
        socket.on('webrtc-candidate', handleCandidate);

        return () => {
            socket.off('webrtc-offer', handleOffer);
            socket.off('webrtc-candidate', handleCandidate);
        };
    }, [roomNumber]);

    const handleOffer = async (data) => {
        console.log('Received WebRTC offer from:', data.sender);
        const peerConnection = createPeerConnection(data.sender);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('webrtc-answer', { answer, room: data.room, sender: socket.id });
        console.log('Sent WebRTC answer from:', socket.id);
    };

    const handleCandidate = async (data) => {
        console.log('Received WebRTC candidate from:', data.sender);
        const peerConnection = peerConnections.current[data.sender];
        if (peerConnection) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
    };

    const createPeerConnection = (userId) => {
        const pc = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        });

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('webrtc-candidate', {
                    candidate: event.candidate,
                    room: roomNumber,
                    sender: socket.id
                });
                console.log('Sent WebRTC candidate from:', socket.id);
            }
        };

        pc.ontrack = (event) => {
            if (!remoteVideoRefs.current[userId]) {
                remoteVideoRefs.current[userId] = React.createRef();
                setPeers((prevPeers) => [...prevPeers, userId]);
            }
            if (remoteVideoRefs.current[userId].current) {
                remoteVideoRefs.current[userId].current.srcObject = event.streams[0];
                console.log('Remote stream added for user:', userId);
            }
        };

        if (stream) {
            stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        }

        peerConnections.current[userId] = pc;
        return pc;
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className="w-full max-w-5xl p-4 bg-white rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative w-full md:w-1/2 overflow-hidden rounded-lg">
                        <video ref={localVideoRef} autoPlay muted className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 space-y-4">
                        {peers.map((peerId) => (
                            <div key={peerId} className="relative w-full h-64 overflow-hidden rounded-lg">
                                <video
                                    ref={remoteVideoRefs.current[peerId]}
                                    autoPlay
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCallReceiver;
