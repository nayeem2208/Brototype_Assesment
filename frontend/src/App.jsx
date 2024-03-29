import { useEffect, useState } from "react";
import "./App.css";
import image from "../public/brototype_logo-removebg-preview.png";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from "./Routes";
import { Link, useLocation } from 'react-router-dom';
import ModalUnstyled from "./Components/Modal";

function App() {

  const location = useLocation();
 
  
  return (
    <div
      className="h-screen min-h-full relative "
      style={{
        background:
          "radial-gradient(circle, rgba(89,89,89,1) 0%, rgba(17,17,17,1) 100%)",
      }}
    >
      <ToastContainer/>
      <img
  src={image}
  alt=""
  style={{
    position: "absolute",
    top: -65,
    left: 0,
    // width: "35vh",
    height: "auto",
    maxWidth: "100%", // Ensure the image is responsive
  }}
  className="sm:w-48"
/>
      <div className="flex justify-center items-center pt-24 ">
      <Link to={'/'} className={location.pathname === '/' ? "bg-black text-green-300 p-3 rounded-t-lg mr-4" : "text-white px-3"}>
          <button className="">Add Student</button>
        </Link>
        <Link to={'/students'} className={location.pathname === '/students' ? "bg-black text-green-300 p-3 rounded-lg" : "text-white"}>
          <button>All Students </button>
        </Link>
      </div>
      <ModalUnstyled/>
      <Routers/>
    </div>
  );
}

export default App;
