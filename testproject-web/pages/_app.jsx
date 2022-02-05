import React, { useEffect } from 'react';
import Layout from '../layouts/Layout'
import '../styles/globals.css'
import { Provider as AuthProvider } from 'next-auth/client';

function App({ Component, pageProps }) {  
  const { session } = pageProps;
  
  useEffect(() => {
   
  }, []);
    
  return (
    <AuthProvider session={session}
      options={{
        site: process.env.NEXT_PUBLIC_NEXTAUTH_URL
      }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider >   
  )
}

export default App