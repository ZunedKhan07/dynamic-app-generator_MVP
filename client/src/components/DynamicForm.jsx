import { useState } from "react";
import config from "../config/appConfig";
import { createData } from "../services/api";

export default function DynamicForm({ refresh }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await createData(config.entity, formData);

      // ✅ Notification (yahin lagta hai 🔥)
      alert("Data Saved Successfully!");

      setFormData({});
      refresh();
    } catch (err) {
      console.error("Error creating data:", err);
      setError("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      
      {/* Header */}
      <h2 className="text-xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
        ➕ Add New {config.entity}
      </h2>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {config.fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            
            <label className="text-sm font-medium text-gray-600 mb-1 capitalize">
              {field.name}
            </label>

            {/* TEXT FIELD */}
            {field.type === "text" && (
              <input
                type="text"
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                outline-none transition duration-150"
                placeholder={`Enter ${field.name}`}
              />
            )}

            {/* SELECT FIELD */}
            {field.type === "select" && (
              <select
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 
                bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                outline-none transition duration-150"
              >
                <option value="">Select {field.name}</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {/* ❗ Unknown field handling (IMPORTANT) */}
            {!["text", "select"].includes(field.type) && (
              <p className="text-xs text-gray-400">
                Unsupported field: {field.type}
              </p>
            )}

          </div>
        ))}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition duration-200
          ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}