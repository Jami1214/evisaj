import React, { useCallback } from 'react';;
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

export default function Layout({ children }) {
  
  return (
    <React.Fragment>
        <Navbar />
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}
