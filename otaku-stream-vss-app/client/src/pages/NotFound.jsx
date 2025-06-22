import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import FooterOS from '../components/FooterOS.jsx';

function NotFound()
{
    useEffect(() => {
      document.title = "404 - OtakuStream";
    }, []);

  return (
    <>
      <NavbarOS />
      <p className="p-10 text-[#F8F8FF]">404 Not Found</p>
      <FooterOS />
    </>
  );
}

export default NotFound;