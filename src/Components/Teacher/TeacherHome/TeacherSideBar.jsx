import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import GroupsIcon from '@mui/icons-material/Groups';
import DnsIcon from '@mui/icons-material/Dns';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Teacher.css';
import { useEffect, useState } from 'react';
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

function TeacherSideBar(props) {
  
  const [teacherName, setTeacherName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();
  let open = true;
  const doTeacherLogout = () => {
    localStorage.removeItem('teacher');
    navigate('/teacher/login');
  };

  useEffect(() => {
    let teacher = JSON.parse(localStorage.getItem('teacher'));
    if (teacher) {
      setTeacherName(teacher.name);
      setProfile(teacher.profile);
      setTeacherId(teacher._id);
    }
  }, []);

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
        open={open}
      >
        <DrawerHeader
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/teacher')}
        >
          <h2 className='logo '>SPS.</h2>
        </DrawerHeader>
        <div
          onClick={() => {
            navigate(`/teacher/profile/${teacherId}`);
          }}
        >
          <div className='container teacherProfileMain'>
            <div className=''>
              {profile ? (
                <img
                  src={profile}
                  alt=''
                  style={{ width: 60, height: 60, borderRadius: 500 }}
                />
              ) : (
                <img
                  className='editProfile'
                  alt=''
                  style={{ width: 60, height: 60, borderRadius: 500 }}
                />
              )}
            </div>
          </div>
          <div className='teacherProfileMain'>
            <div>
              <h6>{teacherName ? teacherName : 'Teacher Name'}</h6>
            </div>
          </div>
        </div>
        <List className='mt-2'>
          <ListItem
            button
            className={props.dashboard && 'sidebar-active'}
            key={'Dashboard'}
            onClick={() => {
              navigate('/teacher');
            }}
          >
            <ListItemIcon>
              <HomeIcon className={props.dashboard && 'sidebar-active'} />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem
            className={props.student && 'sidebar-active'}
            button
            key={'Students'}
            onClick={() => {
              navigate('/teacher/students');
            }}
          >
            <ListItemIcon>
              <PersonIcon className={props.student && 'sidebar-active'} />
            </ListItemIcon>
            <ListItemText primary={'Students'} />
          </ListItem>
          <ListItem
            button
            key={'Tasks'}
            onClick={() => {
              navigate('/teacher/tasks');
            }}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary={'Tasks'} />
          </ListItem>
          <ListItem
            button
            key={'Questions'}
            onClick={() => {
              navigate('/teacher/questions');
            }}
          >
            <ListItemIcon>
              <QuestionMarkIcon />
            </ListItemIcon>
            <ListItemText primary={'Questions'} />
          </ListItem>
          <ListItem
            button
            key={'Reviewer'}
            className={props.reviewer && 'sidebar-active'}
            onClick={() => {
              navigate('/teacher/reviewer');
            }}
          >
            <ListItemIcon>
              <GroupsIcon className={props.reviewer && 'sidebar-active'} />
            </ListItemIcon>
            <ListItemText primary={'Reviewers'} />
          </ListItem>
          <ListItem
            button
            className={props.domain && 'sidebar-active'}
            key={'Domains'}
            onClick={() => {
              navigate('/teacher/domains');
            }}
          >
            <ListItemIcon>
              <DnsIcon className={props.domain && 'sidebar-active'} />
            </ListItemIcon>
            <ListItemText primary={'Domains'} />
          </ListItem>
          <ListItem
            button
            key={'Schedules'}
            onClick={() => {
              navigate('/teacher/schedules');
            }}
          >
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary={'Schedules'} />
          </ListItem>
          <ListItem
            button
            key={'Notification'}
            onClick={() => {
              navigate('/teacher/notification');
            }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary={'Notification'} />
          </ListItem>
          <ListItem
            button
            key={'Logout'}
            className={''}
            onClick={() => {
              doTeacherLogout();
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

export default TeacherSideBar;
