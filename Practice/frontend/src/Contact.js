import React, { useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
import Header from './Header'
import Mobileheader from './Mobileheader'
import { useMediaQuery,Grid,Typography } from '@mui/material'
const Contact = () => {
  const mobile=useMediaQuery('(max-width:600px)')
  const[user,Setuser]=useState('')
    const handleclick=async()=>{
const user=localStorage.getItem('token')
const userId=jwtDecode(user)
console.log(userId)
const ab=userId._id
console.log(ab)
const response=await axios.get(`http://localhost:5000/sign/userId/${ab}`)
console.log(response.data)
Setuser(response.data)

    }
  return (
    <>
  {mobile? <Mobileheader/> :<Header/>}
  <Grid container lg={12} xs={12} >
<Grid container lg={10} xs={10} sx={{margin:'auto'}}>
<button onClick={handleclick}>
    click here
   </button>
    <Grid item lg={12} xs={12}>
    <Typography>{user.Name}</Typography>
    </Grid>
    <Grid item lg={12} xs={12}>
    <Typography>{user.Email}</Typography>
    </Grid>
</Grid>
  </Grid>
   
    </>
  )
}

export default Contact