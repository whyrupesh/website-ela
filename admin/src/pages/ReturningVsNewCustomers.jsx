import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReturningVsNewCustomers = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCustomerStats = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select a date range');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/returningCustomers/list`, {
        startDate,
        endDate,
      });

      if (response.data?.success && response.data.data) {
        setData(response.data.data);
        toast.success('Data fetched successfully!');
      } else {
        throw new Error(response.data?.message || 'Invalid response structure.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['New Customers', 'Returning Customers'],
    datasets: [
      {
        label: 'Customer Count',
        data: data ? [data.newCustomers || 0, data.returningCustomers || 0] : [0, 0],
        backgroundColor: ['#4CAF50', '#2196F3'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Returning vs. New Customers
        </h3>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={fetchCustomerStats}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
        {loading && (
          <p className="text-center text-blue-500 font-medium">
            Loading data, please wait...
          </p>
        )}
        {data && (
          <div className="mt-6">
            <Bar data={chartData} className="max-h-96" />
          </div>
        )}
        {!loading && !data && (
          <p className="text-center text-gray-500">
            No data to display. Submit a date range to view results.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReturningVsNewCustomers;
