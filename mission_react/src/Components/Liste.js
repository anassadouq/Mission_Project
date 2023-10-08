import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiAddToQueue } from 'react-icons/bi';




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
        fetchMission();
      })
    }
    return(
      <div className="container">
        <Link to='/create'>
          <button className="btn btn-warning my-3"><BiAddToQueue/> Mission</button>
        </Link>
        <table width="100%" className="text-center">
          <tr>
            <th>Description</th>
            <th>Deadline</th>
            <th>Completed</th>
            <th>Completed_At</th> 
            <th>Actions</th>
          </tr>
          {mission.map((item,id)=>(
            <tr key={id}>
              <td>{item.description}</td>
              <td>{item.deadline}</td>
              <td>
                {item.isCompleted === 'Yes' ? (
                  <b><span className="text-success">Yes</span></b>
                ) : (
                  <b><span className="text-danger">No</span></b>
                )}
              </td>
              <td>{item.completedAt}</td>
              <td>
                <Link to={`/update/${item.id}`} >
                  <button className="btn btn-secondary mx-1"><LuEdit/> Update</button>
                </Link>                  
                <button onClick={() => deleteMission(item.id)} className="btn btn-danger mx-1"><RiDeleteBin5Line/> Delete</button>
              </td>       
            </tr>
          ))}
        </table>  
      </div> 
    )
}