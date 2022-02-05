import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header'

export default function Layout({children}) {

  const logIn = (e) => {
    e.preventDefault();
  };

  const logOut = (e) => {
    e.preventDefault();

  };

  return (    
      <div style={{ paddingTop: '4rem' }}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header logIn={logIn} logOut={logOut} />        
        { children }
      </div>   
  )
}