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
  ListItemText,
  useTheme,
  useMediaQuery
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
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if screen size is small

  // Check local storage for user session
  useEffect(() => {
    const sessionData = localStorage.getItem('user');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      setAuthenticated(true);
      setUsername(parsedData.username || '');
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      const status = await logout();      
      if (status === 200) {
        localStorage.removeItem('user'); // Remove cached user data
        setAuthenticated(false); // Update state to reflect user is logged out
        setUsername(''); // Clear the username state
        navigate('/'); // Redirect the user to the home page
      } else {
        // Handle any unexpected status codes (this should be covered in the logout function)
        console.error('Failed to log out.');
      }
    } catch (error) {
      // Error handling if the logout fails
      console.error('Error logging out:', error);
      // Display an error message or take appropriate action
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
        {!authenticated ? (
          <>
            <ListItem component={NavLink} to="/login" onClick={handleDrawerToggle}>
              <LoginIcon sx={{ mr: 1, color: "black" }} />
              <ListItemText primaryTypographyProps={{ sx: { color: 'black' } }} primary="Login" />
            </ListItem>
            <ListItem component={NavLink} to="/register" onClick={handleDrawerToggle}>
              <HowToRegIcon sx={{ mr: 1, color: "black" }} />
              <ListItemText primaryTypographyProps={{ sx: { color: 'black' } }} primary="Register" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem onClick={() => { showProfile(); handleDrawerToggle(); }}>
              <AccountCircleIcon sx={{ mr: 1, color: "black" }} />
              <ListItemText primaryTypographyProps={{ sx: { color: 'black' } }} primary={`${username}`} />
            </ListItem>
            <ListItem onClick={() => { handleLogout(); handleDrawerToggle(); }}>
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
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h5" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Authentication
          </Typography>
          {!isMobile ? (
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
              {!authenticated ? (
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
                    {username}
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Logout
                  </Button>
                </>
              )}
            </Box>
          ) : null}
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