import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios'
import CreatePostForm from '../Pages/CreatePostForm';
import Alldatas from '../Pages/Alldatas';


const Dashboard = () => {
    const [suc, setSuc] = useState()
    const Navigate = useNavigate()
    useEffect(() => {
        axios.get('https://dealy-dress-colur-suggestion-backend.onrender.com/dashboard')
        .then(res =>{
            if (res.data === "Success") {
                 setSuc("Successed ok")                
            }else{
                Navigate('/Suggetion')
            }
        }).catch(err => console.log(err))
    }, [])
    return (
        <div>
<h1 className='text-center'>Admin page</h1>

<h1> {suc} </h1>
<CreatePostForm />
<Alldatas />
        </div>
    );
};

export default Dashboard;