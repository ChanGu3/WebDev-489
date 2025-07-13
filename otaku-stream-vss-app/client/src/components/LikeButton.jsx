import '../tailwind.css'
import { useEffect, useRef, useState } from 'react'
import { ShortenCountAsString } from '../Helpers/documentfunction.mjs'

function LikeButton({streamID})
{
    if(streamID == null || streamID == undefined)
    {
        return <></>
    }

    const [userLikeCount, SetUserLikeCount] = useState(0);
    const likeRef = useRef(null);
    const [isLiked, SetIsLiked] = useState(null);
    const [totalLikeCount, SetTotalLikeCount] = useState(null)
    const [isAuthorized, SetIsAuthorized] = useState(false);

    useEffect(() => {
        let tempLikeCount = 0;

        // AUTHORIZATION
        fetch(`/api/authorize/member`, {
            method: 'GET',
        }).then((response) => {
            if(response.ok)
            {
                SetIsAuthorized(true);
            }
        }).catch((err) => {
        });

        // ALL LIKES 
        fetch(`/api/anime/stream/${streamID}/like`, {
            method: 'GET',
        }).then((response) => {
            if(response.ok)
            {
                return response.json();
            }
        }).then((data) => {
            if (data)
            {
                tempLikeCount = data.length;
            }
        }).catch((err) => {
        });

        // USER SPECIFIC LIKE
        fetch(`/api/authorize/member/anime/like/${streamID}`, {
            method: 'GET',
        }).then((response) => {
            if(response.ok)
            {
                SetIsLiked(true)
                userLikeCount(1);
                tempLikeCount = tempLikeCount - 1;
            }
            else
            {
                userLikeCount(0);
            }
        }).catch((err) => {
        });

        SetTotalLikeCount(tempLikeCount);
    }, [])

    function ToggleLike()
    {
        const theMethod = (isLiked) ? 'DELETE' : 'POST';

        fetch(`/api/authorize/member/anime/like/${streamID}`, {
            method: theMethod,
        }).then((response) => {
            if(response.ok)
            {
                SetIsLiked(!isLiked);
            }
        }).catch((err) => {
        });
    }

    useEffect(() => {
        if(isLiked != null)
        {
            LikeEpisode();
        }
    }, [isLiked]);

    function LikeEpisode()
    {
        const likeSVG = likeRef.current;

        if(isLiked)
        {
            SetUserLikeCount(1);
            likeSVG.setAttribute("fill", "currentColor");
        }
        else
        {
            likeSVG.setAttribute("fill", "none");
            SetUserLikeCount(0);
        }
    }

    return (
        <button onClick={() => { if(isAuthorized) { ToggleLike(); }  }} className="flex flex-row gap-x-1 items-center">
            <svg ref={likeRef} className={`text-os-blue-secondary w-8 md:w-10 ${(isAuthorized) ? 'cursor-pointer': ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20" stroke="#F8F8FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-os-white font-semibold text-sm md:text-lg">{ShortenCountAsString(totalLikeCount + userLikeCount)}</p>
        </button> 
    )
}

export default LikeButton;