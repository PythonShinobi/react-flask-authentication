// client/src/navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  Container,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';

import "./Navbar.css";
import { useAuth } from "../authContext.js";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Debugging: Log authentication status
  useEffect(() => {
    console.log('Is authenticated:', isAuthenticated());
  }, [isAuthenticated]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const showProfile = () => {
    navigate("/profile");
  };

  const drawerItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <List>
        {!isAuthenticated() ? (
          <>
            <ListItem component={NavLink} to="/login">
              <LoginIcon sx={{ mr: 1, color: "black" }} />
              <ListItemText primaryTypographyProps={{ sx: { color: 'black' } }} primary="Login" />
            </ListItem>
            <ListItem component={NavLink} to="/register">
              <HowToRegIcon sx={{ mr: 1, color: "black" }} />
              <ListItemText primaryTypographyProps={{ sx: { color: 'black' } }} primary="Register" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem onClick={showProfile}>
              <AccountCircleIcon sx={{ mr: 1, color: "black" }} />
              <ListItemText primaryTypographyProps={{ sx: { color: 'black' } }} primary="Profile" />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <PersonIcon sx={{ mr: 1, color: "black" }} />
              <ListItemText primaryTypographyProps={{ sx: { color: 'black' } }} primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (    
    <AppBar position="fixed" className="navbar" color="default">
      <Container>
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            BingeQuest
          </Typography>
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
            {!isAuthenticated() ? (
              <>
                <Button color="inherit" component={NavLink} to="/login">
                  <LoginIcon sx={{ mr: 1 }} />
                  Login
                </Button>
                <Button color="inherit" component={NavLink} to="/register">
                  <HowToRegIcon sx={{ mr: 1 }} />
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={showProfile}>
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  <PersonIcon sx={{ mr: 1 }} />
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerItems}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;