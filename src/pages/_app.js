import "@/styles/globals.css";
import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover={false}
      />
      <Component {...pageProps} />
    </>
  );
}


      
    

    


