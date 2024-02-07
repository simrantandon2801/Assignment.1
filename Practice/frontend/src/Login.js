import React,{ useState } from 'react'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import {Paper,Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Login1 from './Imges/Login1.jpg'
const Login = () => {
  const navigate = useNavigate();
  const mobile=useMediaQuery('(max-width:600px)')

  const[Email,setEmail]=useState('')
  const[Password,setPassword]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const[Error,setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      Email: Email,
      Password: Password,
    };
  
    setIsLoading(true);
  
    try {
      const response = await axios.post(`http://localhost:5000/sign/Login`, userData);
  
      if (response && response.data) {
        console.log(response.data.data);
        localStorage.setItem("token", response.data.data);
        navigate('/homepage');
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  
  return (
    <>
   
    <Grid container lg={12} xs={11} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Grid container lg={10}  xs={11} sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30px'}}>
      <Grid item lg={12} xs={10}  >
          <Typography sx={{fontSize:'24px',fontWeight:500,}}>
                Login
              </Typography>
              
              </Grid>
      <Grid container lg={6} xs={12} sx={{margin:'auto'}}>
      <Grid item lg={6} xs={12} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
   <img src={Login1} style={{ width:mobile?'100%': '480px', height:mobile?'100%': '403px', }} />
   </Grid>
 </Grid>
 <Grid container lg={6}  xs={12} sx={{display:mobile?'flex':'',justifyContent:mobile?'center':'',alignItems:mobile?'center':''}} >
 <Grid item lg={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <form style={{width:mobile?'90%':'100%',margin:mobile?'auto':''}}>
      
       <Grid item lg={12} xs={12}>
          <Typography sx={{ textAlign: 'left', fontSize: mobile?"14px":'16px', fontWeight: '700', fontFamily: 'Inter' }}>Email</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Enter email"
            value={Email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 0, borderRadius: '6px', backgroundColor: '#F4F1F1',border:'1px solid #1E1E1E' }}
          />
        </Grid>

<Grid item lg={12} xs={12} sx={{marginTop:'20px'}}>
          <Typography sx={{ textAlign: 'left', fontSize: mobile?"14px":'16px', fontWeight: '700', fontFamily: 'Inter' }}>Password</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Enter password"
            value={Password}
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 0, borderRadius: '6px', backgroundColor: '#F4F1F1',border:'1px solid #1E1E1E' }}
          />
        </Grid>
        <Grid item lg={12} xs={12} sx={{marginTop:'20px'}}>
         <Button onClick={handleSubmit}
     type="submit"
     variant="contained"
     sx={{
       mt: 0,
           mb: 0,
        
           borderRadius:mobile?"8px": '12px',
            textTransform: 'none',
            width: mobile?"290px":'100%',
            height: mobile?"39px":'50px',
           fontSize: mobile?"14px":'20px',
           fontFamily: 'Inter',
           fontWeight: '500',marginBottom:mobile?'40px':'0px'
       
     }}
   >Submit
                
   </Button>
   </Grid>
       </form>
 </Grid>
  
   </Grid>
      </Grid>
      </Grid>
  
      </>
  )
}

export default Login