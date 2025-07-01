

function SeriesModule({title, imageSrc, seasonNum, episodeNum, movieNum, description, href})
{
    return (
        <>
        <div className="ml-10 w-36 md:w-72 h-auto relative">
            <a href={href} className="flex flex-col gap-y-1">
                <img src={imageSrc} className="rounded-xs aspect-[3/2]"></img>
                <p className="font-semibold text-lg text-os-dark-secondary">{title}</p>
            </a>
            <div className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none md:pointer-events-auto md:hover:opacity-100">
                <img src="/jpeg/Test.jpeg" className="absolute top-0 left-0 w-full h-full"></img>
                <div className="absolute top-0 left-0 w-full h-full bg-os-dark-tertiary/90 flex flex-col px-3 py-1">
                    <p className="text-os-white text-xl font-bold">{title}</p>
                    <div className="my-1 w-full border-[0.5px] border-os-dark-secondary rounded-xs"></div>
                    <div className="my-1 w-full flex flex-col">
                        <p className="text-xs italic text-os-dark-secondary">Season {seasonNum}</p>
                        <p className="text-xs italic text-os-dark-secondary">Episodes {episodeNum}</p>
                        <p className="text-xs italic text-os-dark-secondary">Movies {movieNum}</p>
                    </div>
                    <div className="my-1 w-full border-[0.5px] border-os-dark-secondary rounded-xs"></div>
                    <p className="my-1 text-xs text-os-white text-ellipsis h-16 line-clamp-4">{description}</p>
                    <div className="p-1 w-full h-auto flex justify-center">
                        <a href={href} className="text-lg text-os-blue-tertiary hover:text-os-blue-tertiary/60 active:text-os-blue-tertiary/80 font-semibold">{'>'} Discover</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default SeriesModule;