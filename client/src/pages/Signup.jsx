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
        <div className=" p-5">
         
            <h1 className="text-3xl font-bold text-center mb-5"> Signup </h1>
            <form onSubmit={submitHandler} className="max-w-md mx-auto ">
                <div className="py-5 px-2 bg-gray-100 rounded-md px-10">
                <label htmlFor="name" className="block  mt-2 mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label htmlFor="email" className="block mt-2 mb-1">Email</label>
                <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e)=>setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label htmlFor="password" className="block mt-2 mb-1">Password</label>
                <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label htmlFor="role" className="block mt-2 mb-1">Role</label>
                <select
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="user">User</option>
                    <option value="authority">Authority</option>
                    {/* <option value="admin">Admin</option> */}
                </select>

                <button className="w-full p-2 bg-blue-500 text-white rounded-md mt-5" type="submit">SIGNUP</button>
                </div>
            </form>
          
        </div>
    )
}
export default SignUp