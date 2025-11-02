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
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Report Details for ID: {id}</h1>
      <div className="bg-white p-5 border border-gray-200 rounded-md">
        <p className="text-lg font-bold">Reported By: <span className="text-gray-600"> {report.anonymous ? "Anonymous" : report.user?.name} </span></p>
        <p className="text-lg font-bold">Title: <span className="text-gray-600"> {report.title} </span></p>
        <p className="text-lg font-bold">Category: <span className="text-gray-600"> {report.category} </span></p>
        <p className="text-lg font-bold">Description: <span className="text-gray-600"> {report.description} </span></p>
        <p className="text-lg font-bold">Location: <span className="text-gray-600"> {report.location} </span></p>
        <p className="text-lg font-bold">Status: <span className="text-gray-600"> {report.status} </span></p>
        <p className="text-lg font-bold">Evidence:</p>
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
                  className="w-64 h-64 object-cover rounded-lg border"
                />
              );
            } else if (type === "video") {
              return (
                <video
                  key={i}
                  src={file}
                  controls
                  className="w-64 h-64 rounded-lg border"
                />
              );
            } else if (type === "pdf") {
              return (
                <a
                  key={i}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
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
                  className="text-blue-500 underline"
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