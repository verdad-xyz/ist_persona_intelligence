import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

const AddFraudName = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/fraudcategories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/fraudnames", {
        name,
        categoryIds: selectedCategories,
      });
      console.log(response.data);
      navigate("/fraudnames");
    } catch (error) {
      console.error("Gagal menambahkan fraud name:", error);
    }
  };

  return (
    <Layout>
      <div className="w-full mx-auto p-6 space-y-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
          <LuPlus className="text-green-600" />
          <span>Tambah Nama Fraud</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md border border-gray-200 p-6 rounded-xl space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Nama Fraud
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Contoh: Penipuan Investasi Bodong"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Pilih Kategori Terkait
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => handleCheckboxChange(cat.id)}
                    className="checkbox checkbox-sm"
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn px-6 py-2 rounded-md text-white font-semibold shadow hover:shadow-lg transition-all"
              style={{
                background: "linear-gradient(to right, #0077A6, #00B59C)",
              }}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddFraudName;
