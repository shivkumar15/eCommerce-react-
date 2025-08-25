import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../Utils/Context';
import { toast } from "react-toastify";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useContext(ProductContext);
  const [formData, setFormData] = useState(null);

  // Load the product details into formData
  useEffect(() => {
    if (products) {
      const productToEdit = products.find(p => p.id == id); // == handles number/string mismatch
      if (productToEdit) {
        setFormData(productToEdit);
      }
    }
  }, [products, id]);

  if (!formData) return <h2 className="text-center mt-10 text-xl">Loading...</h2>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the products list
    const updatedProducts = products.map(p =>
      p.id == id ? formData : p
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    navigate("/"); // go back to home

     toast.success("Product updated ✨"); 
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-[5%] w-screen h-screen flex flex-col items-center"
    >
      <h1 className="w-1/2 text-3xl mb-5">Edit Product</h1>

      <input 
        type="text" 
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title" 
        required
        className="text-xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3"
      />

      <input 
        type="number" 
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price" 
        required
        className="text-xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3"
      />

      <input 
        type="text" 
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category" 
        required
        className="text-xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3"
      />

      <input 
        type="text" 
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL" 
        required
        className="text-xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3"
      />

      <textarea 
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description" 
        required
        className="text-xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3 h-28"
      />

      <button 
        type="submit" 
        className="px-5 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
      >
        Update Product
      </button>
    </form>
  )
}

export default Edit
