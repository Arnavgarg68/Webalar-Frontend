import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BounceLoader } from 'react-spinners';
export default function JoinRoom() {
    const { register, handleSubmit } = useForm();
    const [teamdata, setteamdata] = useState();
    const [spinner, setspinner] = useState(true);
    const { roomId } = useParams();
  // handle loading of page
  const fetchdata = async (roomId) => {
    try {
        const response = await fetch(`http://localhost:4100/team/${roomId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const result = await response.json();
        console.log(result)
        if (result.error) {
            toast(result.error);
            setspinner(false);
            return;
        }
        console.log(result.team.tasks)
        setteamdata(result.team.tasks)
        setspinner(false);
    } catch (error) {
        console.log(error)
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
        const response = await fetch(`http://localhost:4100/team/newtask/${roomId}`, {
            method: "POST",
            headers: {
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
        setteamdata(result.team.tasks);
    } catch (error) {
        toast(error);
        setspinner(false)
    }
}
// handle update of task status
const handlestatus = async (e) => {
    try {
        setspinner(true);
        const currenttask = teamdata.filter((task) => task._id == e)[0];
        const currentstatus = currenttask.taskstatus;
        console.log(currentstatus)
        const newstatus = !(currentstatus);
        const response = await fetch(`http://localhost:4100/team/status/${roomId}/${e}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ newtaskstatus: newstatus })
        })
        const result = await response.json();
        console.log(result)
        if(result.error){
            toast(result.error);
            setspinner(false);
            return
        }
        setspinner(false);
        setteamdata(result.team.tasks)
    } catch (error) {
        console.log(error)
        toast(error);
        setspinner(false);
    }
}
// handle task delete
const handledelete = async(e)=>{
    try {
        setspinner(true);
        const response = await fetch(`http://localhost:4100/team/delete/${roomId}/${e}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            }
        });
        const result = await response.json();
        if(result.error){
            toast(result.error);
            setspinner(false);
            return;
        }
        setteamdata(result.team.tasks);
        setspinner(false);

    } catch (error) {
        console.log(error)
        toast(error);
        setspinner(false);
    }
}
useEffect(() => {
    fetchdata(roomId);
}, [roomId])
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
                <span>{`Room Id - ${roomId}`}</span>
                <div className="profile-newtask-card">
                    <form action="" onSubmit={handleSubmit(handlenewTask)}>
                        <input type="text" className="profile-newtask-input" placeholder='new task' {...register("taskname")} id='form-newtask'/>
                        <button type='submit' className="profile-newtask-button">Add</button>
                    </form>
                </div>
            </div>
            <div className="profile-sections alloted-tasks">
                {
                    teamdata ? (
                        teamdata.map((e) => (
                            <div className="alloted-task-card">
                                <div className="alloted-task-status">
                                    <input type="checkbox" checked={e.taskstatus} onClick={() => { handlestatus(e._id) }} />
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
