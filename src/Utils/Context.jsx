//  import axios from './axios';
// import React, { useEffect, useState ,createContext} from 'react'

//  export const ProductContext=createContext();
//  const Context=(props)=> {

//     const [products,setProducts]=useState(() => {
//     const saved = JSON.parse(localStorage.getItem("products"));
//     return Array.isArray(saved) ? saved : [];   // ✅ always an array
//   });


//     // const getProducts=async()=>{
//     //     try{    
//     //         const {data}=await axios("/products");
//     //         setProducts(data);
            
//     //     }catch(error){
//     //         console.log(error);
//     //     }
//     // };

//     // useEffect(()=>{ 
//     //     getProducts();
//     // },[])
//    return (
//      <>
//      <ProductContext.Provider value={[products,setProducts]}>
//     {props.children}
//      </ProductContext.Provider>
    
//      </>
//    );
//  }; 
 
//  export default Context;




// import axios from './axios';
// import React, { useState ,createContext} from 'react'

// export const ProductContext = createContext();

// const Context = (props) => {

//   const [products,setProducts] = useState(() => {
//     const saved = JSON.parse(localStorage.getItem("products"));

//     if (Array.isArray(saved)) return saved;       // ✅ correct case
//     if (saved && typeof saved === "object") return [saved]; // ✅ wrap single object
//     return [];                                    // ✅ fallback
//   });

//   return (
//     <ProductContext.Provider value={[products,setProducts]}>
//       {props.children}
//     </ProductContext.Provider>
//   );
// }; 

// export default Context;



import axios from './axios';
import React, { useEffect, useState ,createContext} from 'react'

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("products"));
    return Array.isArray(saved) ? saved : [];
  });

  useEffect(() => {
    // ✅ If localStorage is empty, fetch once and store
    if (!products || products.length === 0) {
      const getProducts = async () => {
        try {    
          const { data } = await axios("/products");
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data)); // ✅ save
        } catch(error) {
          console.log(error);
        }
      };
      getProducts();
    }
  }, []); // runs only on first mount

  // ✅ keep localStorage in sync whenever products change
  useEffect(() => {
    if (products && products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  return (
    <ProductContext.Provider value={[products,setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}; 

export default Context;
