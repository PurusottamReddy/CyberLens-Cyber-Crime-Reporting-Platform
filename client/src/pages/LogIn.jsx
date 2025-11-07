import { useState, useContext } from "react";
import { UserContext } from "../context/AppContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

const LogIn = () => {

    const { setUser, axios, toast, navigate } = useContext(UserContext);
    const {darkMode} = useContext(ThemeContext)
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await axios.post("/api/user/login", {
        email,
        password,
      });

      const data = res.data;

      if (data.success) {
      
        setUser(data.user);
       
        localStorage.setItem("token", data.token);
        toast.success(data.message || "Login successful!...");
        navigate("/");
    } else {
      toast.error(data.message || "Login failed!");
    }

  } catch (err) {

    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Network error: " + err.message);
    }
  }
};

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Login</h1>

      <form className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          LOGIN
        </button>
      </form>
       <p onClick={()=>navigate("/signup")} className="pt-5 font-bold text-blue-700 dark:text-blue-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer flex justify-center w-full transition-colors"> Don't have an account? Register</p>
    </div>
  );
};

export default LogIn;
