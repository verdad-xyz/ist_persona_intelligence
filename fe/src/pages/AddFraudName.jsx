import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFraudName = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]); // checkbox options
  const [selectedCategories, setSelectedCategories] = useState([]); // selected IDs

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
      console.log(name);
      console.log(selectedCategories);

      console.error("Gagal menambahkan fraud name:", error);
    }
  };

  return (
    <Layout>
      <div className="w-full p-4 space-y-3">
        <h2 className="text-2xl font-semibold my-3">Tambah Nama Fraud</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow border p-6 rounded-lg"
        >
          <div className="mb-4">
            <label className="block font-medium mb-1">Nama Fraud</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Masukkan nama fraud"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Kategori</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => handleCheckboxChange(cat.id)}
                    className="checkbox checkbox-sm"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn text-white"
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
