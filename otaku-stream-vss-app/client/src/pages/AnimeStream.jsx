import '../tailwind.css'
import { useEffect, useRef, useState } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import FooterOS from '../components/FooterOS.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import LikeButton from '../components/LikeButton.jsx';
import StreamModule2 from '../components/StreamModule2.jsx'

function AnimeStream()
{
    const [isShowingDetails, SetIsShowingDetails] = useState(false);

    useEffect(() => {
        document.title = "Anime Stream - Otaku Stream";

    }, []);


    return (
        <>
        <NavbarOS/>
            <main className="">
                {/* Title Image */}
                <a href="/">
                    <div className="relative w-full h-[10vw] ">
                        <div className="absolute top-0 left-0 z-11 w-full h-full flex justify-start items-center px-8">
                            <p className="text-lg md:text-4xl font-semibold text-os-white">Anime Title</p>
                        </div>
                        <img src="/jpeg/Test.jpeg" className="absolute top-0 left-0 object-cover w-full h-[100%] mask-b-from-55% mask-b-to-100% z-10" />
                    </div>
                </a>

                {/* Video Player */}
                <div className="relative flex flex-col items-center justify-center w-full h-[100%]">
                    <div className="absolute top-0 left-0 bg-os-dark-tertiary/80 w-[100%] h-[100%] z-0"></div>
                    <div className={`relative bg-os-dark-tertiary aspect-video w-[100%] xl:w-[70vw] h-[100%] z-10`}>
                        <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-[100%] h-[100%]">
                            <button onClick={() => {}} className="rounded-full bg-os-dark-primary hover:bg-os-dark-primary/60 ring-2 ring-os-white hover:ring-os-blue-secondary flex flex-col justify-center items-center p-4 md:p-6 group cursor-pointer">
                                <svg className="w-6 md:w-8" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <title>triangle-filled</title>
                                    <g transform="scale(1,-1) translate(0,-512)">
                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g className="group-hover:text-os-blue-secondary text-os-white" id="drop" fill="currentColor" transform="translate(-10, 30), rotate(90, 256, 256)">
                                                <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                                                </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-3 md:px-4 xl:mx-[6vw]">

                    {/* Stream Title */}
                    <p className="self-center flex flex-row justify-between text-os-white font-semibold">
                        <span className="text-xs md:text-2xl font-semibold">Season 1 Episode 2: The Sun Hidden In The Cloud</span>
                        <span className="italic whitespace-nowrap text-[8px] md:text-lg">
                            <span className="text-os-blue-secondary">Release Date:</span> Sep 13 2018
                        </span>
                    </p>

                    {/* Like & Favorite */}
                    <div className="flex flex-row justify-between items-center py-2">
                        <LikeButton seriesID={-1}/>
                        <FavoriteButton seriesID={-1}/>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col w-[100%]">
                        <p className="text-os-blue-secondary text-sm font-semibold py-2 underline underline-offset-4">Synopsis:</p>
                        <p className={`whitespace-pre-wrap text-os-white text-xs w-[100%] ${(isShowingDetails) ? "": "line-clamp-4"}`}>
                        {`[Anime Summary] Lorem ipsum Morbi erat ex, lacinia nec efficitur eget, sagittis ut orci. Etiam in dolor placerat, pharetra ligula et, bibendum neque. 

Vestibulum vitae congue lectus, sed ultricies augue. Nam iaculis elit nec velit luctus, vitae rutrum nunc imperdiet. 

Nunc vel turpis sit amet lectus pellentesque tincidunt. Proin commodo tincidunt enim, at sodales mi dictum ac. 

Maecenas molestie, metus quis malesuada dictum, leo erat egestas lacus, sit amet tristique urna magna a diam. 

Donec ultricies dui sit amet mi ornare egestas. Phasellus ultricies lectus non interdum pellentesque. Cras nisi tellus, feugiat sed enim quis, tristique interdum lacus. Sed vel pharetra arcu, ac fermentum neque. Morbi mollis sollicitudin varius. Ut sit amet vulputate velit.

Mauris semper neque quis lacinia volutpat. Aenean vestibulum diam ex, sit amet posuere dolor luctus non. Ut consectetur felis blandit ipsum convallis, non lobortis justo facilisis. Ut vitae velit pulvinar, pharetra libero semper, dignissim urna.

Nullam quam quam, viverra eget feugiat a, interdum et erat. Morbi fringilla, eros et consequat iaculis, ligula nunc hendrerit neque, ac.`}
                        </p>

                        <div className="mt-4 border border-os-dark-secondary w-[100%]"></div>

                        <div className="w-full my-2 flex flex-row justify-start">
                            <button onClick={() => { SetIsShowingDetails(!isShowingDetails) } } type="button" className="text-os-blue-tertiary text-sm text-end cursor-pointer mt-2">{(isShowingDetails) ? "Less Details" : "More Details"}</button>
                        </div>
                    </div>

                    {/* Next/Prev Episodes */}
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <p className="my-1 text-os-white font-semibold text-sm md:text-xl self-start">Previous Stream</p>  
                            <div className="w-27.5 sm:w-35 md:w-60">
                                <StreamModule2 isMovie={false} streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#" episodeNum="7"/>
                            </div>                              
                        </div>
                        <div className="flex flex-col">
                            <p className="my-1 text-os-white font-semibold text-sm md:text-xl self-end">Next Stream</p>  
                            <div className="w-27.5 sm:w-35 md:w-60">
                                <StreamModule2 isMovie={true} streamTitle="Movie" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#" flipBottomText={true}/>
                            </div>                              
                        </div>
                    </div>
                </div>
            </main>
        <FooterOS/>
        </>
    )
}

export default AnimeStream;