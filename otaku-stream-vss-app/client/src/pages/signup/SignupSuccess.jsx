import '../../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../../components/NavbarOS.jsx'
import Footer from '../../components/Footer.jsx';

function SignupSuccess()
{
    useEffect(() => {
        document.title = "Sign-Up-Success - OtakuStream";
    }, []);

    return (
        <>
        <NavbarOS />

        <Footer />
        </>
    );
}

export default SignupSuccess