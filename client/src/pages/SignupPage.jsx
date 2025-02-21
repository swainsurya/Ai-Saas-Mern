import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {setLoggedIn , setUser} = useAuth();

  const handleSignup = async() => {
    setLoading(true);
    if(password !== confirmPassword) {
      toast.error("Password must be same")
      setLoading(false);
      return;
    }
    try {
      const req = await axios.post("/user/register",{email,password})
      console.log(req.data)
      navigate("/")
      setLoggedIn(true)
      setUser(req.data.newUser)
      toast.success("Registration Success")
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign Up</h2>
        
        <div className="mt-6">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center py-3"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? (<LoaderCircle className="animate-spin"/>) : "Sign Up"}
        </Button>
        <p className="text-center mt-4 text-lg">Already have an Account? <Link to="/login" className="text-blue-700 font-medium">Login</Link></p>
      </div>
    </div>
  );
}
