import { useEffect, useState } from "react";
import api from "../api/axios";

interface Product {
  id: number;
  product_name: string;
  sku: string;
  current_stock: number;
  minimum_stock: number;
  warehouse: string;
}

function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadInventory = async () => {
    try {
      const res = await api.get("/inventory");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load inventory");
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <div style={{ padding: "30px", background: "#f4f7fc", minHeight: "100vh" }}>
      <h1 style={{ color: "#1E3A8A" }}>🏪 Inventory Management</h1>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        <thead style={{ background: "#1E3A8A", color: "#fff" }}>
          <tr>
            <th style={{ padding: "12px" }}>ID</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Minimum Stock</th>
            <th>Warehouse</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ textAlign: "center" }}>
              <td>{p.id}</td>
              <td>{p.product_name}</td>
              <td>{p.sku}</td>
              <td>{p.current_stock}</td>
              <td>{p.minimum_stock}</td>
              <td>{p.warehouse}</td>

              <td>
                {p.current_stock <= p.minimum_stock ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Low Stock
                  </span>
                ) : (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    In Stock
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;