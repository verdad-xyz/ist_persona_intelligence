import React from "react";
import { Info } from "lucide-react";

const FraudLists = ({ fraud, categoryNames, onCheck }) => {
  return (
    <div className="card w-full max-w-sm mx-auto bg-white shadow-md border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
      <div className="card-body space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          <h2 className="card-title text-lg font-semibold text-gray-800">
            {fraud.title}
          </h2>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3 text-justify">
          {fraud.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {categoryNames.map((name, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="card-actions justify-end pt-3">
          <button
            onClick={() => onCheck(fraud.id)}
            className="btn btn-sm text-white"
            style={{
              background: "linear-gradient(to right, #0077A6, #00B59C)",
            }}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default FraudLists;
