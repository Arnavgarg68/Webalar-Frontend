import React, { useState } from 'react'
import loginlogo from '../imags/icons8-login-64.png'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BounceLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [spinner,setspinner] = useState(false);
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        setspinner(true);
        try {
            const response = await fetch('https://webalar-backend-nui9.onrender.com/userLogin', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            if(result.error){
                toast(result.error);
                setspinner(false);
                return;
            }
            localStorage.setItem('authToken', `Bearer ${result.auth}`);
            setspinner(false);
            navigate(`/profile/${result.user._id}`)
            
        } catch (error) {
            toast(error);
            setspinner(false);
        }
    }
    return (<>
        <ToastContainer />
        <div className="loader">
            {
                spinner && (<BounceLoader />)
            }
        </div>
        <div className='login-main'>
            <div className="login-inner">
                <div className="login-logo">
                    <img src={loginlogo} alt="" />
                    <span>Login</span>
                </div>
                <div className="login-details">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <input required type="email" className="login-input" placeholder='Email' {...register('email')} />
                        <input required type="password" className="login-input" placeholder='password' {...register('password')} />
                        <button className="login-submit" type='submit'>Submit</button>
                    </form>

                </div>
                <div className="not-login">
                    <Link to="/signup">New? Signup</Link>
                </div>
            </div>
        </div>
    </>

    )
}
