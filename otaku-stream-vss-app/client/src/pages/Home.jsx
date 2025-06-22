import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import Footer from '../components/Footer.jsx';

function Home()
{
  useEffect(() => {
    document.title = "Home - OtakuStream";
  }, []);

  return (
    <>
      <NavbarOS />
      <p className="mx-[50%] my-10 text-white">Home</p>
      <Footer />
    </>
  );
};

export default Home;