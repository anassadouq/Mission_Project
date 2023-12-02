import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from 'react-icons/bi';
import './Style.css'; 

export default function Create(){
    const navigate = useNavigate();
    
    const [description,setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [isCompleted, setIsCompleted] = useState('')
    const [completedAt, setCompletedAt] = useState('')

    const createMission = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', description)
        formData.append('deadline', deadline)
        formData.append('isCompleted', isCompleted)
        formData.append('completedAt', completedAt)

        console.log(formData)
        await axios.post('http://127.0.0.1:8000/api/mission', formData)
        .then(({data})=>{
            navigate('/')
        })
    }

    return(
        <center>
            <div class="center-container">
            <form onSubmit={createMission} class="custom-form">
                <table>
                    <tr>
                        <td>
                            <b>Description</b>
                        </td>
                        <td>
                            <textarea name="description" placeholder="Description" cols="60" rows="3" className="my-4" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Deadline</b>
                        </td>
                        <td>
                            <input type="date" name="deadline" onChange={(e)=>{setDeadline(e.target.value)}} className="my-4 form-control"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Is_Completed</b>
                        </td>
                        <td>
                            <input type="radio" name="isCompleted" value="Yes" onChange={(e)=>{setIsCompleted(e.target.value)}} className="my-4 mx-1"/>Yes
                            <input type="radio" name="isCompleted" value="No" onChange={(e)=>{setIsCompleted(e.target.value)}} className="my-4 mx-1"/>No
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Completed_At</b>
                        </td>
                        <td>
                            <input type="date" name="completedAt" onChange={(e)=>{setCompletedAt(e.target.value)}} className="form-control my-4"/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className="form-control btn btn-warning"><BiAddToQueue/> Mission</button>
                        </td>
                    </tr>
                </table>
            </form>
            </div>
        </center>
    )
}