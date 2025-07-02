import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import FooterOS from '../components/FooterOS.jsx';

/* Carousel Import */
import Carousel from '../components/Carousel.jsx';
import { CarouselItemObject } from '../components/Carousel.jsx';

import Slider from '../components/Slider.jsx';

import SeriesModule from '../components/SeriesModule.jsx';
import StreamModule from '../components/StreamModule.jsx';

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
        <main>
          <Slider 
            title="Continue Watching..."
            sliderList={[
              <StreamModule isMovie={true} animeTitle="AnimeTitle" streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#"/>,
              <StreamModule isMovie={false} animeTitle="AnimeTitle" streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#" seasonNum="2" episodeNum="7"/>,
              <StreamModule isMovie={true} animeTitle="AnimeTitle" streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#"/>,
              <StreamModule isMovie={false} animeTitle="AnimeTitle" streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#" seasonNum="2" episodeNum="7"/>,
              <StreamModule isMovie={true} animeTitle="AnimeTitle" streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#"/>,
              <StreamModule isMovie={false} animeTitle="AnimeTitle" streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#" seasonNum="2" episodeNum="7"/>,
              <StreamModule isMovie={true} animeTitle="AnimeTitle" streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#"/>,
              <StreamModule isMovie={false} animeTitle="AnimeTitle" streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#" seasonNum="2" episodeNum="7"/>,
              <StreamModule isMovie={true} animeTitle="AnimeTitle" streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#"/>,
              <StreamModule isMovie={false} animeTitle="AnimeTitle" streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#" seasonNum="2" episodeNum="7"/>,
              <StreamModule isMovie={true} animeTitle="AnimeTitle" streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#"/>,
              <StreamModule isMovie={false} animeTitle="AnimeTitle" streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" streamDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" dateReleased="05/04/25" href="#" seasonNum="2" episodeNum="7"/>,
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
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Tree" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,
              <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>,            
            ]}
          />
        </main>
      <FooterOS />
    </>
  );
};

export default Home;