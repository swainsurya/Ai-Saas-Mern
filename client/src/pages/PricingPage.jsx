import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";


const plans = [
  {
    id: 1,
    type: "Free Plan",
    credits: 10,
    price: 0
  },
  {
    id: 2,
    type: "Standard Plan",
    credits: 500,
    price: 5
  },
  {
    id: 3,
    type: "Pro Plan",
    credits: 1000,
    price: 10
  },
]

export default function PricingPage() {
  const {setLoading , setUser , setCredits} = useAuth();
  const handleBuy = async(plan) => {
    setLoading(true);
    try {
      const {data} = await axios.post("/buy/checkout-session",{amount:plan.price*100 , name: plan.type})
      setUser(data.user)
      setCredits(data.user.credits)
      window.location.href = data.url
    } catch (error) {
      console.error("Payment error:", error);
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-8 md:px-16 lg:px-24">
        <h1 className="md:text-5xl text-3xl font-extrabold mb-10 text-center">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
          {/* All Plan */}
          {
            plans.map((plan) => (
              <div className="border rounded-lg p-8 shadow-lg text-center bg-blue-100">
                <h2 className="text-2xl font-bold mb-4">{plan.type}</h2>
                <p className="text-gray-700 mb-6">{plan.credits} credits per month</p>
                <p className="text-3xl font-semibold mb-6">${plan.price}/month</p>
                <Button onClick={e=>handleBuy(plan)} className="w-full bg-blue-600 text-white hover:bg-blue-700">Subscribe</Button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
