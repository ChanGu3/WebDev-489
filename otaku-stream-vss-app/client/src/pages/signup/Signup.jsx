import '../../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../../components/NavbarOS.jsx'
import Footer from '../../components/Footer.jsx';

function Signup()
{
    useEffect(() => {
        document.title = "Sign-Up - OtakuStream";
    }, []);

    return (
        <>
        <NavbarOS />

        <Footer />
        </>
    );
}

export default Signup