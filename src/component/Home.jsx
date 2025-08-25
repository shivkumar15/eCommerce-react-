// import React, { useContext, useEffect, useState } from 'react'
// import Nav from './Nav'
// import { Link, useLocation} from 'react-router-dom'
// import { ProductContext } from '../Utils/Context'
// import Loading from './Loading'
// import axios from '../Utils/axios'

// function Home() {

//   const [products]=  useContext(ProductContext);
//   const {search}=useLocation();
 

//   const category=decodeURIComponent(search.split("=")[1])
  

//   const [filteredProducts,setfilteredProducts]=useState(null)
//   const getproductscategory = async ()=>{
//     try{
//       const {data}=await axios.get(`/products/category/${category}`);
//       console.log(data)
//       setfilteredProducts(data);
//       // filteredProducts=data;
//     }catch(error){
//       console.log(error);
//     }
//   }


//     useEffect(()=>{
//       if(!filteredProducts || category =='undefined') setfilteredProducts(products);
//       // if (category!= "undefined")getproductscategory();
//       if (category && category !== "undefined") {

//         setfilteredProducts (products.filter(p => p.category == category));


//   // getproductscategory();
// }
//     },[category,products]); 
  
//     console.log(filteredProducts)


//   return (products? 
//    <>

//     <Nav/>
//      <div className=" w-[85%]   p-5 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto  ">

//         {filteredProducts && filteredProducts.map((p,i)=>(<Link key={p.id} to={`/details/${p.id}`} className="card mr-3 mb-3 p-3 shadow rounded-md w-[18%] h-[30vh] flex justify-center items-center  flex-col" > 
//         <div className="w-full h-[80%] bg-contain bg-no-repeat bg-center mb-3 hover:scale-110 transition-transform duration-300" style={{backgroundImage:`url(${p.image})`}}></div> 
//         <h1 className="hover:text-blue-400">{p.title}</h1>
//       </Link>))}
         

      


//      </div>
//    </>:<Loading/>
//   )
// }  

// export default Home



// import React, { useContext, useEffect, useState } from 'react'
// import Nav from './Nav'
// import { Link, useLocation} from 'react-router-dom'
// import { ProductContext } from '../Utils/Context'
// import Loading from './Loading'

// function Home() {
//   const [products] = useContext(ProductContext);
//   const { search } = useLocation();

//   // ✅ safely extract category
//   const params = new URLSearchParams(search);
//   const category = params.get("category");   // null if not present
  
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     if (!products) return;

//     if (!category) {
//       // ✅ no filter → show all
//       setFilteredProducts(products);
//     } else {
//       // ✅ filter by category
//       setFilteredProducts(products.filter(p => p.category === category));
//     }
//   }, [category, products]);

//   if (!products) return <Loading />;

  

//   return (
//     <>
//       <Nav/>
//       <div className="w-[85%] p-5 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
//         {filteredProducts && filteredProducts.map((p) => (
//           <Link key={p.id} to={`/details/${p.id}`} className="card mr-3 mb-3 p-3 shadow rounded-md w-[18%] h-[30vh] flex justify-center items-center flex-col"> 
//             <div className="w-full h-[80%] bg-contain bg-no-repeat bg-center mb-3 hover:scale-110 transition-transform duration-300" style={{backgroundImage:`url(${p.image})`}}></div> 
//             <h1 className="hover:text-blue-400">{p.title}</h1>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Home;




import React, { useContext } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'
import Loading from './Loading'

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();

  if (!products) return <Loading />;

  // ✅ safely extract category
  const params = new URLSearchParams(search);
  const category = params.get("category");

  // ✅ derive filtered list directly (no extra state, no stale data)
  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  return (
    <>
      <Nav/>
      <div className="w-[85%] p-5 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts.map((p) => (
          <Link 
            key={p.id} 
            to={`/details/${p.id}`} 
            className="card mr-3 mb-3 p-3 shadow rounded-md w-[18%] h-[30vh] flex justify-center items-center flex-col"
          > 
            <div 
              className="w-full h-[80%] bg-contain bg-no-repeat bg-center mb-3 hover:scale-110 transition-transform duration-300" 
              style={{backgroundImage:`url(${p.image})`}}
            ></div> 
            <h1 className="hover:text-blue-400">{p.title}</h1>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;
