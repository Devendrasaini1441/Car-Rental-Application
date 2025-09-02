// src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#111", boxShadow: "none", paddingX: 2 }}>
      {/* Top Contact Info */}
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="body2" color="gray" sx={{ fontSize: "0.85rem" }}>
          +123 456 7890 | carrent@example.com
        </Typography>
      </Toolbar>

      {/* Logo and Navigation */}
      <Toolbar sx={{ justifyContent: "space-between", paddingY: 1 }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f97316" }}>
          QuickRide
        </Typography>

        {/* Menu Links */}
        <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" } }}>
          <Button component={Link} to="/" sx={{ color: "#fff", fontWeight: "bold" }}>
            HOME
          </Button>
          <Button component={Link} to="/about" sx={{ color: "#fff", fontWeight: "bold" }}>
            ABOUT US
          </Button>
          <Button component={Link} to="/car" sx={{ color: "#fff", fontWeight: "bold" }}>
            SERVICES
          </Button>
          <Button component={Link} to="/contact" sx={{ color: "#fff", fontWeight: "bold" }}>
            CONTACT
          </Button>
        </Stack>

        {/* Login Button & Hamburger Menu */}
        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#fff" }}
          >
            LOGIN
          </Button>
          <IconButton sx={{ color: "#fff", display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
