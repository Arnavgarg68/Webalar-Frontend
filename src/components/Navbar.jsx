import React, { useState } from 'react'
import logo from '../imags/Logo_cropped-removebg-preview.png'
import { BounceLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
export default function Navbar() {
  const [spin,setspin] = useState(false);
  const navigate = useNavigate();
  const createRoom = async () => {
    setspin(true);
    const roomId = prompt("Enter a unique room ID");
    if(!roomId){
      toast("No room Id entered");
      setspin(false);
      return;
    }
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
        setspin(false);
        return;
      }
      setspin(false);
      navigate(`/join-room/${roomId}`);
      return;
    } catch (error) {
      toast(error);
      setspin(false);
      return;
    }
  }
  const joinroom = async()=>{
    setspin(true);
    const roomId = prompt("enter roomId");
    if(!roomId){
      alert("no room Id entered");
      setspin(false);
      return;
    }
    try {
      const response = await fetch(`https://webalar-backend-nui9.onrender.com/team/${roomId}`,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    const result = await response.json();
    if(result.error){
      toast(result.error);
      setspin(false);
      return;
    }
    setspin(false);
    navigate(`/join-room/${roomId}`);
    } catch (error) {
      toast(error);
      setspin(false);
      return;
    }
    
  }
  return (
    <div className='navbar-main'>
      {
        spin&&(
      <div className="loader" style={{position:"absolute",top:"100%"}}>
        <BounceLoader/>
      </div>

        )
      }
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
