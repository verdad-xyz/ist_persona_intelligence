import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuSettings } from "react-icons/lu";

const FraudNames = () => {
  const [search, setSearch] = useState("");
  const [names, setNames] = useState([]);
  const [selectedFraud, setSelectedFraud] = useState(null);

  const getNames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fraudnames");
      setNames(response.data);
    } catch (error) {
      console.error("Failed to fetch fraud names:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedFraud) return;

    try {
      await axios.delete(
        `http://localhost:5000/fraudnames/${selectedFraud.id}`
      );
      setSelectedFraud(null);
      await getNames();
    } catch (error) {
      console.error("Failed to delete fraud name:", error);
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
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
          <LuSettings className="text-gray-700" />
          <span>Kelola Nama Fraud</span>
        </div>

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
              className="btn text-white bg-green-500"
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
                    <td className="px-4 py-2 flex gap-2">
                      <NavLink
                        to={`/fraudnames/${fraud.id}`}
                        className="btn btn-sm btn-info text-white"
                      >
                        V
                      </NavLink>
                      <NavLink
                        to={`/fraudnames/edit/${fraud.id}`}
                        className="btn btn-sm btn-warning text-white"
                      >
                        E
                      </NavLink>
                      <button
                        onClick={() => setSelectedFraud(fraud)}
                        className="btn btn-sm btn-error text-white"
                      >
                        D
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

        {selectedFraud && (
          <dialog id="delete_modal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-red-600">
                Konfirmasi Hapus
              </h3>
              <p className="py-4">
                <p>Apakah Anda yakin ingin menghapus nama fraud</p>
                <span className="font-semibold text-black">
                  "{selectedFraud.name}"
                </span>
                ?
              </p>
              <div className="modal-action">
                <button onClick={() => setSelectedFraud(null)} className="btn">
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

export default FraudNames;
