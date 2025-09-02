import React from "react";
import { Grid, Typography, Card, CardContent, Box } from "@mui/material";
import {
  DirectionsCar,
  DateRange,
  LocationOn,
  Security,
  CreditCard,
  AppShortcut,
  People,
  Build,
  AttachMoney,
  DriveEta,
} from "@mui/icons-material";

const services = [
  { icon: <DateRange sx={{ color: "#3f51b5", fontSize: 40 }} />, title: "Online Booking", desc: "Book cars with real-time availability." },
  { icon: <LocationOn sx={{ color: "#f44336", fontSize: 40 }} />, title: "Pickup & Drop", desc: "Doorstep pickup and drop facilities." },
  { icon: <AttachMoney sx={{ color: "#4caf50", fontSize: 40 }} />, title: "Hourly/Daily Rental", desc: "Flexible short and long-term rentals." },
  { icon: <DirectionsCar sx={{ color: "#ff9800", fontSize: 40 }} />, title: "Vehicle Choice", desc: "Wide range of hatchbacks to luxury cars." },
  { icon: <AppShortcut sx={{ color: "#9c27b0", fontSize: 40 }} />, title: "Mobile App", desc: "Manage rentals through mobile app." },
  { icon: <CreditCard sx={{ color: "#009688", fontSize: 40 }} />, title: "Transparent Pricing", desc: "Clear cost breakdown with no hidden charges." },
  { icon: <Security sx={{ color: "#e91e63", fontSize: 40 }} />, title: "Insurance", desc: "Basic insurance with optional upgrades." },
  { icon: <Build sx={{ color: "#3f51b5", fontSize: 40 }} />, title: "24/7 Road Assistance", desc: "Emergency support available anytime." },
  { icon: <People sx={{ color: "#00bcd4", fontSize: 40 }} />, title: "Driver/Self-drive", desc: "Choose between self or chauffeur driven." },
  { icon: <DriveEta sx={{ color: "#795548", fontSize: 40 }} />, title: "Flexible Payments", desc: "Pay using UPI, card, wallet, or net banking." },
];

export default function ServicesGrid() {
  return (
    <Box sx={{ background: "#f5f5f5", py: 5 }}>
      <Typography variant="h4" align="center" mb={4} fontWeight={600}>
        🚗 Our Car Rental Services
      </Typography>
      <Grid container spacing={4} justifyContent="center" px={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={5}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                background: "#fff",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box>{service.icon}</Box>
              <Typography variant="h6" mt={2} fontWeight={600}>
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {service.desc}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
