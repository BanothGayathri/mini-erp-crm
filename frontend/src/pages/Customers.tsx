import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/customers.css";

interface Customer {
  id: number;
  customer_name: string;
  mobile: string;
  email: string;
  business_name: string;
}

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [form, setForm] = useState({
    customer_name: "",
    mobile: "",
    email: "",
    business_name: "",
  });

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const addCustomer = async () => {
  try {
    console.log("Sending:", form);

    const res = await api.post("/customers", form);

    console.log("Success:", res.data);

    alert("Customer Added Successfully");

    setForm({
      customer_name: "",
      mobile: "",
      email: "",
      business_name: "",
    });

    loadCustomers();

  } catch (err: any) {
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log("Full Error:", err);

    alert(
      err.response?.data?.message ||
      JSON.stringify(err.response?.data) ||
      "Unable to add customer"
    );
  }
};

  return (
    <div className="customer-page">

      <h1>Customers</h1>

      <div className="customer-form">

        <input
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={(e) =>
            setForm({ ...form, customer_name: e.target.value })
          }
        />

        <input
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Business Name"
          value={form.business_name}
          onChange={(e) =>
            setForm({ ...form, business_name: e.target.value })
          }
        />

        <button onClick={addCustomer}>
          Add Customer
        </button>

      </div>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Business</th>
          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr key={customer.id}>

              <td>{customer.id}</td>

              <td>{customer.customer_name}</td>

              <td>{customer.mobile}</td>

              <td>{customer.email}</td>

              <td>{customer.business_name}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Customers;