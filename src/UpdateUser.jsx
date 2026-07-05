import { useForm } from 'react-hook-form';
import './style.css';
import { useEffect } from 'react';
import axios from 'axios';

export default function UpdateUser({updateId,setStatus}){

    const {register,handleSubmit,setValue} = useForm()

    const onFormSubmit=async(data)=>{
        try{
            const payload = {
                FullName: data.Name,
                Email: data.Email,
                MobileNo: data.MobileNo,
                DOB: data.DOB,
                Age: data.Age,
            }
            const res = await axios.put(`http://localhost:5555/user/updateUser/${updateId}`, payload)
            const resData = res.data
            if(resData.success){
                setStatus('view')
            }
        }catch(err){
            console.error('Update failed', err)
        }
    }

    const getUser=async()=>{
        try{
            const res = await api.get(`/user/getUser/${updateId}`)
            const resData = res.data
            if(resData.success){
                let user = resData.data
                setValue('Name',user.FullName)
                setValue('Email',user.Email)
                setValue('MobileNo',user.MobileNo)
                // set date input value as YYYY-MM-DD
                const dob = user.DOB ? new Date(user.DOB).toISOString().slice(0,10) : ''
                setValue('DOB', dob)
                setValue('Age',user.Age)
            }
        }catch(err){
            console.error('Failed to fetch user', err)
        }
    }

    useEffect(()=>{
        if(updateId){
            getUser()
        }
    },[updateId])

    return(
        <>
             <form className='add-user' onSubmit={handleSubmit(onFormSubmit)}>
                <h2>update user</h2>
                <input {...register('Name')} type='text' placeholder='FullName'/>
                <input {...register('Email')} type='email' placeholder='Email'/>
                <input {...register('MobileNo')} type='Number' placeholder='MobileNo'/>
                <input {...register('DOB')} type='date'/>
                <input {...register('Age')} type='number' placeholder='Age'/>
                
                <button type='submit'>Update User</button>
            </form>
        </>
    )
}