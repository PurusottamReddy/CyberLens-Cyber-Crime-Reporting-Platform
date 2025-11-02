import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../context/AppContext';
import axios from 'axios';

const Navbar = () =>{
    const { user,toast, setUser,navigate } = useContext(UserContext);
 
    return(
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

       <NavLink to='/'>
        Home
       </NavLink>
     
       <NavLink to='/report-cc'>
        Report CyberCrime
       </NavLink>
       <NavLink to='/all-reports'>
        All Reports
       </NavLink>
       <NavLink to='/look-up'>
       Fraud Lookup </NavLink>

         {!user && (
        <>
            <NavLink to='/login'>
                Log In
            </NavLink>
        </>
       )}
       {user && (
        <button onClick={async()=>{
            try{
                await axios.get("/api/user/logout");
                setUser(null);
                toast.success("Logged out successfully");
                navigate("/login");
            }catch(error){
                toast.error(error.response?.data?.message || "Logout failed");
            }
        }} className="text-red-500 hover:text-red-700">
            Logout
        </button>
       )}
       </nav>
    )
}

export default Navbar
