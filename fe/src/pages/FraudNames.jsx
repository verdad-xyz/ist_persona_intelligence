import React, { useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import fraudCategories from "../components/FraudCategories";
import fraudData from "../components/FraudData";

const getCategoryNames = (ids) => {
  return ids
    .map((id) => {
      const cat = fraudCategories.find((c) => c.id === id);
      return cat ? cat.name : null;
    })
    .filter(Boolean);
};

const FraudNames = () => {
  const [search, setSearch] = useState("");

  const filteredData = fraudData.filter((fraud) =>
    fraud.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">Kelola Nama Fraud</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              placeholder="Cari Nama Fraud"
            />
            <NavLink
              to={"/"}
              className="btn text-white"
              style={{
                background: "linear-gradient(to right, #0077A6, #00B59C)",
              }}
            >
              + Add
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left w-12">No</th>
                  <th className="px-4 py-2 text-left">Nama Fraud</th>
                  <th className="px-4 py-2 text-left">Kategori</th>
                  <th className="px-4 py-2 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((fraud, index) => (
                  <tr key={fraud.id} className="hover">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{fraud.description}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        {getCategoryNames(fraud.categoryIds).map((name, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button className="btn btn-sm btn-error text-white">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Tidak ada data yang cocok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FraudNames;
