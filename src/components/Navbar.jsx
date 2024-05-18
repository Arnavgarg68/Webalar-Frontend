import React from 'react'
import logo from '../imags/Logo_cropped-removebg-preview.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
export default function Navbar() {
  const navigate = useNavigate();
  const createRoom = async () => {
    const roomId = prompt("Enter a unique room ID");
    try {
      const response = await fetch(`https://webalar-backend-nui9.onrender.com/create-team/${roomId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      const result = await response.json();
      if (result.error) {
        toast(result.error);
        return;
      }
      navigate(`/join-room/${roomId}`);
      return;
    } catch (error) {
      toast(error);
      return;
    }
  }
  const joinroom = async()=>{
    const roomId = prompt("enter roomId");
    if(!roomId){
      alert("no room Id entered");
      return;
    }
    const response = await fetch(`https://webalar-backend-nui9.onrender.com/team/${roomId}`,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    const result = await response.json();
    if(result.error){
      toast(result.error);
      return;
    }
    navigate(`/join-room/${roomId}`);
  }
  return (
    <div className='navbar-main'>
      <div className="navbar-inner-main">
        <div className="navbar-logo">
          <img src={logo} alt="" />
        </div>
        <div className="navbar-details">
          <div className="navbar-subdetails" onClick={() => { navigate('/') }}>
            <span>
              Homepage
            </span>
          </div>
          <div className="navbar-subdetails" onClick={createRoom}>
            Create Room
          </div>
          <div className="navbar-subdetails" onClick={joinroom}>
            Join Room
          </div>
        </div>
      </div>
    </div>
  )
}
