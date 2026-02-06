import stripe from "../config/payment.js";
import Order from "../models/Order.js";

// Create Stripe Payment Intent
export const createStripePayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ message: "Stripe payment failed" });
  }
};

// Confirm payment & update order
export const confirmStripePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    await order.save();

    res.json({ message: "Stripe payment successful" });
  } catch (error) {
    console.error("Confirm payment error:", error.message);
    res.status(500).json({ message: "Payment confirmation failed" });
  }
};
