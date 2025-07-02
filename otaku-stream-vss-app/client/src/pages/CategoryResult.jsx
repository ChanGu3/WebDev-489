import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import FooterOS from '../components/FooterOS.jsx';

import SeriesModule from '../components/SeriesModule.jsx';

function CategoryResult({categoryName})
{
  useEffect(() => {
    document.title = `${categoryName} - OtakuStream`;
  }, []);

  return (
    <>
        <NavbarOS />
        <main className="w-full mt-8 flex flex-col items-center">
            <div className="flex flex-col justify-center">
                <p className="w-full text-os-blue-tertiary text-xs md:text-2xl font-semibold">Category Name...</p>
                <div className="my-2 grid grid-flow-row grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-6">
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                    <SeriesModule title="Clouds" imageSrc="/jpeg/Test.jpeg" seasonNum="3" episodeNum="47" movieNum="1" description="clouds shows all the possible cloud formations on earth. there are so many clouds that can produce rain and make a foggy experience. we all should love clouds for their ability to bring us shade when stretching over the sun on hot summer days." href="#"/>
                </div>
            </div>
            <div className="my-4 w-full flex flex-row justify-center">
                <button type="button" onClick={() => {}} className="font-semibold text-md text-os-blue-tertiary hover:text-os-blue-tertiary/60 cursor-pointer" >Load More...</button>
            </div>
        </main>
        <FooterOS />
    </>
  );
};

export default CategoryResult;