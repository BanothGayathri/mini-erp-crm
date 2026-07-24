import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        background: "#1E3A8A",
        color: "white",
        minHeight: "100vh",
        padding: "25px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Mini ERP</h2>

      <hr />

      <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "25px" }}>

        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          🏠 Dashboard
        </Link>

        <Link to="/customers" style={{ color: "white", textDecoration: "none" }}>
          👥 Customers
        </Link>

        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          📦 Products
        </Link>

        <Link to="/inventory" style={{ color: "white", textDecoration: "none" }}>
          🏪 Inventory
        </Link>

        <Link to="/challans" style={{ color: "white", textDecoration: "none" }}>
          📄 Challans
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;