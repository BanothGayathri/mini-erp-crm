import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    customers: 0,
    products: 0,
    inventory: 0,
    challans: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard/counts");
      setCounts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div style={{ marginTop: "20px" }}>
          <h1 className="heading">
            Welcome Back 👋
          </h1>

          <p className="subheading">
            Manage your ERP CRM System Efficiently
          </p>
        </div>

        <div className="cards">

          <div className="card" onClick={() => navigate("/customers")}>
            <h1>👥</h1>
            <h2>Customers</h2>
            <h3>{counts.customers}</h3>
            <p>Total Customers</p>
          </div>

          <div className="card" onClick={() => navigate("/products")}>
            <h1>📦</h1>
            <h2>Products</h2>
            <h3>{counts.products}</h3>
            <p>Total Products</p>
          </div>

          <div className="card" onClick={() => navigate("/inventory")}>
            <h1>🏪</h1>
            <h2>Inventory</h2>
            <h3>{counts.inventory}</h3>
            <p>Available Stock</p>
          </div>

          <div className="card" onClick={() => navigate("/challans")}>
            <h1>📄</h1>
            <h2>Challans</h2>
            <h3>{counts.challans}</h3>
            <p>Total Challans</p>
          </div>

        </div>

        <div className="stats">

          <div className="box">

          </div>

          <div className="box">

            <h2>📌 Quick Stats</h2>

            <hr />

            <p>👥 Customers : {counts.customers}</p>

            <p>📦 Products : {counts.products}</p>

            <p>🏪 Inventory : {counts.inventory}</p>

            <p>📄 Challans : {counts.challans}</p>

          </div>

        </div>

        <div className="activity">

          <h2>📋 Recent Activities</h2>

          <ul>
            <li>Dashboard Connected Successfully</li>
          </ul>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
{/* Recent Activities */}

<div className="activity">

  <h2>📋 Recent Activities</h2>

  <ul>
    <li>✅ Dashboard Connected Successfully</li>

    <li>👤 New Customer Added</li>

    <li>📦 New Product Added</li>

    <li>🏪 Inventory Stock Updated</li>

    <li>📄 New Challan Created</li>

  </ul>

</div>