import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import FooterOS from '../components/FooterOS.jsx';

/* Carousel Import */
import Carousel from '../components/Carousel.jsx';
import { CarouselItemObject } from '../components/Carousel.jsx';

import Slider from '../components/Slider.jsx';

function Test()
{
  return (
    <div className="w-32 h-18 md:w-64 md:h-36 bg-os-blue-primary rounded-sm"></div>
  )
}

function Home()
{
  useEffect(() => {
    document.title = "Home - OtakuStream";
  }, []);

  return (
    <>
      <NavbarOS />
        <Slider 
          title="Continue Watching..."
          sliderList={[
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
          ]}
        />
        <Carousel 
          carouselList={[        
            new CarouselItemObject("TestName", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur", "/jpeg/Test.jpeg", "#"), 
            new CarouselItemObject("TestName", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur", "/bed-svgrepo-com.svg", "#"), 
            new CarouselItemObject("TestName", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur", "/dashboard-alt-3-svgrepo-com.svg", "#"), 
            new CarouselItemObject("TestName", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur", "/jpeg/Test.jpeg", "#"), 
            new CarouselItemObject("TestName", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur", "/bed-svgrepo-com.svg", "#"), 
            new CarouselItemObject("TestName", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur", "/dashboard-alt-3-svgrepo-com.svg", "#"), 
          ]}
        />
        <Slider 
          title="New For You..."
          sliderList={[
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
            Test,
          ]}
        />
      <FooterOS />
    </>
  );
};

export default Home;