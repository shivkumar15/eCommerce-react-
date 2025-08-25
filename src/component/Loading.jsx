import React from 'react'
import { Atom } from 'react-loading-indicators' 
function Loading() {
  return (
    <>
    <div className='w-full h-full flex justify-center items-center '>
   
   

     <Atom color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"] } size="large" text="loading" textColor={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"] } />
    </div>
       
    </>
  )
}

export default Loading