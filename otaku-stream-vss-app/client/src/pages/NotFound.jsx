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
      <main>
        <p className="p-10 text-os-white">404 Not Found</p>
      </main>
      <FooterOS />
    </>
  );
}

export default NotFound;