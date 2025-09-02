// src/components/Signup.js
import React, { useState, useContext } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  Slide,
  IconButton
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setSignupState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      setError("");
      setSignupState("P2");
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
      setSignupState("P3");
    }
  };

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundImage: `url('https://blog.remove-bg.ai/wp-content/uploads/2024/03/background-car-editing-photo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Slide in direction="up" timeout={1000}>
        <Paper
          elevation={12}
          sx={{
            width: "90%",
            maxWidth: 320,
            px: 3,
            py: 4,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            borderRadius: 3,
            color: "#fff",
            boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight="bold" sx={{ mb: 1 }}>
            Signup
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ mb: 3 }}>
            Create a new account to explore premium cars!
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <TextField
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#64b5f6" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#ccc" } }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease",
                  "& fieldset": { borderColor: "#64b5f6" },
                  "&:hover fieldset": { borderColor: "#2196f3" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e88e5",
                    boxShadow: "0 0 6px 1px rgba(33,150,243,0.5)",
                  },
                },
              }}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#64b5f6" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#ccc" } }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease",
                  "& fieldset": { borderColor: "#64b5f6" },
                  "&:hover fieldset": { borderColor: "#2196f3" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e88e5",
                    boxShadow: "0 0 6px 1px rgba(33,150,243,0.5)",
                  },
                },
              }}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#64b5f6" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end" sx={{ color: "#64b5f6" }}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#ccc" } }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease",
                  "& fieldset": { borderColor: "#64b5f6" },
                  "&:hover fieldset": { borderColor: "#2196f3" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1e88e5",
                    boxShadow: "0 0 6px 1px rgba(33,150,243,0.5)",
                  },
                },
              }}
            />

            {/* Signup Button */}
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: "bold",
                background: "#0d47a1",
                color: "#fff",
                borderRadius: 2,
                transition: "0.3s ease-in-out",
                boxShadow: "0 4px 20px rgba(13,71,161,0.4)",
                "&:hover": {
                  background: "#1565c0",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 25px rgba(21,101,192,0.5)",
                },
              }}
            >
              Signup
            </Button>

            {/* Already have account */}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#64b5f6", fontWeight: "bold", textDecoration: "none" }}>
                Login
              </a>
            </Typography>
          </form>
        </Paper>
      </Slide>
    </Box>
  );
};

export default Signup;
