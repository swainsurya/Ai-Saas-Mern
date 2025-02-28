import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [credits , setCredits] = useState(0);

  const getUser = async() => {
    setLoading(true)
    try {
      const req = await axios.get("/user")
      setUser(req.data.user);
      setLoggedIn(true);
      setCredits(req.data.user.credits);
    } catch (error) {
      setUser(null);
      setLoggedIn(false);
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, loggedIn , setLoggedIn , setUser , credits , setCredits }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
