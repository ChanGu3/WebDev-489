import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import Footer from '../components/Footer.jsx';

function NotFound()
{
    useEffect(() => {
      document.title = "404 - OtakuStream";
    }, []);

  return (
    <>
      <NavbarOS />
      <p className="p-10 text-[#F8F8FF]">404 Not Found</p>
      <Footer />
    </>
  );
}

export default NotFound;