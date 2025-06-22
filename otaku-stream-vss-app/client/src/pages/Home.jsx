import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import FooterOS from '../components/FooterOS.jsx';

function Home()
{
  useEffect(() => {
    document.title = "Home - OtakuStream";
  }, []);

  return (
    <>
      <NavbarOS />
      <p className="mx-[45%] my-10 text-white text-4xl">Home</p>
      <FooterOS />
    </>
  );
};

export default Home;