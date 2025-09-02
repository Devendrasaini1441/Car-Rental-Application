import React from "react";
import { Box, Container, Grid, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        color: "white",
        padding: "40px 0 20px",
        marginTop: "40px",
        borderTop: "1px solid #333",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ color: "#f97316", fontWeight: "bold", mb: 1 }}>
              QuickRide
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Your trusted car rental service with top-class vehicles and affordable rates.
            </Typography>
            <Typography variant="body2">
              We offer a variety of cars to suit your needs, whether for business or leisure travel.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Button component={Link} to="/" sx={{ color: "#fff", textTransform: "none", justifyContent: "flex-start" }}>
                Home
              </Button>
              <Button component={Link} to="/about" sx={{ color: "#fff", textTransform: "none", justifyContent: "flex-start" }}>
                About
              </Button>
              <Button component={Link} to="/services" sx={{ color: "#fff", textTransform: "none", justifyContent: "flex-start" }}>
                Services
              </Button>
              <Button component={Link} to="/contact" sx={{ color: "#fff", textTransform: "none", justifyContent: "flex-start" }}>
                Contact
              </Button>
              <Button component={Link} to="/faqs" sx={{ color: "#fff", textTransform: "none", justifyContent: "flex-start" }}>
                FAQs
              </Button>
              <Button component={Link} to="/support" sx={{ color: "#fff", textTransform: "none", justifyContent: "flex-start" }}>
                Support
              </Button>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>📞 +1 (234) 567-890</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>📧 support@carrental.com</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>📍 123 Car Rental Street, City, Country</Typography>
            <Typography variant="body2">🕒 Mon-Sun: 8 AM - 10 PM</Typography>
          </Grid>
        </Grid>

        {/* Bottom Line */}
        <Box textAlign="center" mt={4} pt={2} borderTop="1px solid #333">
          <Typography variant="body2" sx={{ color: "gray" }}>
            © 2024 QuickRide. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
