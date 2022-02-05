import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap'
import Sidebar from '../components/Sidebar';

const Header = () => {
    
    
   
    return(
        <div style={{ marginBottom: '0%' }}>
            <div style={{ height: '63.3px', backgroundColor: '#0d3050', position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '101' }}>            
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />                      
            </div>
            <Navbar style={{ width: '94.5%', marginLeft: '5.5%' }} fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <Image src="/copalogomain_XL.svg" alt="Copa Airlines" width={150} height={30}
                    /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link href="/servicio"><a className="nav-link" role="button">Servicio</a></Link>
                        <Link href="/cliente"><a className="nav-link" role="button">Cliente</a></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;