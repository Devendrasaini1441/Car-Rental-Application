// src/App.js
import React, { useContext } from "react"; // Import useContext
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CarManagement from "./pages/CarManagement";
import { AuthContextProvider } from "./context/AuthContext";
import { CarContextProvider } from "./context/CarContext";
import { AuthContext } from "./context/AuthContext"; // Import AuthContext
import AboutPage from "./pages/About";
import FeedbackForm from "./pages/FeedBackForm";
import "./App.css"
import Home from "./pages/Home";
function App() {
  return (
    <AuthContextProvider>
      <CarContextProvider>
        <Router>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route
              path="/car"
              element={
                <ProtectedRoute>
                  <CarManagement />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to login by default */}
          </Routes>
        </Router>
      </CarContextProvider>
    </AuthContextProvider>
  );
}

// ProtectedRoute component to check authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Use useContext and AuthContext
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;