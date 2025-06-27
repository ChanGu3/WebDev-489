import '../tailwind.css'
import tvLogo from '../assets/images/brand-tv-logo.png'
import { useState } from 'react'

function Category({categoryName, href})
{
    return (
        <a className="hover:bg-[#59CFFF] active:bg-[#59CFFF] text-xs px-1 py-1 w-30" href={href}>{categoryName}</a>
    )
}

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
            cTab.classList.remove('bg-os-blue-tertiary');
            cOverlay.classList.add('hidden');
            darkOverlay.classList.add('hidden');
            rcDropdown.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        else //un-hide
        {
            cTab.classList.add('bg-os-blue-tertiary');
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
            pTab.classList.remove('bg-os-blue-tertiary');
            pDropdown.classList.add('hidden');
            darkOverlay.classList.add('hidden');
            rpDropdown.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        else
        {
            pTab.classList.add('bg-os-blue-tertiary');
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
            <nav id="navbar" className="fixed top-0 left-0 w-full h-12 flex flex-row bg-os-dark-tertiary z-98">
                <div className="flex flex-row items-center z-100">
                    <a id="logo" className="mx-2 px-1 flex flex-row items-center justify-center hover:brightness-0 hover:invert" href="/">
                        <img className="min-w-6 w-6 mx-1 mt-1" type="image/png" src={tvLogo} alt="os-tv-logo"/>
                        <p className="text-os-blue-primary font-bold text-md hidden md:block">OtakuStream</p>
                    </a>
                    <a className="px-5 flex flex-row items-center cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" href="#">
                        <img className="min-w-4 w-4 mt-0.75" src="/magnifying-glass-zoom-svgrepo-com.svg" alt="search-icon" href="#"></img>
                    </a>
                    <div className="relative h-full hidden md:block">
                        <button id="categoriestab" name="categoriestab" className="px-3 flex flex-row items-center justify-center space-x-1 cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" type="button" onClick={() => ToggleCategoriesDropDown()}>
                            <p className="text-os-white text-sm">Categories</p>
                            <img className="w-2 mt-1" src="/triangle-filled-svgrepo-com.svg" alt="dropdown-icon"></img>
                        </button>
                        {/* --- Categories Dropdown --- */}
                        <div id="categoriesdropdown" name="categoriesdropdown" className="absolute bg-os-blue-tertiary p-2 flex flex-row hidden">
                            <div id="genres" className="flex flex-col justify-start">
                                <a className="font-semibold hover:underline text-xs" href="#">Genres</a>
                                <div className="my-1 border-os-white rounded-sm border-b-2 w-[95%]"></div>
                                <div className="grid grid-flow-col grid-rows-5 gap-y-2 gap-x-1">
                                    <Category categoryName="Action" href="#"/>
                                    <Category categoryName="Adventure" href="#" />
                                    <Category categoryName="Comedy" href="#" />
                                    <Category categoryName="Drama" href="#" />
                                    <Category categoryName="Fantasy" href="#" />
                                    <Category categoryName="Music" href="#" />
                                    <Category categoryName="Romance" href="#" />
                                    <Category categoryName="Slice of life" href="#" />
                                    <Category categoryName="Sports" href="#" />
                                    <Category categoryName="Seinen" href="#" />
                                    <Category categoryName="Shonen" href="#" />
                                    <Category categoryName="Shojo" href="#" />
                                    <Category categoryName="Sci-Fi" href="#" />
                                    <Category categoryName="Supernatural" href="#" />
                                    <Category categoryName="Thriller" href="#" />
                                </div>
                            </div>
                            <div className="m-6 my-0 border-os-white border-l-2 rounded-xs w-auto"></div>
                            <div id="genres" className="flex flex-col justify-start">
                                <a className="font-semibold hover:underline text-xs" href="#">Other</a>
                                <div className="my-1 border-os-white rounded-sm border-b-2 w-[95%]"></div>
                                <div className="grid grid-flow-col grid-rows-5 gap-y-2 gap-x-1">
                                    <Category categoryName="Browse [A-Z]" href="#"/>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-os-dark-secondary border-l-2 ml-[14px] rounded-xs h-1/2 w-4"></div>
                    <a id="support" name="support" className="px-3 flex flex-row items-center justify-center space-x-1 cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" href="/support">
                        <p className="text-os-white text-sm">Support</p>
                    </a>
                    <a id="aboutus" name="aboutus" className="px-3 flex-row items-center justify-center space-x-1 cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full hidden md:flex" href="/about">
                        <p className="text-os-white text-sm">About Us</p>
                    </a>
                </div>
                <div className="relative h-full ml-auto z-100">
                    <button id="profiletab" name="profiletab" className="px-4 flex flex-row items-center justify-center cursor-pointer hover:bg-gray-800 active:bg-gray-700 h-full" type="button" onClick={() => ToggleProfileDropDown()}>
                        <img className="min-w-7 w-7 mr-1 rounded-full border-1 border-os-white" type="image/png" src={tvLogo} alt="os-tv-logo"/>
                        <img className="w-2" src="/triangle-filled-svgrepo-com.svg" alt="dropdown-icon"></img>
                    </button>
                    {/* --- Guest Profile Dropdown --- */}
                    <div id="profiledropdown" name="profiledropdown" className="absolute right-0 w-35 md:w-60 bg-os-blue-tertiary py-4 px-2 flex flex-col space-y-4 hidden">
                        <a className="flex flex-col py-2 pl-2 pr-4 hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-y-0.25" href="/auth/signin">
                            <p className="text-sm font-bold">Sign In</p>
                            <p className="text-xs font-semibold text-os-white">Welcome Back! <span className="hidden md:inline">Can't wait to see what your into now!</span></p>
                        </a>
                        <a className="flex flex-col py-2 pl-2 pr-4 hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-y-0.25" href="/auth/signup">
                            <p className="text-sm font-bold">Sign Up</p>
                            <p className="text-xs font-semibold text-os-white">Join Us! <span className="hidden md:inline">Watch anime ad free with a premium account!</span></p>
                        </a>
                    </div>
                    {/* --- Member Profile Dropdown --- */}
                    <div id="memberprofiledropdown" name="guestprofiledropdown" className="absolute right-0 w-60 bg-os-blue-tertiary py-4 px-2 flex flex-col space-y-4 hidden">
                        <div className="flex flex-col space-y-2">
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/bed-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Safe Space</p>
                            </a>
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/star-sharp-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Favorites</p>
                            </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="border-b-2 border-os-white text-os-white">Account</p>
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/profile-1335-svgrepo-com.svg" alt="safespace-icon"></img>
                                <p className="text-sm font-semibold">Profile</p>
                            </a>
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
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
                    <div id="adminprofiledropdown" name="guestprofiledropdown" className="absolute right-0 w-60 bg-os-blue-tertiary py-4 px-2 flex flex-col space-y-4 hidden">
                        <div className="flex flex-col space-y-2">
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/bed-svgrepo-com.svg" alt="bed-icon"></img>
                                <p className="text-sm font-semibold">Safe Space</p>
                            </a>
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/star-sharp-svgrepo-com.svg" alt="favorite-icon"></img>
                                <p className="text-sm font-semibold">Favorites</p>
                            </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="border-b-2 border-os-white text-os-white">Account</p>
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/profile-1335-svgrepo-com.svg" alt="profile-icon"></img>
                                <p className="text-sm font-semibold">Profile</p>
                            </a>
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
                                <img className="w-5" src="/gear-1-svgrepo-com.svg" alt="setting-icon"></img>
                                <p className="text-sm font-semibold">Settings</p>
                            </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="border-b-2 border-os-white text-os-white">Admin</p>
                            <a className="flex flex-row items-center hover:bg-os-blue-secondary active:bg-os-blue-secondary rounded-xs space-x-1 px-1 py-1.5 w-[60%]" href="#">
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
            <div className="w-full h-12"> </div>
        </>
    )
};

export default NavbarOS;