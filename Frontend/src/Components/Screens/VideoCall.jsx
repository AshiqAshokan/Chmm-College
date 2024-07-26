import React, { useEffect, useContext, useState, useRef } from 'react';
import { SocketContext } from '../../SocketContext';
import peer from '../../services/peer';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';

const VideoCall = () => {
  const { socket } = useContext(SocketContext);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const myVideoRef = useRef(null);

  const handleUserJoined = ({ email, id }) => {
    console.log(email, id);
    setRemoteSocketId(id);
  };

  const handleCallUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const offer = await peer.getOffer();
      socket.emit('callUser', { offer, to: remoteSocketId });
      setMyStream(stream);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const handleIncommingCall = async ({ from, offer }) => {
    try {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      console.log('incomming call', from, offer);
      const answer = await peer.getAnswer(offer);
      socket.emit('answerCall', { answer, to: from });
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const sendStreams = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => {
        const sender = peer.getSenders().find((sender) => sender.track && sender.track.kind === track.kind);
        if (!sender) {
          peer.addTrack(track, myStream);
        }
      });
    }
  };

  const handleCallAccepted = ({ from, answer }) => {
    peer.setLocalDescription(answer);
    console.log('Call Accepted');
    sendStreams();
  };

  const handleNegoNeeded = async () => {
    const offer = await peer.getOffer();
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
  };

  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = async ({ from, offer }) => {
    const answer = await peer.getAnswer(offer);
    socket.emit('peer:nego:accepted', { to: from, answer });
  };

  const handleNegoNeedFinal = async ({ answer }) => {
    await peer.setLocalDescription(answer);
  };

  const handleEndCall = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    if (peer.peer) {
      peer.peer.close();
    }
    setMyStream(null);
    setRemoteStreams([]);
    setRemoteSocketId(null);
    socket.emit('endCall', { to: remoteSocketId });
  };

  useEffect(() => {
    const handleTrackEvent = (event) => {
      if (event.track.kind === 'video') {
        const newStream = event.streams[0];
        setRemoteStreams((prevStreams) => {
          if (prevStreams.every(stream => stream.id !== newStream.id)) {
            return [...prevStreams, newStream];
          }
          return prevStreams;
        });
      }
    };

    peer.peer.addEventListener('track', handleTrackEvent);

    return () => {
      peer.peer.removeEventListener('track', handleTrackEvent);
    };
  }, [peer.peer]);

  useEffect(() => {
    socket.on('userjoined', handleUserJoined);
    socket.on('incommingcall', handleIncommingCall);
    socket.on('answerCall', handleCallAccepted);
    socket.on('peer:nego:needed', handleNegoNeedIncomming);
    socket.on('peer:nego:final', handleNegoNeedFinal);
    socket.on('endCall', handleEndCall);

    return () => {
      socket.off('userjoined', handleUserJoined);
      socket.off('incommingcall', handleIncommingCall);
      socket.off('answerCall', handleCallAccepted);
      socket.off('peer:nego:needed', handleNegoNeedIncomming);
      socket.off('peer:nego:final', handleNegoNeedFinal);
      socket.off('endCall', handleEndCall);
    };
  }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal, handleEndCall]);

  const toggleMic = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicMuted(!isMicMuted);
    }
  };

  const toggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        <div>
          <h1 className="text-sm md:text-xl lg:text-sm">
            {remoteSocketId? `Connected to ${remoteSocketId}` : 'Waiting for connection...'}
          </h1>
        </div>
        <div className="flex space-x-2 md:space-x-4">
          {myStream && (
            <button
              onClick={sendStreams}
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Send Stream
            </button>
          )}
          {remoteSocketId && (
            <button
              onClick={handleCallUser}
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Call
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="bg-gray-800 rounded-lg flex items-center justify-center text-white">
            <video ref={myVideoRef} autoPlay muted className="w-full h-full object-cover rounded-lg" />
          </div>
          {remoteStreams.map((stream, index) => (
            <div key={index} className="bg-gray-800 rounded-lg flex items-center justify-center text-white">
              <video autoPlay className="w-full h-full object-cover rounded-lg" ref={(ref) => {
                if (ref) {
                  ref.srcObject = stream;
                }
              }} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 text-white p-4 flex justify-around items-center">
        <button className="p-2 rounded-full bg-gray-600 hover:bg-gray-500" onClick={toggleMic}>
          {isMicMuted? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
        <button className="p-2 rounded-full bg-gray-600 hover:bg-gray-500" onClick={toggleVideo}>
          {isVideoEnabled? <FaVideo /> : <FaVideoSlash />}
        </button>
        <button className="p-2 rounded-full bg-red-600 hover:bg-red-500" onClick={handleEndCall}>
          <FaPhoneSlash />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
