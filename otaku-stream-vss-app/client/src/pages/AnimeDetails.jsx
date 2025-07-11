import { useEffect, useState, useRef } from "react";
import NavbarOS from "../components/NavbarOS";
import FooterOS from "../components/FooterOS";
import "../tailwind.css";

import Dropdown from "../components/Dropdown.jsx"
import StreamModule2 from "../components/StreamModule2.jsx"

import { ShortenCountAsString } from '../Helpers/documentfunction.mjs'

function FavoriteSeries(starRef, seriesID)
{
    const starSVG = starRef.current;

    if(starSVG.getAttribute("fill") === "none")
    {
        starSVG.setAttribute("fill", "currentColor");
    }
    else
    {
        starSVG.setAttribute("fill", "none");
    }
}

function AnimeDetails({seriesID})
{
    const starRef = useRef(null);
    const starbuttonRef = useRef(null);


    const [isShowingDetails, SetIsShowingDetails] = useState(false);

    const isCurrentlyWatching = true;
    const streamTitle = "Movie";

    useEffect(() => {
        document.title = "Anime Details - OtakuStream";

    }, []);

    {/* Big Star Rating */}
    const ratingStarListRef = useRef([]);
    const [isRatingClicked, SetIsRatingClicked] = useState(0); // binary bool: 0 - None, ... , 5 - 5 Stars
    const ratingStarsElements = []; 
    for (let i = 1; i < 6; i++) {
        ratingStarsElements.push(
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" stroke="#59CFFF" xmlns="http://www.w3.org/2000/svg" className="place-self-center p-1.5 w-10 md:w-16">
            <path ref={(el) => {ratingStarListRef.current[i-1] = el} } onMouseEnter={() => {HoverRating(i)}} onMouseLeave={() => {HoverRating(i) }} onClick={() => {OnRatingClick(i)}} className="cursor-pointer text-transparent" d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        );
    }

    useEffect(() => {
        
    }, [isRatingClicked]);

    function HoverRating(rating)
    {
        if(rating === 0 || rating <= isRatingClicked) { return } // ending condition


        const ratingIndex = rating-1;
        const ratingElement = ratingStarListRef.current[ratingIndex];

        if (ratingElement.classList.contains('text-transparent'))
        {
            ratingElement.classList.remove('text-transparent');
            ratingElement.classList.add('text-os-blue-secondary');
        }
        else
        {
            ratingElement.classList.remove('text-os-blue-secondary');
            ratingElement.classList.add('text-transparent');
        }

        HoverRating(rating-1)
    }

    function OnRatingClick(rating)
    {
        for (let index = 0; index < isRatingClicked; index++)
        {
            if (rating-1 < index)
            {
                ratingStarListRef.current[index].classList.remove('text-os-blue-secondary');
                ratingStarListRef.current[index].classList.add('text-transparent');
            }
        }

        (rating === isRatingClicked) ? SetIsRatingClicked(0) : SetIsRatingClicked(rating);
    }

    {/* Dropdown Star Rating */}
    const ratingDropDownRef = useRef(null); 
    const ratingButtonRef = useRef(null)
    const [isStarDroppedDown, SetIsStarDroppedDown] = useState(false);
    const averageRating = 4.8;
    const totalRating = 15100;

    useEffect(() => {
        document.addEventListener('mousedown', OnMouseDown);
        
        return () => {
            document.removeEventListener('mousedown', OnMouseDown)
        };
    }, [])

    function OnMouseDown(event)
    {
        if(!ratingDropDownRef.current.contains(event.target) && !ratingButtonRef.current.contains(event.target))
        {
            SetIsStarDroppedDown(false);
        }
    }

    const ratings = []; 
    for (let i = 1; i < 6; i++) {
        ratings.push(
            <div key={i} className="flex flex-row items-center gap-x-2 py-1 px-1 md:px-2">
                <div className="flex flex-row items-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="place-self-center w-3 md:w-6">
                        <path className="text-os-blue-secondary" d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[10px] md:text-sm text-os-blue-secondary font-semibold">5</p>
                </div>
                <div className="rounded-xs bg-os-dark-secondary/70 w-full h-1 md:h-2">
                    <div className="rounded-xs w-[80%] h-1 md:h-2 bg-os-blue-secondary"></div>
                </div>
                <p className="text-[10px] md:text-sm text-os-blue-secondary font-semibold">82%</p>
            </div>
        );
    }

    return (
        <>
            <NavbarOS/>
                <main>
                    <div className="relative w-full h-[34vw]">
                        <img src="/jpeg/Test.jpeg" className="object-cover w-full h-[100%] mask-b-from-55% mask-b-to-100%" />

                        {/* Rating */}
                        <div className="absolute flex flex-row justify-center md:justify-end w-full h-[100%] md:h-auto top-0 left-0">
                            <div className="md:mt-[1vw] lg:mt-[6vw] md:mr-[12vw] flex flex-row md:flex-col justify-center items-center">
                                <p className="text-lg md:text-4xl text-os-white font-bold my-2 w-full text-center">Anime Title</p>
                                
                                <div className="w-full flex flex-col items-center">
                                    {/* 5 Stars */}
                                    <div className="flex flex-row">
                                        {ratingStarsElements}
                                    </div>

                                    {/* Divider */}
                                    <div className="hidden md:block my-6 rounded-sm border-3 border-os-white w-[80%]"></div>


                                    {/* Rating Dropdown */}
                                    <div className="relative flex flex-col justify-center items-center select-none">
                                        <div ref={ratingButtonRef} onClick={() => {SetIsStarDroppedDown(!isStarDroppedDown)}} className="flex flex-row items-center justify-between gap-x-2 cursor-pointer bg-os-dark-tertiary/40 hover:bg-os-dark-tertiary/70 px-2 py-1 h-6 md:h-10 w-24 md:w-38">
                                            <p className="text-os-white text-xs md:text-lg font-bold">{averageRating} {ShortenCountAsString(totalRating)}</p>
                                            <img src="/triangle-filled-svgrepo-com.svg" className="w-2 md:w-4"></img>
                                        </div>
                                        <div ref={ratingDropDownRef} className={`absolute flex flex-col justify-center top-6 md:top-10 left-0 w-36 md:w-60 bg-os-dark-tertiary/90 py-1 ${(isStarDroppedDown) ? "" : "hidden"} z-100`}>
                                            <p className="text-os-white text-[10px] md:text-sm font-semibold flex flex-row justify-between items-center md:my-1 mx-1 md:mx-2"><span>{averageRating}</span><span className="text-[8px] md:text-xs font-semibold italic">{totalRating.toString()} ratings</span></p>
                                            {ratings}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Favorites & Continue Watching */}
                        <div className="md:absolute flex flex-row justify-center md:justify-start my-2 md:my-0 gap-8 bottom-[2vw] left-12">
                            <a href="/" className="flex flex-row justify-center items-center gap-2 bg-os-blue-secondary px-2 py-1 group">
                                <svg className="group-hover:text-os-white group-active:text-os-white text-transparent w-[24px] lg:w-[32px]" fill="currentColor" stroke="#F8F8FF" strokeWidth="40" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-110 -100 512 512" xmlSpace="preserve">
                                    <path id="XMLID_308_" d="M37.728,328.12c2.266,1.256,4.77,1.88,7.272,1.88c2.763,0,5.522-0.763,7.95-2.28l240-149.999
                                        c4.386-2.741,7.05-7.548,7.05-12.72c0-5.172-2.664-9.979-7.05-12.72L52.95,2.28c-4.625-2.891-10.453-3.043-15.222-0.4
                                        C32.959,4.524,30,9.547,30,15v300C30,320.453,32.959,325.476,37.728,328.12z"/>
                                </svg>
                                <p className="text-os-white text-sm lg:text-lg font-semibold"><span>{(isCurrentlyWatching) ? "Continue Watching": "Start Watching"}</span>: <span>{streamTitle}</span></p>
                            </a>
                            <button ref={starbuttonRef} type="button" onClick={() => { FavoriteSeries(starRef, seriesID) }} className="flex justify-center items-center cursor-pointer">
                                <svg ref={starRef} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-os-white place-self-center bg-os-blue-secondary p-1.5 w-8 lg:w-10 hover:p-0.75">
                                    <path d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="w-full px-4 md:px-8 flex flex-col md:flex-row gap-x-4 justify-between">
                        
                        {/* Description */}
                        <div className="mt-16 mx-4 flex flex-col md:w-[45%]">
                            <p className="text-os-blue-secondary text-sm font-semibold py-1 underline underline-offset-4">Description:</p>
                            <p className={`whitespace-pre-wrap text-os-white text-xs w-[100%] ${(isShowingDetails) ? "": "line-clamp-4"}`}>
                            {`[Anime Summary] Lorem ipsum Morbi erat ex, lacinia nec efficitur eget, sagittis ut orci. Etiam in dolor placerat, pharetra ligula et, bibendum neque. 

Vestibulum vitae congue lectus, sed ultricies augue. Nam iaculis elit nec velit luctus, vitae rutrum nunc imperdiet. 

Nunc vel turpis sit amet lectus pellentesque tincidunt. Proin commodo tincidunt enim, at sodales mi dictum ac. 

Maecenas molestie, metus quis malesuada dictum, leo erat egestas lacus, sit amet tristique urna magna a diam. 

Donec ultricies dui sit amet mi ornare egestas. Phasellus ultricies lectus non interdum pellentesque. Cras nisi tellus, feugiat sed enim quis, tristique interdum lacus. Sed vel pharetra arcu, ac fermentum neque. Morbi mollis sollicitudin varius. Ut sit amet vulputate velit.

Mauris semper neque quis lacinia volutpat. Aenean vestibulum diam ex, sit amet posuere dolor luctus non. Ut consectetur felis blandit ipsum convallis, non lobortis justo facilisis. Ut vitae velit pulvinar, pharetra libero semper, dignissim urna.

Nullam quam quam, viverra eget feugiat a, interdum et erat. Morbi fringilla, eros et consequat iaculis, ligula nunc hendrerit neque, ac.`}
                            </p>

                            {/* DIVIDER */}
                            <div className={`border-2 border-os-dark-secondary w-45 self-center my-8 ${(isShowingDetails) ? "": "hidden"}`}></div>

                            <div className={`w-[100%] flex flex-col justify-start gap-y-2 ${(isShowingDetails) ? "": "hidden"}`}>
                                <p id="originaltranslation" className="text-os-dark-secondary text-xs  break-words whitespace-normal"><span className="text-os-white">Original Translation:</span> Japaneseaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                <p id="othertranslation" className="text-os-dark-secondary text-xs  break-words whitespace-normal"><span className="text-os-white">Other Translation:</span> English, Espanol</p>
                                {/*<p id="subtitles" className="text-os-dark-secondary text-xs  break-words whitespace-normal"><span className="text-os-white">Subtitles:</span> Japanese, English, Español, Korean (Hangugeo), Mandarin</p>*/}
                                {/*<p id="contentadvisory" className="text-os-dark-secondary text-xs  break-words whitespace-normal"><span className="text-os-white">Content Advisory:</span> 13+, None</p>*/}
                                <p id="categories" className="text-os-blue-tertiary text-xs break-words whitespace-normal"><span className="text-os-white">Categories:</span> <a className="active:text-os-blue-tertiary/80 hover:underline" href="">Adventure</a>, <a className="active:text-os-blue-tertiary/80 hover:underline"href="">Fantasy</a> </p>
                                <p id="seriescopyright" className="text-os-blue-primary text-xs break-words whitespace-normal">&copy; RealCloudAnime</p>
                            </div>
                            <div className="w-full my-2 flex flex-row justify-end">
                                <button onClick={() => { SetIsShowingDetails(!isShowingDetails) } } type="button" className="text-os-blue-tertiary text-sm text-end cursor-pointer mt-2">{(isShowingDetails) ? "Less Details" : "More Details"}</button>
                            </div>
                            <div className="border border-os-dark-secondary w-[100%]"></div>
                        </div>

                        {/* Season/Movie/Episodes */}
                        <div className="flex flex-col md:w-[50%]">
                            <div className="flex flex-row justify-between my-4 w-full">

                                {/* Season/Movie Chose */}
                                <Dropdown 
                                    imgSrc="/triangle-filled-svgrepo-com.svg"
                                    classNameMain="max-w-[65%] w-[65%] bg-os-dark-tertiary border-os-blue-secondary border-b" 
                                    classNameDropdown="bg-os-dark-tertiary border-os-blue-secondary border-b"
                                    optionList={[
                                        {title: "Season 1", titleright: "Episodes 23", onClick: () => { console.log("season 1"); }}, 
                                        {title: "Season 2", titleright: "Episodes 21", onClick: () => { console.log("season 2"); }},
                                        {title: "Season 3", titleright: "Episodes 24", onClick: () => { console.log("season 3"); }},
                                        {title: "Movie: The Clouds Of Thunder", titleright: "Movie", onClick: () => { console.log("Movie: The Clouds Of Thunder"); }},
                                    ]}
                                />

                                {/* Filter */}
                                <Dropdown 
                                    imgSrc="/filter-svgrepo-com.svg"
                                    classNameMain="max-w-[25%] w-[25%] bg-os-dark-tertiary border-os-blue-secondary border-b" 
                                    classNameDropdown="bg-os-dark-tertiary  border-os-blue-secondary border-b"
                                    optionList={[
                                        {title: "Newest", onClick: () => { console.log("season 1"); }}, 
                                        {title: "Oldest", onClick: () => { console.log("season 2"); }},
                                    ]}
                                />

                            </div>
                            <div className="grid grid-flow-cols justify-items-center lg:p-0 grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-8">
                                <StreamModule2 isMovie={true} streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#"/>
                                <StreamModule2 isMovie={false} streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#" episodeNum="7"/>
                                <StreamModule2 isMovie={true} streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#"/>
                                <StreamModule2 isMovie={false} streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#" episodeNum="7"/>
                                <StreamModule2 isMovie={true} streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#"/>
                                <StreamModule2 isMovie={false} streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#" episodeNum="7"/>
                                <StreamModule2 isMovie={true} streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#"/>
                                <StreamModule2 isMovie={false} streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#" episodeNum="7"/>
                                <StreamModule2 isMovie={true} streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#"/>
                                <StreamModule2 isMovie={false} streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#" episodeNum="7"/>
                                <StreamModule2 isMovie={true} streamTitle="MovieTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#"/>
                                <StreamModule2 isMovie={false} streamTitle="EpisodeTitle" streamImageSrc="/jpeg/Test.jpeg" dateReleased="05/04/25" href="#" episodeNum="7"/>
                            </div>
                        </div>

                    </div>
                </main>
            <FooterOS/>
        </>
    );
}

export default AnimeDetails;