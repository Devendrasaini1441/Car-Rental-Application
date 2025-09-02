import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@mui/material";
import { CarContext } from "../context/CarContext";
import { AuthContext } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CarManagement = () => {
  const {
    cars,
    bookings,
    error,
    loading,
    carState,
    bookingState,
    paymentState,
    setBookingState,
    setPaymentState,
    fetchCars,
    addCar,
    deleteCar,
    bookCar,
    processPayment,
    confirmPayment,
    cancelBooking,
    fetchBookings
  } = useContext(CarContext);

  const { isAuthenticated } = useContext(AuthContext);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [openAddCarDialog, setOpenAddCarDialog] = useState(false);
  const [newCar, setNewCar] = useState({
    name: "",
    model: "",
    price: "",
    image: "",
    isAvailable: true
  });

  const handleOpenAddCarDialog = () => {
    setOpenAddCarDialog(true);
  };

  const handleCloseAddCarDialog = () => {
    setOpenAddCarDialog(false);
    setNewCar({
      name: "",
      model: "",
      price: "",
      image: "",
      isAvailable: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleAddCarSubmit = async (e) => {
    e.preventDefault();
    await addCar(newCar);
    handleCloseAddCarDialog();
  };

  const handleBookAndPay = async (carId) => {
    const bookingInfo = await bookCar(carId);
    if (bookingInfo) {
      setCurrentBooking(bookingInfo);
      const secret = await processPayment(bookingInfo.bookingId, bookingInfo.amount);
      setClientSecret(secret);
      setBookingState("B4"); // ✅ Ensure this is called to trigger rendering
    }
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    const success = await confirmPayment(paymentIntentId);
    if (success) {
      setCurrentBooking(null);
      setClientSecret("");
      setPaymentState("PY1");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const success = await cancelBooking(bookingId);
    if (success && currentBooking?.bookingId === bookingId) {
      setCurrentBooking(null);
      setClientSecret("");
      setPaymentState("PY1");
    }
  };

  const renderStateInfo = () => {
    return <></>; // You can enhance this as needed
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Car Rental Management
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddCarDialog}
            sx={{ mb: 4 }}
          >
            Add New Car
          </Button>

          <Dialog open={openAddCarDialog} onClose={handleCloseAddCarDialog}>
            <DialogTitle>Add New Car</DialogTitle>
            <DialogContent>
              <form onSubmit={handleAddCarSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  value={newCar.name}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  label="Model"
                  name="model"
                  fullWidth
                  margin="normal"
                  value={newCar.model}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={newCar.price}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  label="Image URL"
                  name="image"
                  fullWidth
                  margin="normal"
                  value={newCar.image}
                  onChange={handleInputChange}
                  required
                />
                <DialogActions>
                  <Button onClick={handleCloseAddCarDialog} color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Add Car
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>

          <Typography variant="h5" gutterBottom>
            Available Cars
          </Typography>

          {loading && carState === "P2" ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {cars.map((car) => (
                <Grid item key={car._id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={car.image}
                      alt={car.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{car.name}</Typography>
                      <Typography variant="body2">{car.model}</Typography>
                      <Typography variant="body1">${car.price}</Typography>
                      <Button
                        onClick={() => handleBookAndPay(car._id)}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={!car.isAvailable || loading}
                      >
                        {car.isAvailable ? "Book & Pay" : "Unavailable"}
                      </Button>
                      <Button
                        onClick={() => deleteCar(car._id)}
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                      >
                        Delete Car
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ✅ Stripe Payment Box */}
          {bookingState === "B4" && clientSecret && (
            <Box sx={{ mt: 4, p: 3, border: "1px solid #eee", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Complete Payment (${currentBooking?.amount})
              </Typography>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                  onError={() => setPaymentState("PY4")}
                  onCancel={() => handleCancelBooking(currentBooking.bookingId)}
                />
              </Elements>
            </Box>
          )}

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Bookings
            </Typography>
            {bookings.length === 0 ? (
              <Typography>No bookings found.</Typography>
            ) : (
              <Grid container spacing={3}>
                {bookings.map((booking) => (
                  <Grid item key={booking._id} xs={12} sm={6} md={5}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          Booking ID: {booking._id}
                        </Typography>
                        <Typography variant="body2">
                          User: {booking.user?.name} ({booking.user?.email})
                        </Typography>
                        <Typography variant="body2">
                          Car: {booking.car?.name} ({booking.car?.model})
                        </Typography>
                        <Typography variant="body2">
                          Status: {booking.status}
                        </Typography>
                        <Typography variant="body2">
                          Payment: {booking.paymentStatus || "Confirmed"}
                        </Typography>
                        {booking.status === "Booked" && (
                          <Button
                            onClick={() => handleCancelBooking(booking._id)}
                            variant="outlined"
                            color="error"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={loading}
                          >
                            Cancel Booking
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {renderStateInfo()}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default CarManagement;
