


import React, { useContext, useState } from 'react';
import { UserContext } from '../context/AppContext';


const ReportCC = () => {
  const { user, axios, toast, navigate } = useContext(UserContext);


  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    related_info: '',
    anonymous: false,
  });
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setEvidence((prevEvidence) => [...prevEvidence, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('user', user._id);
    data.append('anonymous', formData.anonymous);
    data.append('category', formData.category);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('related_info', formData.related_info);
    evidence.forEach((file) => {
      data.append('evidence', file);
    });

    try {
      const response = await axios.post('/api/crime/create-crime-report', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        toast.success('Crime report submitted successfully!');
        navigate('/all-reports');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Report Cyber Crime</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
            Report Anonymously
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          >
            <option value="" disabled hidden>Select a Category &#9660; </option>
            <option value="Financial Fraud">Financial Fraud</option>
            <option value="Identity Theft">Identity Theft</option>
            <option value="Deepfake">Deepfake</option>
            <option value="Hacking">Hacking</option>
            <option value="Online Harassment">Online Harassment</option>
            <option value="Cyberstalking">Cyberstalking</option>
            <option value="CSAM">CSAM</option>
            <option value="Phishing">Phishing</option>
            <option value="Intellectual Property Theft">Intellectual Property Theft</option>
            <option value="Cyberterrorism">Cyberterrorism</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Location (e.g., city, state, country)
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="related_info" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Related Information (e.g., email, phone, website, IP address)
          </label>
          <input
            type="text"
            id="related_info"
            name="related_info"
            value={formData.related_info}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="evidence" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Evidence (screenshots, documents, etc.)
            {evidence.length > 0 && (
              <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">({evidence.length} files selected)</span>
            )}
          </label>
          <input
            type="file"
            id="evidence"
            name="evidence"
            onChange={handleFileChange}
            multiple
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200"
          />
        </div>
     
     <div className="mb-4 flex items-center">
      <input
      type="checkbox"
      id="terms"
      name="terms"
      className="mr-2 leading-tight"
      required
      />
      <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 ml-1">I agree that the information provided is true and accurate</label>
     </div>
      
        <button
          type="submit"
          className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportCC;