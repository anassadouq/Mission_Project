import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";

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
        <form onSubmit={updateMission}>
        <h2 className="text-center text-secondary" style={{"fontWeight":'bold'}}>Update Mission</h2><hr/>
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
                        <button type="submit" className="btn btn-secondary">Update</button>               
                    </td>
                </tr>
        </table>                  
    </form>   
    )
}