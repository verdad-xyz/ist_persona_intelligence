import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { LuPencilRuler } from "react-icons/lu";

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
      <div className="w-full mx-auto p-6 space-y-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
          <LuPencilRuler className="text-yellow-500" />
          <span>Edit Nama Fraud</span>
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
              placeholder="Contoh: Penipuan Investasi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Kategori Terkait
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center space-x-2 text-sm"
                >
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
              className="btn btn-warning px-6 py-2 rounded-md text-white font-semibold shadow hover:shadow-lg transition-all"
              style={{
                background: "linear-gradient(to right, #F59E0B, #EAB308)",
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
