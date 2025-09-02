// src/components/CarRentalFAQs.js
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What documents are required to rent a car?",
    answer:
      "You need a valid driving license, a government-issued ID (like Aadhaar or Passport), and in some cases, a credit/debit card for verification.",
  },
  {
    question: "Can I book a car without a driver (self-drive)?",
    answer:
      "Yes! We offer both self-drive and chauffeur-driven rental options. Select your preference while booking.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No. All prices are transparent. Taxes, insurance, and service fees are clearly shown during the booking process.",
  },
  {
    question: "What if the car breaks down during the trip?",
    answer:
      "We provide 24/7 roadside assistance. Call our support, and we’ll arrange repairs or a replacement vehicle.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes. You can cancel or reschedule your booking through your account dashboard. Refunds depend on the cancellation policy.",
  },
];

const CarRentalFAQs = () => {
  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🚗 Car Rental FAQs
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2, borderRadius: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CarRentalFAQs;
