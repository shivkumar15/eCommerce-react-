import React, { useContext, useState } from 'react'
import { ProductContext } from '../Utils/Context';
import {nanoid} from "nanoid";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
function Create() {

   const navigate = useNavigate()
  const[products,setProducts] = useContext(ProductContext)
  const [formData, setFormData] = useState({
    id:nanoid(),
    title: "",
    price: "",
    category: "",
    image: "",
    description: "" 
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...(products || []), formData]);
    console.log("Form Data Submitted:", formData);
    setFormData({
     id:nanoid(),
    title: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });
 navigate("/");
  // localStorage
  // .setItem("products",JSON.stringify([...products,formData]))
    toast.success("New product added ✅");  
    console.log(products);

  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="p-[5%] w-screen h-screen flex flex-col items-center"
      >
        <h1 className="w-1/2 text-3xl mb-5">Add New Product</h1>

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
          Add Product
        </button>
      </form>
 
    </>
  );
}

export default Create;
