import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CarContext = createContext();

export const CarContextProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Petri Net states
  const [carState, setCarState] = useState("P1");
  const [bookingState, setBookingState] = useState("B1");
  const [paymentState, setPaymentState] = useState("PY1");

  const { userId } = useContext(AuthContext);

  const fetchCars = async () => {
    setLoading(true);
    setCarState("P2");
    try {
      const response = await axios.get("http://localhost:5000/api/cars/all");
      setCars(response.data);
      setCarState("P3");
    } catch (err) {
      setError("Failed to fetch cars");
      setCarState("P4");
    } finally {
      setLoading(false);
    }
  };

  const addCar = async (carData) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/cars/add", carData);
      setCars(prev => [...prev, response.data]);
      setCarState("P3");
      return true;
    } catch (err) {
      setError("Failed to add car");
      setCarState("P4");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (carId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/cars/${carId}`);
      setCars(prev => prev.filter(car => car._id !== carId));
      setCarState("P3");
    } catch (err) {
      setError("Failed to delete car");
    } finally {
      setLoading(false);
    }
  };

  const bookCar = async (carId) => {
    setLoading(true);
    setBookingState("B2");
    try {
      if (!userId) throw new Error("User not authenticated");

      const car = await axios.get(`http://localhost:5000/api/cars/${carId}`);
      if (!car.data || !car.data.isAvailable) {
        throw new Error(car.data ? "Car not available" : "Car not found");
      }

      const bookingResponse = await axios.post("http://localhost:5000/api/bookings/book", {
        user: userId,
        car: carId,
      });

      setCars(prev => prev.map(c => c._id === carId ? { ...c, isAvailable: false } : c));
      setBookings(prev => [...prev, bookingResponse.data.booking]);

      setBookingState("B4");
      setPaymentState("PY2");

      return {
        bookingId: bookingResponse.data.booking._id,
        amount: car.data.price
      };
    } catch (err) {
      setError(err.message);
      setBookingState("B3");
      setPaymentState("PY4");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async (bookingId, amount) => {
    setPaymentState("PY2");
    try {
      const paymentResponse = await axios.post(
        "http://localhost:5000/api/payments/create-payment-intent",
        { bookingId, amount }
      );
      return paymentResponse.data.clientSecret;
    } catch (err) {
      setError("Payment initialization failed");
      setPaymentState("PY4");
      return null;
    }
  };

  const confirmPayment = async (paymentIntentId) => {
    try {
      await axios.post("http://localhost:5000/api/payments/confirm-payment", {
        paymentIntentId
      });
      setPaymentState("PY3");
      setBookingState("B5");
      return true;
    } catch (err) {
      setError("Payment confirmation failed");
      setPaymentState("PY4");
      return false;
    }
  };

  const cancelBooking = async (bookingId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);

      setCars(prev =>
        prev.map(car =>
          car._id === response.data.car._id ? { ...car, isAvailable: true } : car
        )
      );

      setBookings(prev => prev.filter(b => b._id !== bookingId));
      return true;
    } catch (err) {
      setError("Failed to cancel booking");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data);
    } catch (err) {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, []);

  return (
    <CarContext.Provider value={{
      cars,
      bookings,
      error,
      loading,
      carState,
      bookingState,
      paymentState,
      setBookingState,      // ✅ ADDED HERE
      setPaymentState,
      fetchCars,
      addCar,
      deleteCar,
      bookCar,
      processPayment,
      confirmPayment,
      cancelBooking,
      fetchBookings
    }}>
      {children}
    </CarContext.Provider>
  );
};
