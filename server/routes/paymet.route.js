import {Router} from "express"
import Stripe from "stripe"
import { userVerify } from "../middlewares/userVerify.js";
import { userModel } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentRouter = Router()

paymentRouter.post("/checkout-session", userVerify, async (req, res) => {
  const {userId} = req 
  const { amount,name } = req.body; // Amount in cents
  const success_url = `https://aimaginify.onrender.com//success/${amount}`
  const cancel_url = "https://aimaginify.onrender.com/"
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name},
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url,
      cancel_url,
    });

    const user = await userModel.findById(userId)
    if(session.url == success_url) {
        alert("I am here")
        user.credits += amount
    }
    await user.save();
    res.json({ url: session.url, user });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default paymentRouter;