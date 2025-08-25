import React from "react";
import Home from "./component/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./component/Details";
import Create from './component/Create';
import Edit from "./component/Edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App(){

  const {search,pathname}= useLocation()

  return (<>

<div className="w-full h-screen flex ">

    {(pathname !='/' || search.length>0) && ( <Link to="/" className=" absolute left-[17%] top-[5%] text-red-300" >Home</Link>) }
  
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/details/:id" element={<Details/>} />
    <Route path="/create" element={<Create/>} />
    <Route path="/edit/:id" element={<Edit/>}/>

   </Routes>
</div>
   <ToastContainer position="top-right" autoClose={2000} />

  </>
  )
}
export default App