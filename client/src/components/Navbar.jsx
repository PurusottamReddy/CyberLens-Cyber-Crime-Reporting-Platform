import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../context/AppContext';
import {ThemeContext} from '../context/ThemeContext'
import axios from 'axios';

const Navbar = () =>{
    const { user,toast, setUser,navigate } = useContext(UserContext);
    const {darkMode,toggleDarkMode} = useContext(ThemeContext)
 
    return(
        <nav className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 relative transition-all text-black bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700`}>
       <NavLink 
         to='/' 
         className={({ isActive }) => 
           `px-3 py-2 rounded-md transition-colors ${
             isActive 
               ? 'text-blue-600 dark:text-blue-400 font-semibold' 
               : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
           }`
         }
       >
        Home
       </NavLink>
     
       <NavLink 
         to='/report-cc'
         className={({ isActive }) => 
           `px-3 py-2 rounded-md transition-colors ${
             isActive 
               ? 'text-blue-600 dark:text-blue-400 font-semibold' 
               : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
           }`
         }
       >
        Report Crime
       </NavLink>
       <NavLink 
         to='/all-reports'
         className={({ isActive }) => 
           `px-3 py-2 rounded-md transition-colors ${
             isActive 
               ? 'text-blue-600 dark:text-blue-400 font-semibold' 
               : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
           }`
         }
       >
        All Reports
       </NavLink>
       <NavLink 
         to='/look-up'
         className={({ isActive }) => 
           `px-3 py-2 rounded-md transition-colors ${
             isActive 
               ? 'text-blue-600 dark:text-blue-400 font-semibold' 
               : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
           }`
         }
       >
       Fraud Lookup 
       </NavLink>

         {!user && (
        <>
            <NavLink 
              to='/login'
              className={({ isActive }) => 
                `px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`
              }
            >
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
        }} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-3 py-2 rounded-md transition-colors">
            Logout
        </button>
       )}
       <button 
         onClick={toggleDarkMode}
         className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
         aria-label="Toggle dark mode"
       >
         {darkMode ? '☀️' : '🌙'}
       </button>
       </nav>
    )
}

export default Navbar
