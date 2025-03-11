import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const plans = [
  {
    id: 1,
    type: "Free Plan",
    credits: 100,
    price: 0,
  },
  {
    id: 2,
    type: "Standard Plan",
    credits: 500,
    price: 5,
  },
  {
    id: 3,
    type: "Pro Plan",
    credits: 1000,
    price: 10,
  },
];

export default function LandingPage() {
  const { setLoading, setUser, setCredits } = useAuth();
  
  const handleBuy = async (plan) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/buy/checkout-session", {
        amount: plan.price * 100,
        name: plan.type,
      });
      setUser(data.user);
      setCredits(data.user.credits);
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-gray-900 overflow-y-auto">
      <Navbar />
      
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4 md:text-6xl text-white drop-shadow-lg">Turn Your Imagination into Art</h1>
        <p className="text-lg text-white mb-6 md:text-2xl drop-shadow-md">Generate AI-powered images instantly with our advanced text-to-image generator.</p>
        <img 
          src="https://images.unsplash.com/photo-1495055154266-57bbdeada43e?q=80&w=2070&auto=format&fit=crop"
          alt="AI Generated Art"
          className="md:w-[800px] rounded-lg shadow-xl border border-gray-300" 
        />
        <Link to="/dashboard">
          <Button className="mt-10 px-6 py-3 text-lg bg-white text-gray-900 rounded-lg hover:bg-gray-200 shadow-lg">Get Started</Button>
        </Link>
      </section>

      <section className="py-20 px-6 bg-white text-center rounded-xl shadow-lg mx-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "High-Quality Images", desc: "Generate ultra-realistic images with AI technology.", img: "https://images.unsplash.com/photo-1693239492381-ca83f56fea43?q=80&w=2071&auto=format&fit=crop" },
            { title: "Fast & Efficient", desc: "Get your AI-generated images in seconds.", img: "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?q=80&w=1998&auto=format&fit=crop" },
            { title: "Easy to Use", desc: "A simple and intuitive interface for all users.", img: "https://images.unsplash.com/photo-1615752865424-62638daceeae?q=80&w=1932&auto=format&fit=crop" },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-gray-200 rounded-lg shadow-xl flex flex-col items-center hover:bg-gray-300 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-700 mb-4">{feature.desc}</p>
              <img src={feature.img} alt={feature.title} className="h-48 w-full rounded-md shadow-md" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-200 text-center rounded-xl shadow-lg mx-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Pricing Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-8 shadow-xl text-center bg-white hover:shadow-2xl transition-all">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{plan.type}</h2>
              <p className="text-gray-700 mb-6">{plan.credits} credits per month</p>
              <p className="text-3xl font-semibold mb-6 text-indigo-600">${plan.price}/month</p>
              <Button onClick={() => handleBuy(plan)} className="w-full bg-indigo-600 text-white hover:bg-indigo-700">Subscribe</Button>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-6 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} AIMAGINIFY. All rights reserved.</p>
      </footer>
    </div>
  );
}