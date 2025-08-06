import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { LuArrowLeft, LuInfo } from "react-icons/lu";

const FraudDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fraud, setFraud] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFraudDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fraudnames/${id}`
        );
        setFraud(response.data);
      } catch (error) {
        console.error("Gagal memuat detail fraud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFraudDetail();
  }, [id]);

  if (loading)
    return (
      <Layout>
        <div className="p-6 text-center">
          <span className="loading loading-spinner text-primary"></span>
          <p className="mt-2 text-gray-600">Memuat data...</p>
        </div>
      </Layout>
    );

  if (!fraud)
    return (
      <Layout>
        <div className="p-6 text-center text-red-600 font-semibold">
          Data tidak ditemukan.
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="w-full mx-auto p-6 space-y-6">
        <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
          <LuInfo className="text-blue-300" />
          <span>Detail Nama Fraud</span>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 space-y-6">
          <div>
            <label className="text-sm text-gray-500 uppercase font-semibold">
              Nama Fraud
            </label>
            <p className="text-xl font-medium text-gray-800 mt-1">
              {fraud.name}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <label className="text-sm text-gray-500 uppercase font-semibold">
              Kategori Terkait
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {fraud.categories && fraud.categories.length > 0 ? (
                fraud.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cat.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">Tidak ada kategori</span>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate("/fraudnames")}
              className="btn btn-outline btn-primary flex items-center gap-2"
            >
              <LuArrowLeft />
              Kembali
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FraudDetail;
