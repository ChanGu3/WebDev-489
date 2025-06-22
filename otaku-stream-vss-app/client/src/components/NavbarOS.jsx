import '../tailwind.css'
import tvLogo from '../assets/images/brand-tv-logo.png'
import { useState } from 'react'

function NavbarOS()
{
    const [isCategoriesVisible, setCategoriesVisible] = useState(false);
    const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);

    function ToggleCategoriesDropDown()
    {
        if (isProfileDropdownVisible)
        {
            ToggleProfileDropDown();
        }

        const cOverlay = document.getElementById('categoriesdropdown');
        const cTab = document.getElementById('categoriestab');
        const darkOverlay = document.getElementById('darkoverlay');
        const rcDropdown = document.getElementById('removecategorydropdown');

        if (isCategoriesVisible == true) // hide 
        {
            cTab.classList.remove('bg-[#429ABE]');
            cOverlay.classList.add('hidden');
            darkOverlay.classList.add('hidden');
            rcDropdown.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        else //un-hide
        {
            cTab.classList.add('bg-[#429ABE]');
            cOverlay.classList.remove('hidden');
            darkOverlay.classList.remove('hidden');
            rcDropdown.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }

        setCategoriesVisible(!isCategoriesVisible);
    }

    function ToggleProfileDropDown()
    {
        if (isCategoriesVisible)
        {
            ToggleCategoriesDropDown();
        }

        const pDropdown = document.getElementById('profiledropdown');
        const pTab = document.getElementById('profiletab');
        const darkOverlay = document.getElementById('darkoverlay');
        const rpDropdown = document.getElementById('removeprofiledropdown');

        if (isProfileDropdownVisible == true)
        {
            pTab.classList.remove('bg-[#429ABE]');
            pDropdown.classList.add('hidden');
            darkOverlay.classList.add('hidden');
            rpDropdown.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        else
        {
            pTab.classList.add('bg-[#429ABE]');
            pDropdown.classList.remove('hidden');
            darkOverlay.classList.remove('hidden');
            rpDropdown.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }

        setProfileDropdownVisible(!isProfileDropdownVisible);
    }


    return (
        <>
            {/* --- Navbar --- */}
            <nav id="navbar" className="fixed top-0 left-0 w-full h-14 flex flex-row bg-[#0F0F0F] z-98">
                <div className="flex flex-row items-center justify-center z-100">
                    <a id="logo" className="mx-2 flex flex-row items-center justify-center no-underline p-1 hover:brightness-0 hover:invert" href="/">
                        <img className="w-10 mx-2" type="image/png" src={tvLogo} alt="os-tv-logo"/>
                        <p className="text-[#87CEEB] font-bold text-2xl mb-1">OtakuStream</p>
                    </a>
                    <a className="p-4 flex flex-row items-center justify-center cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" href="#">
                        <img className="w-6" src="/magnifying-glass-zoom-svgrepo-com.svg" alt="search-icon" href="#"></img>
                    </a>
                    <div className="relative h-full z-100">
                        <button id="categoriestab" name="categoriestab" className="p-4 flex flex-row items-center justify-center space-x-1 cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" type="button" onClick={() => ToggleCategoriesDropDown()}>
                            <p className="text-[#F8F8FF] font-semibold">Categories</p>
                            <img className="w-3" src="/triangle-filled-svgrepo-com.svg" alt="dropdown-icon"></img>
                        </button>
                        {/* --- Categories Dropdown --- */}
                        <div id="categoriesdropdown" name="categoriesdropdown" className="absolute bg-[#429ABE] p-2 flex flex-row hidden">
                            <div id="genres" className="flex flex-col justify-start">
                                <a className="font-bold m-1" href="#">GENRES</a>
                                <div className="my-1 border-[#F8F8FF] rounded-sm border-b-2 rounded-xs w-auto"></div>
                                <div className="grid grid-flow-col grid-rows-5 gap-y-2 gap-x-1">
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Action</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Adventure</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Comedy</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Drama</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Fantasy</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Music</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Romance</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Slice of life</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Sports</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Seinen</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Shonen</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Shojo</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Sci-Fi</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Supernatural</a>
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30" href="#">Thriller</a>
                                </div>
                            </div>
                            <div className="m-6 my-0 border-slate-50 border-l-2 rounded-xs w-auto"></div>
                            <div id="other" className="flex flex-col items-center justify-center">
                                <a className="font-bold m-1 p-1 border-[#F8F8FF] border-b-2 rounded-xs w-[75%] text-center" href="#">OTHER</a>
                                <div className="grid grid-flow-col grid-rows-5 gap-y-2 gap-x-1">
                                    <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] font-semibold px-1 py-1 w-30 text-center" href="#">Browse (A-Z)</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-gray-500 border-l-2 ml-[14px] rounded-xs h-1/2 w-4"></div>
                    <a id="support" name="support" className="p-4 flex flex-row items-center justify-center space-x-1 cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" href="#">
                        <p className="text-[#F8F8FF] font-semibold">Support</p>
                    </a>
                    <a id="aboutus" name="aboutus" className="p-4 flex flex-row items-center justify-center space-x-1 cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" href="#">
                        <p className="text-[#F8F8FF] font-semibold">About Us</p>
                    </a>
                </div>
                <div className="ml-auto relative h-full z-100">
                    <button id="profiletab" name="profiletab" className="p-4 flex flex-row items-center justify-center space-x-1 cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" type="button" onClick={() => ToggleProfileDropDown()}>
                        <img className="w-8 mx-2" type="image/png" src={tvLogo} alt="os-tv-logo"/>
                        <img className="w-3" src="/triangle-filled-svgrepo-com.svg" alt="dropdown-icon"></img>
                    </button>
                    {/* --- Guest Profile Dropdown --- */}
                    <div id="profiledropdown" name="profiledropdown" className="absolute right-0 w-60 bg-[#429ABE] py-4 px-2 flex flex-col space-y-4 hidden">
                        <a className="flex flex-col py-2 pl-2 pr-4 hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-y-0.25" href="/auth/signin">
                            <p className="text-sm font-bold">Sign In</p>
                            <p className="text-xs font-semibold text-[#F8F8FF]">Welcome Back! Can't wait to see what your into now!</p>
                        </a>
                        <a className="flex flex-col py-2 pl-2 pr-4 hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-y-0.25" href="/auth/signup">
                            <p className="text-sm font-bold">Sign Up</p>
                            <p className="text-xs font-semibold text-[#F8F8FF]">Join Us! Watch anime ad free with a premium account!</p>
                        </a>
                    </div>
                    {/* --- Member Profile Dropdown --- */}
                    <div id="memberprofiledropdown" name="guestprofiledropdown" className="absolute right-0 w-60 bg-[#429ABE] py-4 px-2 flex flex-col space-y-4 hidden">
                        <div className="flex flex-col space-y-2">
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/bed-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Safe Space</p>
                            </a>
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/star-sharp-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Favorites</p>
                            </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="border-b-2 border-[#F8F8FF] text-[#F8F8FF]">Account</p>
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/profile-1335-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Profile</p>
                            </a>
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/gear-1-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Settings</p>
                            </a>
                        </div>
                        <div className="flex flex-row justify-end">
                                <img className="w-5" src="/logout-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Sign Out</p>
                        </div>
                    </div>
                    
                    {/* --- Admin Profile Dropdown --- */}
                    <div id="adminprofiledropdown" name="guestprofiledropdown" className="absolute right-0 w-60 bg-[#429ABE] py-4 px-2 flex flex-col space-y-4 hidden">
                        <div className="flex flex-col space-y-2">
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/bed-svgrepo-com.svg" alt="bed-icon"></img>
                                <p className="text-sm font-semibold">Safe Space</p>
                            </a>
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/star-sharp-svgrepo-com.svg" alt="favorite-icon"></img>
                                <p className="text-sm font-semibold">Favorites</p>
                            </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="border-b-2 border-[#F8F8FF] text-[#F8F8FF]">Account</p>
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/profile-1335-svgrepo-com.svg" alt="profile-icon"></img>
                                <p className="text-sm font-semibold">Profile</p>
                            </a>
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/gear-1-svgrepo-com.svg" alt="setting-icon"></img>
                                <p className="text-sm font-semibold">Settings</p>
                            </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="border-b-2 border-[#F8F8FF] text-[#F8F8FF]">Admin</p>
                            <a className="flex flex-row items-center hover:bg-[#59CFFF] active:bg-[#59CFFF] rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/dashboard-alt-3-svgrepo-com.svg" alt="dashboard-icon"></img>
                                <p className="text-sm font-semibold">Dashboard</p>
                            </a>
                        </div>
                        <div className="flex flex-row justify-end">
                                <img className="w-5" src="/logout-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Sign Out</p>
                        </div>
                    </div>
                </div>

                {/* --- Remove Category Dropdown Overlay --- */}
                <div id="removecategorydropdown" name="removecategorydropdown" className="fixed top-0 left-0 w-[100vw] h-[100vh] z-99 hidden" onClick={() => ToggleCategoriesDropDown()}></div>
                {/* --- Remove Profile Dropdown Overlay --- */}
                <div id="removeprofiledropdown" name="removeprofiledropdown" className="fixed top-0 left-0 w-[100vw] h-[100vh] z-99 hidden" onClick={() => ToggleProfileDropDown()}></div>
            </nav>

            {/* --- Dark Overlay --- */}
            <div id="darkoverlay" className="fixed bg-black/30 w-full h-[100vh] z-90 hidden">

            </div>

            {/* NAVBAR MARGIN FITTING */}
            <div className="w-full h-14"> </div>
        </>
    )
};

export default NavbarOS;