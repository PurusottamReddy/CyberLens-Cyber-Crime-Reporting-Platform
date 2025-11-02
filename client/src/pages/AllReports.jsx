import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const AllReports = () => {
  const { user, axios, toast } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        let response;
        if (user.role === 'user') {
          response = await axios.get(`/api/crime/get-user-crime-reports/${user._id}`);
        } else {
          response = await axios.get('/api/crime/get-all-crime-reports');
        }
        setReports(response.data.reports || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch reports');
        toast.error(err.response?.data?.message || 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReports();
    } else {
      setError('You are not authorized to view reports.');
      setLoading(false);
    }
  }, [user, axios, toast]);

  const handleStatusChange = async (crimeId, newStatus) => {
    try {
      await axios.put(`/api/crime/update-status/${crimeId}`, { status: newStatus });
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === crimeId ? { ...report, status: newStatus } : report
        )
      );
      toast.success('Report status updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteReport = async (crimeId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await axios.delete(`/api/crime/delete-crime-report/${crimeId}`);
        setReports((prevReports) => prevReports.filter((report) => report._id !== crimeId));
        toast.success('Report deleted successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete report');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading reports...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {user.role === 'user' ? (
        <h1 className="text-3xl font-bold text-center mb-6 "> Your Crime Reports</h1>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-6">All Crime Reports</h1>
      )}
      {/* {user.role==='authority' || user.role==='admin' && <h1 className="text-3xl font-bold text-center mb-6">All Crime Reports</h1>} (another way of writing) */}
      {reports.length === 0 ? (
        <p className="text-center text-gray-600">No crime reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{report._id}</td>
                  <td className="py-2 px-4 border-b">{report.title}</td>
                  <td className="py-2 px-4 border-b">{report.category}</td>
                  <td className="py-2 px-4 border-b">{report.location}</td>
                  <td className="py-2 px-4 border-b">{new Date(report.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">
                    {(user.role === 'authority' || user.role === 'admin') ? (
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report._id, e.target.value)}
                        className="p-1 border rounded"
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                    ) : (
                      report.status
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link to={`/report/${report._id}`} className="text-blue-500 hover:underline mr-2">
                      View
                    </Link>
                    <td>
                      <button
                        onClick={() => handleDeleteReport(report._id)}
                        className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllReports;