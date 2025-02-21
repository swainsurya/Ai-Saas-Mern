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

export default function LandingPage() {

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
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-y-scroll no-scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4 md:text-6xl">Turn Your Imagination into Art</h1>
        <p className="text-lg text-gray-600 mb-6 md:text-2xl">Generate AI-powered images instantly with our advanced text-to-image generator.</p>
        <img src="https://images.unsplash.com/photo-1495055154266-57bbdeada43e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="md:w-[800px] rounded-md shadow-md" />
        <Link to={"/dashboard"}>
          <Button className="my-10 px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700">Get Started</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center justify-between">
            <h3 className="text-xl font-semibold mb-2">High-Quality Images</h3>
            <p className="text-gray-600">Generate ultra-realistic images with AI technology.</p>
            <img src="https://images.unsplash.com/photo-1693239492381-ca83f56fea43?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-[80%] w-full rounded-md" />
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center justify-between">
            <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
            <p className="text-gray-600">Get your AI-generated images in seconds.</p>
            <img src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-[80%] w-full rounded-md" />
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col items-center justify-between">
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">A simple and intuitive interface for all users.</p>
            <img src="https://images.unsplash.com/photo-1615752865424-62638daceeae?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-[80%] w-full rounded-md" />
          </div>
        </div>
      </section>

      {/* Generated Images Section */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6">Recently Generated Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <img src="https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Generated 1" className="rounded-lg shadow" />
          <img src="https://plus.unsplash.com/premium_photo-1685783757091-80707f8f37ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGp1bmdsZSUyMGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D" alt="Generated 2" className="rounded-lg shadow w-full h-full" />
          <img src="https://images.unsplash.com/photo-1463593042669-1bf00846b1b6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Generated 3" className="rounded-lg shadow w-full h-full" />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Pricing Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {
            plans.map((plan) => (
              <div className="border rounded-lg p-8 shadow-lg text-center bg-blue-100">
                <h2 className="text-2xl font-bold mb-4">{plan.type}</h2>
                <p className="text-gray-700 mb-6">{plan.credits} credits per month</p>
                <p className="text-3xl font-semibold mb-6">${plan.price}/month</p>
                <Button onClick={e => handleBuy(plan)} className="w-full bg-blue-600 text-white hover:bg-blue-700">Subscribe</Button>
              </div>
            ))
          }
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; {new Date().getFullYear()} AIMAGINIFY. All rights reserved.</p>
      </footer>
    </div>
  );
}
