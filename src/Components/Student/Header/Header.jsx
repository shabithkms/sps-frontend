import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { MenuItem, Menu } from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router";

function Header() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const doLogout=()=>{
    localStorage.removeItem('student')
    navigate('/login')
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/profile");
          handleMenuClose();
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={doLogout}>Logout</MenuItem>
    </Menu>
  );
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        className="text-dark shadow"
      >
        <Container>
          <Navbar.Brand>
            <span className="logo-header">SPS </span>
            <span className="logo-dot">.</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link>Tasks</Nav.Link>
              <Nav.Link>Manifest</Nav.Link>
              <Nav.Link>Timeline</Nav.Link>
              <Nav.Link></Nav.Link>
              <Nav.Link>
                <div onClick={handleProfileMenuOpen} className="pb-2">
                  <img
                    style={{ width: 50, height: 50 }}
                    alt=""
                    className="student-profile"
                  />
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        {renderMenu}
      </Navbar>
    </div>
  );
}

export default Header;
