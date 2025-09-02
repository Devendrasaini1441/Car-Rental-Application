// src/components/HeroCarousel.js
import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cars = [
  {
    name: "Lincoln MKS Sedan",
    price: "25$ / Day",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrHbLKIXTNvdPaMMgxfI7D6XueMD43qp5l5Q&s",
    description: "Luxury and comfort combined. Ideal for business and leisure trips.",
  },
  {
    name: "Toyota Camry",
    price: "22$ / Day",
    image: "https://img.autocarindia.com/ExtraImages/20241118123511_Untitled%20design%20_54_.jpg?w=700&c=1",
    description: "Reliable and efficient sedan for your everyday travel needs.",
  },
  {
    name: "BMW M3",
    price: "40$ / Day",
    image: "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/topics/magazine-article-pool/2019/bmw-m3-csl/bmw-m3-csl-stage.jpg",
    description: "Sporty performance and premium comfort. Drive with confidence.",
  },
];

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        py: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ width: "80%", borderRadius: 2, overflow: "hidden" }}>
        <Slider {...settings}>
          {cars.map((car, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                height: "80vh",
                borderRadius: 2,
              }}
            >
              {/* Car Image */}
              <Box
                component="img"
                src={car.image}
                alt={car.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />

              {/* Overlay Content */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "10%",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  zIndex: 2,
                  maxWidth: "500px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: "#f97316", fontWeight: 600, fontSize: "1rem" }}
                >
                  BOOK A CAR NOW
                </Typography>

                <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1 }}>
                  {car.name}
                </Typography>

                <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                  {car.description}
                </Typography>

                <Typography variant="h5" sx={{ mt: 3, fontWeight: 500 }}>
                  {car.price}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#f97316",
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#fb923c",
                    },
                  }}
                >
                  BOOK NOW
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default HeroCarousel;
