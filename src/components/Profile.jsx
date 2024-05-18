import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BounceLoader } from 'react-spinners';
export default function Profile() {
    const { register, handleSubmit } = useForm();
    const [userdata, setuserdata] = useState();
    const [spinner, setspinner] = useState(true);
    const { id } = useParams();
    // handle loading of page
    const fetchdata = async (id) => {
        try {
            const response = await fetch(`https://webalar-backend-nui9.onrender.com/data/${id}`, {
                method: "GET",
                headers: {
                    "authorization": localStorage.getItem("authToken"),
                    "content-type": "application/json"
                }
            })
            const result = await response.json();
            if (result.error) {
                toast(result.error);
                setspinner(false);
                return;
            }
            setuserdata(result.user.tasks)
            setspinner(false);
        } catch (error) {
            setspinner(false);
        }
    }
    // handle adding of new task
    const handlenewTask = async (data) => {
        setspinner(true);
        if (!data.taskname) {
            setspinner(false);
            alert("new task is empty");
            return;
        }
        try {
            const response = await fetch(`https://webalar-backend-nui9.onrender.com/newtask/${id}`, {
                method: "POST",
                headers: {
                    "authorization": localStorage.getItem('authToken'),
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            if (result.error) {
                toast(result.error);
                setspinner(false);
                return;
            }
            setspinner(false)
            document.getElementById('form-newtask').value="";
            setuserdata(result.user.tasks);
        } catch (error) {
            toast(error);
            setspinner(false)
        }
    }
    // handle update of task status
    const handlestatus = async (e) => {
        try {
            setspinner(true);
            const currenttask = userdata.filter((task) => task._id == e)[0];
            const currentstatus = currenttask.taskstatus;
            const newstatus = !(currentstatus);
            const response = await fetch(`https://webalar-backend-nui9.onrender.com/status/${id}/${e}`, {
                method: "PATCH",
                headers: {
                    "authorization": localStorage.getItem("authToken"),
                    "content-type": "application/json"
                },
                body: JSON.stringify({ newtaskstatus: newstatus })
            })
            const result = await response.json();
            if(result.error){
                toast(result.error);
                setspinner(false);
                return
            }
            setspinner(false);
            setuserdata(result.user.tasks)
        } catch (error) {
            toast(error);
            setspinner(false);
        }
    }
    // handle task delete
    const handledelete = async(e)=>{
        try {
            setspinner(true);
            const response = await fetch(`https://webalar-backend-nui9.onrender.com/delete/${id}/${e}`,{
                method:"DELETE",
                headers:{
                    "authorization":localStorage.getItem("authToken"),
                    "content-type":"application/json"
                }
            });
            const result = await response.json();
            if(result.error){
                toast(result.error);
                setspinner(false);
                return;
            }
            setuserdata(result.user.tasks);
            setspinner(false);

        } catch (error) {
            toast(error);
            setspinner(false);
        }
    }
    useEffect(() => {
        fetchdata(id);
    }, [])
    return (<>
        <div className='profile-main'>
        <div className="loader">
            {
                spinner && (<BounceLoader />)
            }
        </div>
            <ToastContainer />
            <div className="profile-inner">
                <div className="profile-sections">
                    <span>Add New task</span>
                    <div className="profile-newtask-card">
                        <form action="" onSubmit={handleSubmit(handlenewTask)}>
                            <input type="text" className="profile-newtask-input" placeholder='new task' {...register("taskname")} id='form-newtask'/>
                            <button type='submit' className="profile-newtask-button">Add</button>
                        </form>
                    </div>
                </div>
                <div className="profile-sections alloted-tasks">
                    {
                        userdata ? (
                            userdata.map((e) => (
                                <div className="alloted-task-card" key={e._id}>
                                    <div className="alloted-task-status">
                                        <input type="checkbox" onChange={()=>{}} checked={e.taskstatus} onClick={() => { handlestatus(e._id) }} />
                                    </div>
                                    <div className='alloted-task' style={{ textDecoration: e.taskstatus?'line-through':'none' }}>{e.taskname}</div>
                                    <button className="alloted-task-delete" onClick={() => { handledelete(e._id) }}>Delete</button>
                                </div>
                            ))
                        ) : (<></>)
                    }
                </div>
            </div>

        </div>
    </>

    )
}
