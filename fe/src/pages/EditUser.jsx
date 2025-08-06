import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LuPencilRuler } from "react-icons/lu";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`, {
          withCredentials: true,
        });
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        console.error("Gagal memuat user:", error.response?.data?.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/users/${id}`,
        { name, email, password, role: "user" },
        { withCredentials: true }
      );
      navigate("/users");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal update user");
    }
  };

  return (
    <Layout>
      <div className="w-full mx-auto p-6 space-y-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
          <LuPencilRuler className="text-yellow-400" />
          <span>Edit Pengguna</span>
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
              placeholder="Masukkan nama"
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
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Password (kosongkan jika tidak diubah)
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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

export default EditUser;
