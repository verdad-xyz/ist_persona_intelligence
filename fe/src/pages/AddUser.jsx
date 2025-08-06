import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuUserPlus } from "react-icons/lu";

const AddUser = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/users",
        { name, email, password, role: "user" },
        { withCredentials: true }
      );
      navigate("/users");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menambahkan user");
    }
  };

  return (
    <Layout>
      <div className="w-full mx-auto p-6 space-y-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
          <LuUserPlus className="text-green-500" />
          <span>Tambah User Baru</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md border border-gray-200 p-6 rounded-xl space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Nama
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-success px-6 py-2 rounded-md text-white font-semibold shadow hover:shadow-lg transition-all"
              style={{
                background: "linear-gradient(to right, #10B981, #22C55E)",
              }}
            >
              Simpan User
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddUser;
