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
        </div>
    );
};

export default Header;