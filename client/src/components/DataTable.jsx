import config from "../config/appConfig";

export default function DataTable({ data }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          📋 {config.entity} List
        </h2>

        <span className="text-sm text-gray-500">
          {data.length} items
        </span>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          No data available 🚫
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr>
                {config.fields.map((field) => (
                  <th
                    key={field.name}
                    className="text-left px-4 py-3 font-semibold text-gray-600 uppercase tracking-wide"
                  >
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-t transition hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  {config.fields.map((field) => {
                    const value = item?.data?.[field.name];

                    return (
                      <td key={field.name} className="px-4 py-3">
                        
                        {/* Special UI for status */}
                        {field.name === "status" ? (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full
                            ${
                              value === "Done"
                                ? "bg-green-100 text-green-700"
                                : value === "Todo"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {value || "N/A"}
                          </span>
                        ) : (
                          <span className="text-gray-700">
                            {value || "—"}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}