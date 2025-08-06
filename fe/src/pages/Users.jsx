import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { LuSettings } from "react-icons/lu";

const Users = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // untuk popup
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setTeams(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`http://localhost:5000/users/${selectedUser.id}`);
      setSelectedUser(null);
      await getUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading || loading) {
    return (
      <Layout>
        <div className="p-4 text-lg font-medium">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
          <LuSettings className="text-gray-700" />
          <span>Kelola Tim Anti Fraud</span>
        </div>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Cari Pengguna"
            />
            <NavLink to={"/users/add"} className="btn text-white bg-green-500">
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
                {teams.map((team, index) => (
                  <tr className="hover" key={team.id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{team.name}</td>
                    <td className="px-4 py-2">{team.email}</td>
                    <td className="px-4 py-2">{team.role}</td>
                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <NavLink
                        to={`/users/edit/${team.uuid}`}
                        className="btn btn-sm btn-warning text-white"
                      >
                        E
                      </NavLink>
                      {team.role !== "admin" && (
                        <button
                          onClick={() => setSelectedUser(team)}
                          className="btn btn-sm btn-error text-white"
                        >
                          D
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <dialog id="delete_modal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-red-600">
                Konfirmasi Hapus
              </h3>
              <p className="py-4">
                <p>Apakah Anda yakin ingin menghapus pengguna </p>
                <span className="font-semibold text-black">
                  "{selectedUser.name}"
                </span>
                ?
              </p>
              <div className="modal-action">
                <button onClick={() => setSelectedUser(null)} className="btn">
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-error text-white"
                >
                  Hapus
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </Layout>
  );
};

export default Users;
