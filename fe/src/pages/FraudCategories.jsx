import React from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import fraudCategories from "../components/FraudCategories";

const FraudCategories = () => {
  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">Kelola Kategori Fraud</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Cari Kategori Fraud"
            />
            <NavLink
              to={"/fraudcategories/add"}
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
                  <th className="px-4 py-2 text-left">Kategori</th>
                  <th className="px-4 py-2 text-left w-32">Updated By</th>
                  <th className="px-4 py-2 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fraudCategories.map((cat, index) => (
                  <tr key={cat.id} className="hover">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2">Admin</td>
                    <td className="px-4 py-2 text-center">
                      <button className="btn btn-sm btn-error text-white">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FraudCategories;
