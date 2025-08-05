import React from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Users = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">Kelola Pengguna</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Cari Pengguna"
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
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left w-24">Role</th>
                  <th className="px-4 py-2 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Budi Santoso</td>
                  <td className="px-4 py-2">budi@email.com</td>
                  <td className="px-4 py-2">Admin</td>
                  <td className="px-4 py-2 text-center">
                    <button className="btn btn-sm btn-error text-white mr-1">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
