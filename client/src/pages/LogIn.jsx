import { useState, useContext } from "react";
import { UserContext } from "../context/AppContext.jsx";


const LogIn = () => {

    const { setUser, axios, toast, navigate } = useContext(UserContext);
 
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
    <div className="p-6">
        
      <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>

      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          LOGIN
        </button>
      </form>
       <p onClick={()=>navigate("/signup")} className="pt-5 font-bold text-blue-700 hover:text-red-500 cursor-pointer flex justify-center w-full"> Don't have an account? Register</p>
    </div>
  );
};

export default LogIn;
