import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            console.log(data.message)
            navigate('/')
        }).catch(({response})=>{
            if (response.status ==422) {
                console.log(response.data.errors)
            } else {
                console.log(response.data.message)
            }
        })
    }

    return(
        <form onSubmit={createMission}>
            <h2 className="text-center text-warning" style={{"fontWeight":'bold'}}>Create Mission</h2><hr/>
            <table className="mx-3">
                <tr>
                    <td>
                        <label>Description</label>
                    </td>
                    <td>
                        <input type="text" name="description" value={description} style={{"width":"250%"}} className="my-3" required 
                            onChange={(e)=>{setDescription(e.target.value)}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Deadline</label>
                    </td>
                    <td>
                        <input type="date" name="deadline" value={deadline} style={{"width":"250%"}} className="my-3" required
                            onChange={(e)=>{setDeadline(e.target.value)}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Mission Complete </label> &nbsp;
                    </td>
                    <td>
                        <input type="checkbox" id="mission-complete" checked={isCompleted} onChange={() => setIsCompleted(!isCompleted)}/> &nbsp;
                        {isCompleted ? (
                            <input type="date" value={completedAt} onChange={(e)=>{setCompletedAt(e.target.value)}}/>) : (
                            <input type="text" onChange={(e)=>{setCompletedAt(e.target.value)}} value={completedAt}  />
                        )}
                    </td>
                </tr>

                <tr>
                    <td>
                        <button type="submit" className="btn btn-warning">Create</button>               
                    </td>
                </tr>
            </table>                   
        </form>  
    )
}