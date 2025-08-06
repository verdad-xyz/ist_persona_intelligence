import React, { useState } from "react";
import Layout from "../components/Layout";

const AddFraudCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Kategori ditambahkan:", name);
    navigate("/fraudcategories");
  };

  return (
    <Layout>
      <div className="w-full p-4 space-y-3">
        <h2 className="text-2xl font-semibold my-4">Tambah Kategori Fraud</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300 space-y-4"
        >
          <div>
            <label className="block font-medium mb-1">Nama Kategori</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Contoh: Transaksi Tidak Wajar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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

export default AddFraudCategory;
