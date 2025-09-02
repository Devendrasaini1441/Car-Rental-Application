import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Grid,
} from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    const existingData = JSON.parse(localStorage.getItem("carRentalContacts")) || [];
    localStorage.setItem("carRentalContacts", JSON.stringify([...existingData, formData]));

    setSuccess(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 2, md: 6 }, py: 5 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left: Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "#fff",
              boxShadow: "none", // <- removes any custom shadow
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "#f97316", fontWeight: "bold", textAlign: "center" }}
            >
              Get in Touch
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Your message has been submitted successfully!
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                sx={{ mb: 2 }}
                type="tel"
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                variant="outlined"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ mb: 3 }}
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  fontWeight: "bold",
                  py: 1.2,
                  backgroundColor: "#f97316",
                  "&:hover": {
                    backgroundColor: "#fb923c",
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Right: Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: 3,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/car-rental-concept-illustration_114360-9267.jpg?semt=ais_hybrid&w=740"
              alt="Contact Us"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
