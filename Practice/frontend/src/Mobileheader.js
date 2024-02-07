import React, { useState } from 'react';
import {
  Button,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  IconButton,
  Grid,
} from '@mui/material';
import Image from 'mui-image';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useMediaQuery } from '@mui/material';
import Log from './Imges/Log.jpg'
const Mobileheader = () => {
  const navigate = useNavigate();
  const mobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = localStorage.getItem('token');

  const handleUpload = () => {
    navigate('/Userpurchase');
  };

  const handleUpload3 = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Grid container lg={12} xs={12} alignItems="center">
        <Grid item lg={3} xs={3}>
          <Image
            src={Log}
            style={{ width: '70px', height: '70px' }}
          />
        </Grid>
        <Grid item lg={9} xs={9} container justifyContent="flex-end">
          <IconButton color="inherit" onClick={toggleDrawer} sx={{ display: mobile ? 'block' : 'none' }}>
            <MenuIcon />
          </IconButton>
        </Grid>

        <Drawer anchor="right" open={drawerOpen} onClose={handleClose}>
          <div style={{ width: '250px' }}>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item xs={12} style={{ marginBottom: '20px',alignItems:'flex-end'}}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              </Grid>
              {token ? (
                <Grid item >
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <>
                        <Avatar
                          alt="User Avatar"
                          src={PersonAddIcon}
                          {...bindTrigger(popupState)}
                          style={{ width: '80px', height: '80px' }}
                        />
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={handleUpload}>My Purchase</MenuItem>
                          <MenuItem onClick={handleUpload3}>Logout</MenuItem>
                        </Menu>
                      </>
                    )}
                  </PopupState>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Link to="/Login">
                    <Button sx={{ textTransform: 'none', fontSize: '19px' }}>Login</Button>
                  </Link>
                </Grid>
              )}

              {!token && (
                <Grid item xs={12}>
                  <Link to="/Signup">
                    <Button sx={{ textTransform: 'none', fontSize: '19px' }}>Signup</Button>
                  </Link>
                </Grid>
              )}

              {token && (
                <>
                  <Grid item xs={12}>
                    <Link to="/Accept">
                      <Button sx={{ textTransform: 'none', fontSize: '19px' }}>Get-Product</Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link to="/Userpurchase">
                      <Button sx={{ textTransform: 'none', fontSize: '19px' }}>Userpurchase</Button>
                    </Link>
                  </Grid>
                </>
              )}
            </Grid>
          </div>
        </Drawer>
      </Grid>
    </>
  );
};

export default Mobileheader;
