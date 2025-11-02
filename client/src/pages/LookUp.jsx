import React, { useContext, useState } from "react"
import { UserContext } from "../context/AppContext"

const LookUp = () => {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { axios, toast } = useContext(UserContext)

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter a search term")
      return
    }
    setLoading(true)
    setHasSearched(true)
    try {
      const response = await axios.post("/api/crime/fraud-lookup", { related_info: search })
      const data = response.data
      if (data.success) {
        if (data.crimes.length > 0) {
          setResult(data.crimes)
          toast.success("Matching record found")
        } else {
          setResult([])
          toast.error("No matching record found")
        }
      } else {
        toast.error(data.message || "Failed to fetch results")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch results")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => setSearch(e.target.value)

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6 mt-5">Fraud Lookup</h1>
      <div className="flex flex-col items-center justify-center mx-40">
        <input
          type="text"
          value={search}
          placeholder="Enter phone number, email or website url to search"
          onChange={handleChange}
          className="border border-gray-200 rounded-md w-96 px-5 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-blue-400 py-2 px-10 text-white rounded-md mt-3 transition-all ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-500"
          }`}
        >
          {loading && (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          )}
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {result.length > 0 ? (
        <div>
          {result.map((item, i) => (
            <div key={i} className="border border-gray-300 rounded-lg p-5 mt-5 bg-gray-200 mx-45">
             
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-gray-700">User: {item.user?.name || "Anonymous"}</p>
              <p className="text-gray-700">Category: {item.category}</p>
              <p className="text-gray-700">Location: {item.location}</p>
              <p className="text-gray-700">Date: {new Date(item.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-700">Description: {item.description}</p>
              <p className="text-gray-700">Status: {item.status}</p>
             
            </div>
          ))}
        </div>
      ) : (
        hasSearched &&
        !loading && (
          <p className="text-red-500">
            No records to display. Try searching for something.
          </p>
        )
      )}
    </div>
  )
}

export default LookUp
