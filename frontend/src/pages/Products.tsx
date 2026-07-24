import { useEffect, useState } from "react";
import api from "../api/axios";

function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    product_name: "",
    sku: "",
    category: "",
    unit_price: "",
    current_stock: "",
    minimum_stock: "",
    warehouse: "",
  });

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data.data || res.data);

    } catch (err) {
      console.log(err);
    }
  };


  // Load products when page opens
  useEffect(() => {
    loadProducts();
  }, []);


  const addProduct = async () => {
    try {

      await api.post("/products", {
        product_name: form.product_name,
        sku: form.sku,
        category: form.category,
        unit_price: Number(form.unit_price),
        current_stock: Number(form.current_stock),
        minimum_stock: Number(form.minimum_stock),
        warehouse: form.warehouse,
      });


      alert("Product Added Successfully");

      loadProducts();

      setForm({
        product_name: "",
        sku: "",
        category: "",
        unit_price: "",
        current_stock: "",
        minimum_stock: "",
        warehouse: "",
      });


    } catch (err: any) {

      console.log(err.response);

      alert(
        JSON.stringify(err.response?.data || err.message)
      );
    }
  };


  return (
    <div style={{padding:20}}>

      <h1>Products</h1>

      <h3>Add Product</h3>


      <input
        placeholder="Product Name"
        value={form.product_name}
        onChange={(e)=>
          setForm({...form,product_name:e.target.value})
        }
      />


      <input
        placeholder="SKU"
        value={form.sku}
        onChange={(e)=>
          setForm({...form,sku:e.target.value})
        }
      />


      <input
        placeholder="Category"
        value={form.category}
        onChange={(e)=>
          setForm({...form,category:e.target.value})
        }
      />


      <input
        placeholder="Unit Price"
        type="number"
        value={form.unit_price}
        onChange={(e)=>
          setForm({...form,unit_price:e.target.value})
        }
      />


      <input
        placeholder="Current Stock"
        type="number"
        value={form.current_stock}
        onChange={(e)=>
          setForm({...form,current_stock:e.target.value})
        }
      />


      <input
        placeholder="Minimum Stock"
        type="number"
        value={form.minimum_stock}
        onChange={(e)=>
          setForm({...form,minimum_stock:e.target.value})
        }
      />


      <input
        placeholder="Warehouse"
        value={form.warehouse}
        onChange={(e)=>
          setForm({...form,warehouse:e.target.value})
        }
      />


      <br/><br/>

      <button onClick={addProduct}>
        Add Product
      </button>


      <hr/>


      <table border={1} cellPadding={10}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>


        <tbody>

        {
          products.map((p:any)=>(
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.product_name}</td>
              <td>{p.sku}</td>
              <td>{p.category}</td>
              <td>{p.unit_price}</td>
              <td>{p.current_stock}</td>
            </tr>
          ))
        }

        </tbody>

      </table>

    </div>
  );
}

export default Products;
