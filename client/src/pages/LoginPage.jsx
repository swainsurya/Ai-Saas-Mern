import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {setLoggedIn , setUser , user} = useAuth();

  const handleLogin = async() => {
    setLoading(true);
    try {
      const req = await axios.post("/user/login",{email,password})
      setUser(req.data.user);
      console.log(user)
      setLoggedIn(true);
      toast.success("Login success")
      navigate("/dashboard")
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
        
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

        <Button
          className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center py-3"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (<LoaderCircle className="animate-spin"/>) : "Login"}
        </Button>
        <p className="text-center mt-4 text-lg">Do not have an Account? <Link to="/signup" className="text-blue-700 font-medium">Register</Link></p>
      </div>
    </div>
  );
}
