import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import FraudNames from "./pages/FraudNames";
import FraudCategories from "./pages/FraudCategories";
import AddFraudCategory from "./pages/AddFraudCategory";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<Users />} />

        <Route path="/fraudnames" element={<FraudNames />} />
        <Route path="/fraudcategories" element={<FraudCategories />} />
        <Route path="/fraudcategories/add" element={<AddFraudCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
