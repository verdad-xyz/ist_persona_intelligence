import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const EditFraudName = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchFraudName();
    fetchCategories();
  }, []);

  const fetchFraudName = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/fraudnames/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      setName(data.name);
      setSelectedCategoryIds(data.categories.map((cat) => cat.id));
    } catch (err) {
      console.error("Gagal ambil fraud name:", err.response?.data?.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/fraudcategories", {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Gagal ambil kategori:", err.response?.data?.message);
    }
  };

  const handleCategoryChange = (id) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/fraudnames/${id}`,
        { name, categoryIds: selectedCategoryIds },
        { withCredentials: true }
      );
      navigate("/fraudnames");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal update data");
    }
  };

  return (
    <Layout>
      <div className="w-full p-4 space-y-3">
        <h2 className="text-2xl font-semibold my-3">Edit Fraud Name</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow border p-6 rounded-lg space-y-4"
        >
          <div className="mb-4">
            <label className="block font-medium mb-1">Nama Fraud</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Contoh: Penipuan Investasi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Kategori Fraud</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategoryIds.includes(cat.id)}
                    onChange={() => handleCategoryChange(cat.id)}
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
              className="btn text-white"
              style={{
                background: "linear-gradient(to right, #0077A6, #00B59C)",
              }}
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditFraudName;
