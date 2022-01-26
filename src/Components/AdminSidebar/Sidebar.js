import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router";


const drawerWidth = 200;

const DrawerHeader = styled("div")(({ theme }) => ({
  //   display: "",
  alignItems: "center",
  padding: theme.spacing(2, 5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar(props) {
  console.log(props);
  const [open, setOpen] = React.useState(true);
  const navigate=useNavigate()

  const doLogout=()=>{
      localStorage.removeItem('Admin')
      navigate('/admin/login')
  }

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
        <DrawerHeader>
          <h2 className="logo ">SPS.</h2>
        </DrawerHeader>
        <List className="mt-5">
          <ListItem button key={"Dashboard"} onClick={()=>{navigate('/admin')}}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button key={"Teachers"} onClick={()=>{navigate('/admin/teachers')}}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Teachers"} />
          </ListItem>
          <ListItem button key={"Logout"} className={""} onClick={()=>{
              doLogout()    
          }}>
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
