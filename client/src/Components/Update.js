import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import { LuEdit } from 'react-icons/lu';
import './Style.css'; 

export default function Update() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [description,setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [isCompleted, setIsCompleted] = useState('')
    const [completedAt, setCompletedAt] = useState('')

    useEffect(()=>{
        fetchMission();
    },[])

    const fetchMission = async() =>{
        await axios.get(`http://127.0.0.1:8000/api/mission/${id}`)
        .then(({ data }) => {
            const { description, deadline, isCompleted , completedAt } = data.mission
            setDescription(description)
            setDeadline(deadline)
            setIsCompleted(isCompleted)
            setCompletedAt(completedAt)
        }).catch(({ response: {data} }) => {
            console.log(data.message)
        })
    }

    const updateMission = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH')
        formData.append('description', description)
        formData.append('deadline', deadline)
        formData.append('isCompleted', isCompleted)
        formData.append('completedAt', completedAt)

        await axios.post('http://127.0.0.1:8000/api/mission/' + id, formData)
        .then(({ data }) => {
            console.log(data.message)
            navigate('/')
        }).catch(({ response }) => {
            if (response.status == 422) {
                console.log(response.data.errors)
            } else {
                console.log(response.data.message)
            }
        })
    }

    return (
        <center>
            <div class="center-container">
                <form onSubmit={updateMission} class="custom-form">
                    <table>
                        <tr>
                            <td>
                                <b>Description</b>
                            </td>
                            <td>
                                <textarea name="description" value={description} cols="60" rows="3" className="my-4" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Deadline</b>
                            </td>
                            <td>
                                <input type="date" name="deadline" value={deadline} onChange={(e)=>{setDeadline(e.target.value)}} className="form-control my-4"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Is_Completed</b>
                            </td>
                            <td>
                                <input type="radio" name="isCompleted" value="Yes" onChange={(e)=>{setIsCompleted(e.target.value)}} className="my-4 mx-1" checked={isCompleted === "Yes"}/>Yes
                                <input type="radio" name="isCompleted" value="No" onChange={(e)=>{setIsCompleted(e.target.value)}} className="my-4 mx-1" checked={isCompleted === "No"}/>No
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Completed_At</b>
                            </td>
                            <td>
                                <input type="date" name="completedAt" value={completedAt} onChange={(e)=>{setCompletedAt(e.target.value)}} className="form-control my-4"/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button className="form-control btn btn-secondary"><LuEdit/> Update</button>
                            </td>
                        </tr>
                    </table>                           
                </form>
            </div>
        </center>
    )
}