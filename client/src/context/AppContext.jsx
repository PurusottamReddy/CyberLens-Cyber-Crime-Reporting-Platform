import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // to avoid flicker

  // Check login status once when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/user/is-auth");
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <UserContext.Provider value={{ user, setUser, axios, toast, navigate }}>
      {children}
    </UserContext.Provider>
  );
};
