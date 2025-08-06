import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { LuSettings } from "react-icons/lu";

const FraudCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fraudcategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      await axios.delete(
        `http://localhost:5000/fraudcategories/${selectedCategory.id}`
      );
      setSelectedCategory(null);
      await getCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
          <LuSettings className="text-gray-700" />
          <span>Kelola Kategori Fraud</span>
        </div>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Cari Kategori Fraud"
            />
            <NavLink
              to={"/fraudcategories/add"}
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
                  <th className="px-4 py-2 text-left">Kategori</th>
                  <th className="px-4 py-2 text-left w-32">Updated By</th>
                  <th className="px-4 py-2 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat.id} className="hover">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2">Admin</td>
                    <td className="px-4 py-2 flex gap-2">
                      <NavLink
                        to={`/fraudcategories/edit/${cat.id}`}
                        className="btn btn-sm btn-warning text-white"
                      >
                        E
                      </NavLink>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className="btn btn-sm btn-error text-white"
                      >
                        D
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCategory && (
          <dialog id="delete_modal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-red-600">
                Konfirmasi Hapus
              </h3>
              <p className="py-4">
                <p>Apakah Anda yakin ingin menghapus kategori</p>
                <span className="font-semibold text-black">
                  "{selectedCategory.name}"
                </span>
                ?
              </p>
              <div className="modal-action">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="btn"
                >
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

export default FraudCategories;
