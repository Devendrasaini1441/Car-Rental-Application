import React, { useState, useContext } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Paper,
  Slide
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setLoginState, setUserId, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setError("");
      setLoginState("P5");
      setUserId(res.data.user._id);
      setIsAuthenticated(true);
      alert("Login successful!");
      navigate("/car");
    } catch (err) {
      setError("Invalid credentials");
      setLoginState("P6");
    }
  };

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
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
            Login
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ mb: 3 }}>
            Access your account to explore premium cars!
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
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
                  <InputAdornment position="end" onClick={handleTogglePassword} sx={{ cursor: "pointer" }}>
                    {showPassword ? <Visibility sx={{ color: "#64b5f6" }} /> : <VisibilityOff sx={{ color: "#64b5f6" }} />}
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

            {/* Login Button */}
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
              Login
            </Button>

            {/* Sign Up Link */}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don’t have an account?{" "}
              <a href="/signup" style={{ color: "#64b5f6", fontWeight: "bold", textDecoration: "none" }}>
                Sign up
              </a>
            </Typography>
          </form>
        </Paper>
      </Slide>
    </Box>
  );
};

export default Login;
