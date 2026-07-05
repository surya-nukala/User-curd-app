import { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'

export default function ViewUser({setStatus,setUpdateId}){

    const [users,setUsers] = useState([])

    const getUsers = async()=>{
        const res = await axios.get('http://localhost:5555/user/get')
        const resData = res.data
        if(resData.success){
            console.log(resData.data)
            setUsers(resData.data)
        }
    }

    const deleteUser=async(id)=>{
        const res = await axios.delete(`http://localhost:5555/user/del/${id}`)
        const resData = res.data
        if(resData.success){
            getUsers()
        }
    }

    const updateUser=async(id)=>{
        setStatus('update')
        setUpdateId(id)
    }

    useEffect(()=>{
        getUsers()
    },[])

    return(
        <>
            <div className="table-container">
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fullname</th>
                            <th>Email Address</th>
                            <th>Mobile No</th>
                            <th>DOB</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,idx)=>{
                                return(
                                    <tr key={idx}>
                                        <td>{idx+1}</td>
                                        <td>{user.Name}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.MobileNo}</td>
                                        <td>{new Date(user.DOB).toLocaleDateString()}</td>
                                        <td>
                                            <button 
                                                className='btn-delete'
                                                onClick={()=>deleteUser(user._id)}    
                                            >Delete</button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={()=>updateUser(user._id)}
                                                className='btn-update'
                                            >Update</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}