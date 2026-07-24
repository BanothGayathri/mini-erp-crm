import { useEffect, useState } from "react";
import api from "../api/axios";

interface Customer {
  id: number;
  customer_name: string;
}

interface Product {
  id: number;
  product_name: string;
  unit_price: number;
}

interface Item {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
}

function Challans() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [challans, setChallans] = useState<any[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadCustomers();
    loadProducts();
    loadChallans();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data.data || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadChallans = async () => {
    try {
      const res = await api.get("/challans");
      setChallans(res.data.data || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = () => {
    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (!product) {
      alert("Please select a product");
      return;
    }

    setItems([
      ...items,
      {
        product_id: product.id,
        product_name: product.product_name,
        quantity: Number(quantity),
        unit_price: Number(product.unit_price),
      },
    ]);

    setProductId("");
    setQuantity(1);
  };

  const createChallan = async () => {
    try {
      await api.post("/challans", {
        customer_id: Number(customerId),
        products: items,
        created_by: 1,
      });

      alert("Challan Created Successfully");

      setCustomerId("");
      setProductId("");
      setQuantity(1);
      setItems([]);

      loadChallans();

    } catch (err: any) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
          "Failed to create challan"
      );
    }
  };

  const confirmChallan = async (id: number) => {
    try {
      await api.put(`/challans/confirm/${id}`);

      alert("Challan Confirmed");

      loadChallans();

    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Confirmation Failed"
      );
    }
  };

  const cancelChallan = async (id: number) => {
    try {
      await api.put(`/challans/cancel/${id}`);

      alert("Challan Cancelled");

      loadChallans();

    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Cancel Failed"
      );
    }
  };

  return (
    <div style={{ padding: 30 }}>

      <h1>📄 Challan Management</h1>

      <hr />

      <h2>Create Challan</h2>

      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      >
        <option value="">Select Customer</option>

        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.customer_name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      >
        <option value="">Select Product</option>

        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.product_name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={quantity}
        min={1}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
      />

      <button onClick={addItem}>
        Add Product
      </button>

      <br />
      <br />

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit_price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={createChallan}>
        Create Challan
      </button>

      <hr />

      <h2>All Challans</h2>

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Challan No</th>
            <th>Status</th>
            <th>Total Qty</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {challans.map((c: any) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.challan_number}</td>
              <td>{c.status}</td>
              <td>{c.total_quantity}</td>

              <td>
                <button
                  onClick={() => confirmChallan(c.id)}
                >
                  Confirm
                </button>

                <button
                  onClick={() => cancelChallan(c.id)}
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Challans;