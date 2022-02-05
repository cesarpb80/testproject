import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header'
import AppContext from '../components/common/AppContext'

export default function Layout() {

  const logIn = (e) => {
    e.preventDefault();
  };

  const logOut = (e) => {
    e.preventDefault();

  };

  return (   
    <AppContext.Provider value={{ authEnabled: process.env.NEXT_PUBLIC_AUTH_ENABLED }}>
      <div style={{ paddingTop: '4rem' }}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header logIn={logIn} logOut={logOut} authEnabled={process.env.NEXT_PUBLIC_AUTH_ENABLED} />        
      </div>
    </AppContext.Provider>
  )
}