import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import DnsIcon from "@mui/icons-material/Dns";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Teacher.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const drawerWidth = 200;

const DrawerHeader = styled("div")(({ theme }) => ({
  //   display: "",
  alignItems: "center",
  padding: theme.spacing(2, 5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function TeacherSideBar() {
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const navigate = useNavigate();
  let open = true;
  const doTeacherLogout = () => {
    localStorage.removeItem("teacher");
    navigate("/teacher/login");
  };

  useEffect(() => {
    let teacher = JSON.parse(localStorage.getItem("teacher"));
    if (teacher) {
      setTeacherName(teacher.name);
      setTeacherId(teacher._id);
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{cursor:'pointer'}} onClick={()=>navigate('/teacher')}>
          <h2 className="logo ">SPS.</h2>
        </DrawerHeader>
        <div
          onClick={() => {
            navigate(`/teacher/profile/${teacherId}`);
          }}
        >
          <div className="container teacherProfileMain">
            <div className="teacherProfile"></div>
          </div>
          <div className="teacherProfileMain">
            <div>
              <h6>{teacherName ? teacherName : "Teacher Name"}</h6>
            </div>
          </div>
        </div>
        <List className="mt-2">
          <ListItem
            button
            key={"Dashboard"}
            onClick={() => {
              navigate("/teacher");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem
            button
            key={"Students"}
            onClick={() => {
              navigate("/teacher/students");
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Students"} />
          </ListItem>
          <ListItem
            button
            key={"Tasks"}
            onClick={() => {
              navigate("/teacher/tasks");
            }}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary={"Tasks"} />
          </ListItem>
          <ListItem
            button
            key={"Questions"}
            onClick={() => {
              navigate("/teacher/questions");
            }}
          >
            <ListItemIcon>
              <QuestionMarkIcon />
            </ListItemIcon>
            <ListItemText primary={"Questions"} />
          </ListItem>
          <ListItem
            button
            key={"Reviewer"}
            onClick={() => {
              navigate("/teacher/reviewer");
            }}
          >
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary={"Reviewers"} />
          </ListItem>
          <ListItem
            button
            key={"Batches"}
            onClick={() => {
              navigate("/teacher/batches");
            }}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={"Batches"} />
          </ListItem>
          <ListItem
            button
            key={"Domains"}
            onClick={() => {
              navigate("/teacher/domains");
            }}
          >
            <ListItemIcon>
              <DnsIcon />
            </ListItemIcon>
            <ListItemText primary={"Domains"} />
          </ListItem>
          <ListItem
            button
            key={"Schedules"}
            onClick={() => {
              navigate("/teacher/schedules");
            }}
          >
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary={"Schedules"} />
          </ListItem>
          <ListItem
            button
            key={"Notification"}
            onClick={() => {
              navigate("/teacher/notification");
            }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary={"Notification"} />
          </ListItem>
          <ListItem
            button
            key={"Logout"}
            className={""}
            onClick={() => {
              doTeacherLogout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default TeacherSideBar;
