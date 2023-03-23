import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Liste() {
    const [mission, setMission] = useState([])
    useEffect(() => {
      fetchMission();
    },[]
    )
    const fetchMission = async () => {
      await axios.get('http://127.0.0.1:8000/api/mission').then(({ data }) => {setMission(data)}) 
    }
    const deleteMission = async (id) => {
      await axios.delete('http://127.0.0.1:8000/api/mission/' + id)
      .then(({ data }) => {
        console.log(data.message)
        fetchMission();
      }).catch(({ response: { data } }) => {
        console.log(data.message)
      })
    }
    return(
      <div>
        <Link to='/create'>
          <button className="btn btn-warning m-2">Create New Mission</button>
        </Link>
        <table className="container my-4 text-center">
          <tr style={{"backgroundColor":"#E8E8E8"}}>
            <th style={{"border": "1px solid black"}}>Description</th>
            <th style={{"border": "1px solid black"}}>Deadline</th>
            <th style={{"border": "1px solid black"}}>Is_Completed</th>
            <th style={{"border": "1px solid black"}}>Completed_At</th> 
            <th style={{"border": "1px solid black"}}>Actions</th> 
          </tr>
          {
            mission.length > 0 && (
              mission.map((row,key)=>(
                <tr key={key}>
                  <td style={{"border": "1px solid black"}}>{row.description}</td>
                  <td style={{"border": "1px solid black"}}>{row.deadline}</td>
                  <td style={{"border": "1px solid black"}}>{row.isCompleted}</td>
                  <td style={{"border": "1px solid black"}}>{row.completedAt}</td>
                  <td style={{"border": "1px solid black"}}>
                    <Link className="btn btn-secondary" to={`/update/${row.id}`}>Update</Link>                  
                    <button className="btn btn-danger mx-3" onClick={() => deleteMission(row.id)}>Delete</button>
                  </td>       
                </tr>
              ))
            )
          }
        </table>  
      </div> 
    )
}