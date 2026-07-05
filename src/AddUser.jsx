import { useForm } from 'react-hook-form';
import './style.css';
import { useState } from 'react';
import axios from 'axios';

export default function AddUser(){

    const  { register,handleSubmit,setValue } = useForm()
    const [response,setReponse] = useState({})

    const onAddUser=async(data)=>{
        const res = await axios.post('http://localhost:5555/user/add-user',data)
        setReponse(res.data)
        setTimeout(() => {
            setReponse({})
            setValue('Name','')
            setValue('Email','')
            setValue('MobileNo','')
            setValue('DOB','')
            setValue('Age','')
        }, 2000);
    }

    return(
        <>
            <form className='add-user' onSubmit={handleSubmit(onAddUser)}>
                <h2>add user</h2>
                <input {...register('Name')} type='text' placeholder='Name'/>
                <input {...register('Email')} type='email' placeholder='Email'/>
                <input {...register('MobileNo')} type='Number' placeholder='MobileNo'/>
                <input {...register('DOB')} type='date'/>
                <input {...register('Age')} type='number' placeholder='Age'/>
                {
                    response && 
                    <p className={response?.success ? 'success' :'error'}>
                        {response?.message}
                    </p>
                }
                <button type='submit'>Add User</button>
            </form>
        </>
    )
}