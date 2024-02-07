import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios'
import { useMediaQuery } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import Header from './Header';
import Mobileheader from './Mobileheader';
import Signup from './Imges/Signup.jpg'


const Form = () => {
 
  const navigate = useNavigate();
  const mobile=useMediaQuery('(max-width:600px)');
  
  const[Name,setName]=useState('')
  const[Email,setEmail]=useState('')
  const[Password,setPassword]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const[Error,setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      Name: Name,
      Email: Email,
      Password: Password,
    };
  
    setIsLoading(true); // Set isLoading to true when starting the request
  
    try {
      const response = await axios.post(`http://localhost:5000/sign/simran`, userData);
      // Check if the response has a 'data' property
      if (response && response.data) {
        // Handle the response data
        console.log(response.data);
       
     navigate('/Login')
      } else {
        // If 'data' property is missing, handle the error
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  
   
    setName('');
    setEmail('');
    setPassword('');
  };
  
  
  
  return (
    <> 
   {mobile?<Mobileheader/>:<Header/>}
    <Grid container lg={12} xs={11} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
   <Grid container lg={10}  xs={11} sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30px'}}>
   <Grid item lg={12} xs={11} sx={{}} >
          <Typography sx={{fontSize:'32px',fontWeight:600,}}>
                Signup
              </Typography>
               <Typography sx={{ fontSize: '16px', marginTop: '16px', marginBottom: '24px', color: 'gray' }}>
        Create an account to access exclusive features and personalize your experience.
      </Typography>
              </Grid>
              
    <Grid container lg={6} sx={{margin:'auto'}}>
    <Grid item lg={6} xs={12} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={Signup}style={{ width:mobile?'100%': '480px', height:mobile?'100%': '403px' }} />
      </Grid>
    </Grid>
   
    <Grid container lg={6} >
    <Grid item lg={6} xs={12} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
        <form style={{width:mobile?'80%':'100%'}}>
        <Grid item lg={12}>
            <Typography sx={{fontWeight:'600'}}>Name</Typography>
        <TextField
    required
    fullWidth
    variant="outlined"
  
    placeholder="Enter your Name"
    value={Name}
    size="small"
    onChange={(e) => setName(e.target.value)}
    sx={{ mb:mobile?"12px": 2, borderRadius: '6px',backgroundColor:  '#F4F1F1', }} 
  />
  </Grid>
  <Grid item lg={12}>
            <Typography sx={{fontWeight:'600'}}>Email</Typography>
   <TextField
    required
    fullWidth
    variant="outlined"
  
    placeholder="Enter your email"
    value={Email}
    size="small"
    onChange={(e) => setEmail(e.target.value)}
    sx={{ mb:mobile?"12px": 2, borderRadius: '6px',backgroundColor:  '#F4F1F1', }} 
  />
</Grid>
<Grid item lg={12}>
            <Typography sx={{fontWeight:'600'}}>Password</Typography>
<TextField
    required
    fullWidth
    variant="outlined"
  
    placeholder="Enter your password"
    value={Password}
    size="small"
    onChange={(e) => setPassword(e.target.value)}
    sx={{ mb:mobile?"12px": 2, borderRadius: '6px',backgroundColor:  '#F4F1F1', }} 
  />
  </Grid>
          <Button onClick={handleSubmit}
      type="submit"
      variant="contained"
      sx={{
        mt: 0,
            mb: 0,
         
            borderRadius:mobile?"8px": '12px',
            textTransform: 'none',
            width: mobile?"100%":'100%',
            height: mobile?"39px":'50px',
            fontSize: mobile?"14px":'20px',
            fontFamily: 'Inter',
            fontWeight: '500'
        ,marginBottom:mobile?'50px':'0px'
      }}
    >Submit
							   
    </Button>
        </form>
     </Grid>
   
    </Grid>
    </Grid>
  
  </Grid>
 
  </>
  )
}

export default Form