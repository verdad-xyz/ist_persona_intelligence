import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import FraudNames from "./pages/FraudNames";
import FraudCategories from "./pages/FraudCategories";
import AddFraudCategory from "./pages/AddFraudCategory";
import AddFraudName from "./pages/AddFraudName";
import EditFraudName from "./pages/EditFraudName";
import FraudDetail from "./pages/FraudDetail";
import EditFraudCategory from "./pages/EditFraudCategory";
import EditUser from "./pages/EditUser";
import AddUser from "./pages/AddUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

        <Route path="/fraudnames" element={<FraudNames />} />
        <Route path="/fraudnames/add" element={<AddFraudName />} />
        <Route path="/fraudnames/:id" element={<FraudDetail />} />
        <Route path="/fraudnames/edit/:id" element={<EditFraudName />} />
        <Route path="/fraudcategories" element={<FraudCategories />} />
        <Route path="/fraudcategories/add" element={<AddFraudCategory />} />
        <Route
          path="/fraudcategories/edit/:id"
          element={<EditFraudCategory />}
        />
      </Routes>
    </Router>
  );
};

export default App;
