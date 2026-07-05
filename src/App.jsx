
import { useState } from 'react'
import './App.css'
import AddUser from './AddUser'
import ViewUser from './ViewUser'
import UpdateUser from './UpdateUser'

function App() {

  const [status,setStatus ] = useState('add')
  const [updateId,setUpdateId] = useState('')

  console.log(status,updateId)

  return (
    <>
      <div className="header">
        <h2>User CRUD App</h2>
        <div className="links">
          <button onClick={()=>setStatus('add')} className={status === 'add' ? 'active' :''}>Add User</button>
          <button onClick={()=>setStatus('view')} className={status === 'view' ? 'active' : ''} >View Users</button>
        </div>
      </div>
      <div className="container">
        {
          status === 'add' && 
          <AddUser/>
        }
        {
          status === 'view' &&
          <ViewUser setUpdateId={setUpdateId} setStatus={setStatus}/>
        }
        {
          status === 'update' &&
          <UpdateUser updateId={updateId} setStatus={setStatus} />
        }
      </div>
    </>
  )
}

export default App
