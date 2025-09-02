// src/components/HeroSection.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: "#fff",
        overflow: "hidden",
        px: 4,
      }}
    >
      {/* Content */}
      <Box
        sx={{
          maxWidth: "1300px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {/* Text Content */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="overline" sx={{ color: "#f97316", fontWeight: 600 }}>
            BOOK A CAR NOW
          </Typography>

          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mt: 1 }}
            component={motion.div}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            FAST & AFFORDABLE
          </Typography>

          <Typography
            variant="body1"
            sx={{ mt: 2, maxWidth: "500px", lineHeight: 1.6, color: "#bbb" }}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Discover the best car rental experience with our affordable and reliable fleet. Whether it's business or leisure,
            drive with confidence and style. Flexible pricing, quick bookings, and 24/7 support included.
          </Typography>

          <Typography variant="h6" sx={{ mt: 4 }}>
            LINCOLN MKS SEDAN
          </Typography>

          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
            25$ / DAY
          </Typography>

          <Button
            variant="contained"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              backgroundColor: "#f97316",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#fb923c",
              },
            }}
          >
            BOOK NOW
          </Button>
        </Box>

        {/* Car Image */}
        <Box
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          sx={{ maxWidth: 600, width: "100%" }} // removed `mr: 12`
        >
          <img
            src="https://www.v3cars.com/media/content/732344fortuner-leader.webp"
            alt="car"
            style={{ width: "100%", objectFit: "contain", transform: "scale(1.1)" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
