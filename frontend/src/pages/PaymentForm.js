import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Typography, Box, CircularProgress } from "@mui/material";

const PaymentForm = ({ clientSecret, onSuccess, onError }) => {  // Add clientSecret prop
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {  // Add clientSecret check
      setError("Payment system not ready");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,  // Use the passed clientSecret
        {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        }
      );

      if (stripeError) {
        throw stripeError;
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      setError(err.message || "Payment failed");
      onError();
    } finally {
      setProcessing(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Box>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        disabled={!stripe || processing}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        {processing ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;