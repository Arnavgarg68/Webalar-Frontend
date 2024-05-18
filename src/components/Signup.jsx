import React, { useState } from 'react'
import signuplogo from '../imags/sign-up.png'
import {BounceLoader} from 'react-spinners'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
export default function Signup() {
    const navigate = useNavigate();
    const [spinner,setspinner] = useState(false);
    const { register, handleSubmit } = useForm()
    const notify = ()=>{
        toast("vnkjdensm")
    }
    const onSubmit=async(data)=>{
        setspinner(true);
        try {       

                const response = await fetch("http://localhost:4100/userSignup",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                })
                const result = await response.json();
                if(result.error){
                    toast(result.error)
                    setspinner(false)
                    return;
                }
                localStorage.setItem('authToken', `Bearer ${result.auth}`);
                console.log(result.auth)
                setspinner(false);
                navigate(`/profile/${result.user._id}`)
        } catch (error) {
            setspinner(false)
            console.log(error)
        }
    }
  return (
    <>
    <ToastContainer/>
    <div className='signup-main'>
        <div className="loader">
            {
                spinner&&(<BounceLoader/>)
            }
        </div>
      <div className="login-inner">
        <div className="login-logo">
            <img src={signuplogo} alt="" />
            <span>Signup</span>
        </div>
        <div className="login-details">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input required type="text" className="login-input" placeholder='Name' {...register('name')}/>
                <input required type="email" className="login-input" placeholder='Email' {...register('email')}/>
                <input required type="password" className="login-input" placeholder='password' {...register('password')}/>
                <button className="login-submit" type='submit'>Submit</button>
            </form>

        </div>
        <div className="not-login">
            <Link to="/">Already have account? Login</Link>
        </div>
      </div>
    </div>
    </>
      
  )
}
