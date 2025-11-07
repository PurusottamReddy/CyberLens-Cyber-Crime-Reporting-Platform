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
    return <div className="text-center mt-8 text-gray-700 dark:text-gray-300">Loading reports...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {user.role === 'user' ? (
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"> Your Crime Reports</h1>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">All Crime Reports</h1>
      )}
      {/* {user.role==='authority' || user.role==='admin' && <h1 className="text-3xl font-bold text-center mb-6">All Crime Reports</h1>} (another way of writing) */}
      {reports.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No crime reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">ID</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Title</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Category</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Location</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Date</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Status</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">{report._id}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">{report.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">{report.category}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">{report.location}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">{new Date(report.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                    {(user.role === 'authority' || user.role === 'admin') ? (
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report._id, e.target.value)}
                        className="p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{report.status}</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                    <Link to={`/report/${report._id}`} className="text-blue-500 dark:text-blue-400 hover:underline mr-2">
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteReport(report._id)}
                      className="text-red-500 dark:text-red-400 hover:underline">
                      Delete
                    </button>
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