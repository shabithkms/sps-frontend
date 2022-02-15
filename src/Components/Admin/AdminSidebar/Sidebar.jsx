import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  Box,
  Drawer,
  List,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router';

const drawerWidth = 200;

const DrawerHeader = styled('div')(({ theme }) => ({
  //   display: "",
  alignItems: 'center',
  padding: theme.spacing(2, 5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar(props) {
  console.log(props);
  const navigate = useNavigate();

  const doLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={true}
      >
        <DrawerHeader>
          <h2 className='logo '>SPS.</h2>
        </DrawerHeader>
        <List className='mt-5'>
          <ListItem
            button
            key={'Dashboard'}
            onClick={() => {
              navigate('/admin');
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem
            button
            key={'Teachers'}
            onClick={() => {
              navigate('/admin/teachers');
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Teachers'} />
          </ListItem>
          <ListItem
            button
            key={'Batches'}
            onClick={() => {
              navigate('/admin/batches');
            }}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={'Batches'} />
          </ListItem>
          <ListItem
            button
            key={'Logout'}
            className={''}
            onClick={() => {
              doLogout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
