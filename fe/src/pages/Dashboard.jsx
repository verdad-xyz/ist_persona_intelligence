import React from "react";
import Layout from "../components/Layout";
import fraudCategories from "../components/FraudCategories";
import fraudData from "../components/FraudData";
import DashboardCharts from "../components/DashboardCharts";

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
      <div className="p-4 space-y-3">
        <h2 className="text-2xl font-semibold my-3">Welcome back, User</h2>

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

        <DashboardCharts categoryCount={categoryCount} />
      </div>
    </Layout>
  );
};

export default Dashboard;
