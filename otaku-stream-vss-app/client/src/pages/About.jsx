import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import FooterOS from '../components/FooterOS.jsx';

function About()
{
  useEffect(() => {
    document.title = "About - OtakuStream";
  }, []);

  return (
    <>
      <NavbarOS />
        <main>
          <p className="mx-[45%] my-10 text-os-white text-4xl">About</p>
        </main>
      <FooterOS />
    </>
  );
};

export default About;