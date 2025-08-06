import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const FraudNames = () => {
  const [search, setSearch] = useState("");
  const [names, setNames] = useState([]);

  const getNames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fraudnames");
      setNames(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch fraud names:", error);
    }
  };

  useEffect(() => {
    getNames();
  }, []);

  const filteredData = names.filter((fraud) => {
    const searchLower = search.toLowerCase();
    const fraudNameMatch = fraud.name?.toLowerCase().includes(searchLower);
    const categoryMatch = fraud.categories?.some((cat) =>
      cat.name.toLowerCase().includes(searchLower)
    );
    return fraudNameMatch || categoryMatch;
  });

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-2xl font-semibold my-3">Kelola Nama Fraud</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              placeholder="Cari Nama Fraud atau Kategori"
            />
            <NavLink
              to={"/fraudnames/add"}
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
                    <td className="px-4 py-2">{fraud.name}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        {fraud.categories?.map((cat) => (
                          <span
                            key={cat.id}
                            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                          >
                            {cat.name}
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
                    <td colSpan="4" className="text-center py-4 text-gray-500">
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
