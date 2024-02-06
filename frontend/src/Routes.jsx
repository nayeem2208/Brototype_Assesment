import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Form from './Components/Form';
import Users from './Components/importUser';
import axios from 'axios';
import {refreshContext} from '../src/context'

function Routers() {
    const [students,setStudents]=useState([])
    const { refresh,setRefresh} = refreshContext();
    
    useEffect(() => {
      async function call() {
        try {
            console.log('hiiii')
          let fetchData = await axios.get("http://localhost:3000/displayUser");
          setStudents(fetchData.data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      call();
    }, [refresh]);
  return (
    <Routes>
        <Route path="/"  element={<Form />}/>
        <Route path="/students" element={<Users students={students} />} />
    </Routes>
  )
}

export default Routers
