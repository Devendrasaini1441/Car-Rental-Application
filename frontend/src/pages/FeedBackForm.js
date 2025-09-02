import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" }); // Clear form fields
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
    <Navbar/>
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center", backgroundColor: "#121212", color: "white", padding: "20px", borderRadius: "10px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom>
          Car Rental Feedback
        </Typography>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", backgroundColor: "#333" } }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={formData.email}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", backgroundColor: "#333" } }}
        />
        <TextField
          label="Message"
          name="message"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", backgroundColor: "#333" } }}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Feedback
          </Button>
        </motion.div>
      </motion.form>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box mt={3} p={2} bgcolor="success.main" color="white" borderRadius={2}>
            <Typography>Feedback recorded successfully!</Typography>
          </Box>
        </motion.div>
      )}
    </Container>
    <Footer/>
    </>
  );
};

export default FeedbackForm;
