import {useState} from "react"
import {useContext} from "react"
import {UserContext} from "../context/AppContext"



const SignUp = () => {

    const {setUser,axios,toast,navigate}=useContext(UserContext)

    const [name,setName]=useState("")
    const[email,setEmail]=useState("")  
    const[password,setPassword]=useState("")  
    const[role,setRole]=useState("user")  


    const submitHandler = async (e)=>{
        try{
            e.preventDefault()
            const res = await axios.post('/api/user/register',
                {name,email,password,role}
            )
            const data= await res.data;
            if(data.success){
                setUser(data.user)
                toast.success(data.message || "User registered successfully")
                navigate('/')
            }
            else{
                toast.error(data.message)
            }
        }catch(errr){
            toast.error(errr.message || "Something went wrong")
        }
    }


    return (
        <div className="p-5 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
         
            <h1 className="text-3xl font-bold text-center mb-5 text-gray-800 dark:text-white"> Signup </h1>
            <form onSubmit={submitHandler} className="max-w-md mx-auto ">
                <div className="py-5 px-2 bg-gray-100 dark:bg-gray-800 rounded-md px-10 border border-gray-200 dark:border-gray-700">
                <label htmlFor="name" className="block mt-2 mb-1 text-gray-700 dark:text-gray-300">Name</label>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <label htmlFor="email" className="block mt-2 mb-1 text-gray-700 dark:text-gray-300">Email</label>
                <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e)=>setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <label htmlFor="password" className="block mt-2 mb-1 text-gray-700 dark:text-gray-300">Password</label>
                <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <label htmlFor="role" className="block mt-2 mb-1 text-gray-700 dark:text-gray-300">Role</label>
                <select
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                    <option value="user">User</option>
                    <option value="authority">Authority</option>
                    {/* <option value="admin">Admin</option> */}
                </select>

                <button className="w-full p-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md mt-5 transition-colors" type="submit">SIGNUP</button>
                </div>
            </form>
          
        </div>
    )
}
export default SignUp