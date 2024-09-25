import "@/styles/globals.css";
import React, { useEffect } from 'react';
import 'keen-slider/keen-slider.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { analytics } from '../firebase'; // Import the Firebase Analytics instance
import { logEvent } from 'firebase/analytics'; // Import logEvent to log custom events like page views

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (analytics) {
        logEvent(analytics, 'page_view', {
          page_path: url,
        });
      }
    };

    // Listen to Next.js route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener on unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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


