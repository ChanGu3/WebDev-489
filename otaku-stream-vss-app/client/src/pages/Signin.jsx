import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import Footer from '../components/Footer.jsx';

function Signin()
{
    useEffect(() => {
        document.title = "Sign-In - OtakuStream";
    }, []);

    return (
        <>
        <NavbarOS />
        
        <Footer />
        </>
    );
}

export default Signin