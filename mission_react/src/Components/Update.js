import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import { LuEdit } from 'react-icons/lu';


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
            <form onSubmit={updateMission}>
                <table>
                    <tr>
                        <td>Description</td>
                        <td>
                            <input type="text" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} className="my-2"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Deadline</td>
                        <td>
                            <input type="date" name="deadline" value={deadline} onChange={(e)=>{setDeadline(e.target.value)}} className="my-4"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Is_Completed</td>
                        <td>
                            <input type="radio" name="isCompleted" value="Yes" onChange={(e)=>{setIsCompleted(e.target.value)}} className="my-4 mx-1" checked={isCompleted === "Yes"}/>Yes
                            <input type="radio" name="isCompleted" value="No" onChange={(e)=>{setIsCompleted(e.target.value)}} className="my-4 mx-1" checked={isCompleted === "No"}/>No
                        </td>
                    </tr>
                    <tr>
                        <td>Completed_At</td>
                        <td>
                            <input type="date" name="completedAt" value={completedAt} onChange={(e)=>{setCompletedAt(e.target.value)}} className="my-4"/>
                            <button className="btn btn-secondary mx-2"><LuEdit/> Update</button>
                        </td>
                    </tr>
                </table>                           
            </form>
        </center>
    )
}