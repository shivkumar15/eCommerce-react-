

// import React, { useEffect, useState, useContext } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { ProductContext } from '../Utils/Context'
// import Loading from './Loading'


// function Details() {
//   const [products,setProducts] = useContext(ProductContext)
//   const [product, setProduct] = useState(null)
//   const { id } = useParams()

//   const navigate= useNavigate();

// const  productDeleteHandler = (id)=>{
//     const filteredProducts = products.filter(p=>p.id !==id);
//     setProduct(filteredProducts);
//  navigate("/");
//     setProducts(updatedProducts);  // ✅ update context
//   localStorage.setItem("products", JSON.stringify(updatedProducts));
   
//     // localStorage.setItem("products",JSON.stringify(filteredProducts));
// }
//   useEffect(() => {
//     if (products) {
//       const found = products.find((p) => p.id == id) // == handles string vs number
//       setProduct(found)
//     }
//   }, [products, id]) // rerun when products or id changes

//   if (!product) return <Loading />

//   return (
//     <div className='w-[70%] h-full m-auto p-[10%] flex items-center justify-center'>
//       <img
//         className='h-[80%] w-[40%] object-contain'
//         src={product.image}
//         alt=''
//       />

//       <div className='content w-[50%]'>
//         <h1 className='text-4xl font-semibold'>{product.title}</h1>
//         <h1 className='text-zinc-400'>{product.category}</h1>
//         <h2 className='text-red-300 mb-3'>${product.price}</h2>
//         <p className='mb-[5%]'>{product.description}</p>

//         <button className='py-2 px-5 border rounded-md border-blue-200 text-blue-300'>
//           Edit
//         </button>
//         <button onClick={()=>(productDeleteHandler(product.id))} className='py-2 px-5 border rounded-md border-red-200 text-red-300 m-4'>
//           Delete
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Details



import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'
import Loading from './Loading'

import { toast } from "react-toastify";

function Details() {
  const [products, setProducts] = useContext(ProductContext)
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate();

  const productDeleteHandler = (id) => {
    // ✅ remove product from products list
    const updatedProducts = products.filter(p => p.id !== id);

    // ✅ update context (so Home updates too)
    setProducts(updatedProducts);

    // ✅ update localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // ✅ navigate back to home after delete
     toast.error("Product deleted 🗑️"); 
    navigate("/");
    
  }

  useEffect(() => {
    if (products) {
      const found = products.find((p) => p.id == id) // == handles string vs number
      setProduct(found)
    }
  }, [products, id])

  if (!product) return <Loading />

  return (
    <div className='w-[70%] h-full m-auto p-[10%] flex items-center justify-center'>
      <img
        className='h-[80%] w-[40%] object-contain'
        src={product.image}
        alt=''
      />

      <div className='content w-[50%]'>
        <h1 className='text-4xl font-semibold'>{product.title}</h1>
        <h1 className='text-zinc-400'>{product.category}</h1>
        <h2 className='text-red-300 mb-3'>${product.price}</h2>
        <p className='mb-[5%]'>{product.description}</p>

        <Link to={`/edit/${product.id}`} className='py-2 px-5 border rounded-md border-blue-200 text-blue-300'>
          Edit
        </Link>
        <button 
          onClick={() => productDeleteHandler(product.id)} 
          className='py-2 px-5 border rounded-md border-red-200 text-red-300 m-4'>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Details

