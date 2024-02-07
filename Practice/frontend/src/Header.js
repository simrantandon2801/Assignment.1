import React from 'react';
import { Grid, Button } from '@mui/material';
import Image from 'mui-image';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Avatar, Menu, MenuItem } from '@mui/material';
import Log from './Imges/Log.jpg'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
 

  const handleUpload3 = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <Grid container lg={12}>
        <Grid container lg={10} sx={{ margin: 'auto' }}>
          <Grid container lg={8}>
            <Grid item lg={2}>
              <Image
                src={Log}
                style={{ width: '70px', height: '70px' }}
              />
            </Grid>
          </Grid>

          {token ? (
            <Grid container lg={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
              <Link to='/Accept'>
                <Button sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'DodgerBlue',
                    color: '#fff',
                  },
                  '&:active': {
                    backgroundColor: 'DarkBlue',
                  },
                }}>
                 Signup
                </Button>
              </Link>
              <Link to='/Userpurchase'>
                <Button sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'DodgerBlue',
                    color: '#fff',
                  },
                }}>
                Login
                </Button>
              </Link>

              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Avatar alt="User Avatar" src={PersonAddIcon} {...bindTrigger(popupState)} style={{ width: '40px', height: '40px', marginTop: '20px', marginBottom: '20px' }} />
                    <Menu {...bindMenu(popupState)}>
                     
                      <MenuItem onClick={handleUpload3}>Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Grid>
          ) : (
            <Grid container lg={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
              <Link to='/Login'>
                <Button sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'DodgerBlue',
                    color: '#fff',
                  },
                  '&:active': {
                    backgroundColor: 'DarkBlue',
                  },
                }}>
                  Login
                </Button>
              </Link>
              <Link to='/Form'>
                <Button sx={{
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'DodgerBlue',
                    color: '#fff',
                  },
                }}>
                  Signup
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
