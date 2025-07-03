import FooterOS from '../components/FooterOS';
import NavbarOS from '../components/NavbarOS';
import SeriesModule from '../components/SeriesModule';
import '../tailwind.css'

function Search()
{
    return (
        <>
            <NavbarOS/>
                <main className="w-full mt-24 flex flex-col items-center">
                    <div className="mb-12 w-full flex flex-col justify-center items-center gap-y-4">
                        <form id="searchform" name="searchform" method="GET" onSubmit={(event) => { event.preventDefault(); }} className="flex flex-row justify-center items-center gap-x-2 md:gap-x-4 w-full">
                            <button id="searchicon" name="searchicon" type="submit" className="cursor-pointer">
                                <img className="min-w-6 w-6 md:min-w-7 md:w-7" src="/magnifying-glass-zoom-svgrepo-com.svg" alt="search-icon"></img>
                            </button>
                            <input id="search" name="search" className="p-1 md:p-2 w-[50%] border-os-blue-secondary border-1 md:border-2 rounded-sm text-os-white font-bold placeholder:text-os-white/80 placeholder:font-semibold" type="text" placeholder="Search"/>
                        </form>
                        <div className="flex flex-col justify-center items-center gap-y-1">
                            <p className='text-os-white text-sm md:text-md font-bold'>search our anime catolog!</p>
                            <p className='text-os-white text-xs md:text-sm font-semibold text-center w-[90%]'>enter what's on your mind in this search bar and we’ll get it for you</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="w-full text-os-blue-tertiary text-xs md:text-2xl font-semibold">Search Results</p>
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
            <FooterOS/>
        </>
    );
}

export default Search;