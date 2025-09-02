
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const AboutHome = () => {
  return (
    <Box
      sx={{
        //backgroundColor: "#f5f5f5",
        px: { xs: 3, md: 10 },
        py: { xs: 6, md: 10 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
      }}
    >
      {/* Left Text Content */}
      <Box
        component={motion.div}
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{ flex: 1 }}
      >
        <Typography variant="overline" sx={{ color: "#f97316", fontWeight: 600 }}>
          About Our Rental
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Reliable Car Rentals for Everyone
        </Typography>

        <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7 }}>
          At SpeedyDrive Car Rentals, we offer a wide range of vehicles to suit your every journey – from sleek sedans to
          spacious SUVs. Whether you're heading on a business trip, a weekend getaway, or a road trip with friends, our
          affordable pricing and 24/7 customer support ensure a smooth and stress-free experience.
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, color: "#555", lineHeight: 1.7 }}>
          Our mission is simple — provide safe, clean, and well-maintained vehicles at competitive prices. With flexible
          booking options and easy returns, renting a car has never been this convenient!
        </Typography>
      </Box>

      {/* Right Image */}
      <Box
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        sx={{ flex: 1, textAlign: "center" }}
      >
        <img
          src="https://img.freepik.com/premium-vector/online-car-rent-service-flat-design-concept-vector-illustration_7087-2068.jpg?semt=ais_hybrid&w=740"
          alt="About Car"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default AboutHome;
