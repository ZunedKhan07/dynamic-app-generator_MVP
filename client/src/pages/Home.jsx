import { useEffect, useState } from "react";
import config from "../config/appConfig";
import { getData } from "../services/api";
import DynamicForm from "../components/DynamicForm";
import DataTable from "../components/DataTable";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getData(config.entity);

      // safety check (edge case handling 🔥)
      if (!res?.data) {
        throw new Error("Invalid response");
      }

      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg mb-2">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Dynamic App Generator
        </h1>
        <p className="text-gray-500 mt-1">
          Create and manage your dynamic data easily
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="md:col-span-1">
          <DynamicForm refresh={fetchData} />
        </div>

        {/* Table */}
        <div className="md:col-span-2">
          <DataTable data={data} />
        </div>

      </div>
    </div>
  );
}