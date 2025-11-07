import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/AppContext"


const Report = () => {
  const { id } = useParams()
  const [report, setReport] = useState({})
  const { toast, axios } = useContext(UserContext)

  useEffect(() => {

    const getReportDetails = async () => {
      try {
        const res = await axios.get(`/api/crime/get-crime-report/${id}`)
        const data = await res.data
        if (data.success) {
          setReport(data.report)
        }
        else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error("error")
      }
    }
    getReportDetails()
  }, [id, axios, toast])

  return (
    <div className="p-5 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <h1 className="text-3xl font-bold text-center mb-5 text-gray-800 dark:text-white">Report Details for ID: {id}</h1>
      <div className="bg-white dark:bg-gray-800 p-5 border border-gray-200 dark:border-gray-700 rounded-md shadow-md max-w-4xl mx-auto">
        <p className="text-lg font-bold text-gray-800 dark:text-white">Reported By: <span className="text-gray-600 dark:text-gray-300 font-normal"> {report.anonymous ? "Anonymous" : report.user?.name} </span></p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">Title: <span className="text-gray-600 dark:text-gray-300 font-normal"> {report.title} </span></p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">Category: <span className="text-gray-600 dark:text-gray-300 font-normal"> {report.category} </span></p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">Description: <span className="text-gray-600 dark:text-gray-300 font-normal"> {report.description} </span></p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">Location: <span className="text-gray-600 dark:text-gray-300 font-normal"> {report.location} </span></p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">Status: <span className="text-gray-600 dark:text-gray-300 font-normal"> {report.status} </span></p>
        <p className="text-lg font-bold text-gray-800 dark:text-white mt-4">Evidence:</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {(Array.isArray(report.evidence)
            ? report.evidence
            : report.evidence
              ? [report.evidence]
              : []
          ).map((file, i) => {
            if (!file) return null;

            const getFileType = (url) => {
              const ext = url.split(".").pop().toLowerCase();
              if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
              if (["mp4", "mov", "avi", "mkv"].includes(ext)) return "video";
              if (ext === "pdf") return "pdf";
              return "other";
            };

            const type = getFileType(file);

            if (type === "image") {
              return (
                <img
                  key={i}
                  src={file}
                  alt="Evidence"
                  className="w-64 h-64 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                />
              );
            } else if (type === "video") {
              return (
                <video
                  key={i}
                  src={file}
                  controls
                  className="w-64 h-64 rounded-lg border border-gray-300 dark:border-gray-600"
                />
              );
            } else if (type === "pdf") {
              return (
                <a
                  key={i}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  View PDF Evidence
                </a>
              );
            } else {
              return (
                <a
                  key={i}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Download File
                </a>
              );
            }
          })}
        </div>

      </div>
    </div>
  )
}

export default Report