import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
//import carRentalImage from "../assets/car-rental.jpg";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          mt: 5,
          textAlign: "center",
          color: "white",
          backgroundColor: "#121212",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" gutterBottom>
            About Our Car Rental Service
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            component="img"
            src='https://hagerty-media-prod.imgix.net/2021/12/2021-Toyota-Corolla-Hatchback-SE-Nightshade-3-scaled.jpg?auto=format%2Ccompress&ixlib=php-3.3.0'
            alt="Car Rental"
            sx={{ width: "100%", borderRadius: "10px", mb: 3 }}
          />

          <Typography variant="body1" paragraph>
            Welcome to our premium car rental service! We offer a wide range of vehicles to suit all your travel needs,
            whether it's a short business trip or a long road adventure.
          </Typography>
          <Typography variant="body1" paragraph>
            Our fleet includes luxury sedans, spacious SUVs, and budget-friendly options. With easy booking, affordable
            pricing, and top-notch customer service, we ensure a smooth and comfortable journey for all our customers.
          </Typography>
          <Typography variant="body1" paragraph>
            Why choose us?
          </Typography>
          <Typography variant="body1" paragraph>
            - Wide selection of vehicles for every need and budget
          </Typography>
          <Typography variant="body1" paragraph>
            - Simple and hassle-free online booking process
          </Typography>
          <Typography variant="body1" paragraph>
            - 24/7 customer support to assist you anytime
          </Typography>
          <Typography variant="body1" paragraph>
            - Flexible rental periods and competitive pricing
          </Typography>
          <Typography variant="body1" paragraph>
            Experience hassle-free car rentals with us today!
          </Typography>
        </motion.div>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;
