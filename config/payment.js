import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY IS UNDEFINED");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
