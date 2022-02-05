import React, { useEffect } from 'react';
import Layout from '../layouts/Layout'
import '../styles/globals.css'

function App({ Component, pageProps }) {  
  const { session } = pageProps;
  
  useEffect(() => {
   
  }, []);
    
  return (  
      <Layout>
        <Component {...pageProps} />
      </Layout>   
  )
}

export default App