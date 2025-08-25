import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'


function Nav() {
  const [products]=useContext(ProductContext);

  // ✅ make sure products is an array before using reduce
  let distinct_category = Array.isArray(products)
    ? products.reduce((acc, cv) => [...acc, cv.category], [])
    : [];

  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return (
      `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
    )
  };



  
  return (
    <>
     <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center py-5">
      <Link to="/create"  className="py-5 px-5 border rounded-md shadow border-blue-200 text-blue-300 ">Add New Product</Link>

      <hr className="w-[80%] my-3  "/>
      <h1 className="text-2xl mb-3 w-[80%] ">Category Filter</h1>

      

      <div className=" w-[80%] ">
        
        {distinct_category.map((c,i)=>(<Link key={i} to={`/?category=${c}`} className=" mb-3 flex items-center">
         <span style={{backgroundColor:color()}} className=" w-[15px] h-[15px] bg-blue-100 rounded-full mr-2"></span>{c}
         </Link>))}

      </div> 
    </nav>                                           
    </> 
  )
}

export default Nav