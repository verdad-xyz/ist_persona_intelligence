import React from "react";
import Layout from "../components/Layout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from "recharts";
import fraudCategories from "../components/FraudCategories";
import fraudData from "../components/FraudData";

const COLORS = [
  "#0077A6",
  "#00B59C",
  "#FFA500",
  "#FF6F61",
  "#6A5ACD",
  "#FF69B4",
  "#8FBC8F",
  "#FF6347",
  "#20B2AA",
  "#FFD700",
  "#DC143C",
  "#6495ED",
  "#ADFF2F",
  "#FF4500",
  "#00CED1",
];

const Dashboard = () => {
  const labelMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const categoryCount = fraudCategories
    .map((cat, index) => {
      const count = fraudData.filter((fraud) =>
        fraud.categoryIds.includes(cat.id)
      ).length;
      return {
        name: cat.name,
        value: count,
        label: labelMap[index] || `Z${index}`,
      };
    })
    .filter((c) => c.value > 0);

  return (
    <Layout>
      <div className="min-h-screen p-4 space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard Monitoring Fraud</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl shadow border">
            <p className="text-gray-600">Total Fraud</p>
            <h3 className="text-2xl font-bold">{fraudData.length}</h3>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border">
            <p className="text-gray-600">Kategori Unik</p>
            <h3 className="text-2xl font-bold">{categoryCount.length}</h3>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border">
            <p className="text-gray-600">Last Input</p>
            <h3 className="text-sm">
              {fraudData[fraudData.length - 1]?.description || "Belum ada data"}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow border">
            <h4 className="font-semibold mb-2">Distribusi Kategori Fraud</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryCount}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ index }) => categoryCount[index]?.label}
                >
                  {categoryCount.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h5 className="font-medium text-sm mb-1">Keterangan:</h5>
              <ul className="text-sm text-gray-700 grid grid-cols-2 sm:grid-cols-3 gap-y-1">
                {categoryCount.map((item, index) => (
                  <li key={index}>
                    <span className="font-semibold">{item.label}</span> ={" "}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <h4 className="font-semibold mb-2">Frekuensi Kategori Fraud</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryCount}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#00B59C" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h5 className="font-medium text-sm mb-1">Keterangan:</h5>
              <ul className="text-sm text-gray-700 grid grid-cols-2 sm:grid-cols-3 gap-y-1">
                {categoryCount.map((item, index) => (
                  <li key={index}>
                    <span className="font-semibold">{item.label}</span> ={" "}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
