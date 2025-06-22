import '../tailwind.css'


function FooterOS()
{
    return (
        <>
        <footer id="footerOS" className="mt-48 min-h-[100vh] flex flex-col justify-end items-center">
            <div className="bg-linear-to-b from-transparent to-[#429bbe5d] w-full h-64 flex flex-col justify-end items-center">
                <div className="flex flex-row space-x-16 mb-20">
                    <div className="flex flex-col space-y-6">
                        <p className="text-sm text-[#F8F8FF]">Navigation</p>
                        <div className="flex flex-col space-y-2">
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/">Go Home</a>
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="#">Categories</a>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <p className="text-sm text-[#F8F8FF] hover:text-[#429ABE] visited:text-purple-600">Socials</p>
                        <div className="flex flex-col space-y-2">
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/">Twitter</a>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <p className="text-sm text-[#F8F8FF]">OtakuStream</p>
                        <div className="flex flex-col space-y-2">
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/">About Us</a>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <p className="text-sm text-[#F8F8FF]">General</p>
                        <div className="flex flex-col space-y-2">
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/">Support</a>
                        </div>
                    </div>
                    {/* --- Guest Account --- */}
                    <div className="flex flex-col space-y-6">
                        <p className="text-sm text-[#F8F8FF]">Account</p>
                        <div className="flex flex-col space-y-2">
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/auth/signin">Sign In</a>
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/auth/signup">Sign Up</a>
                        </div>
                    </div>

                    {/* --- Member Account --- */}
                    <div className="flex flex-col space-y-6 hidden">
                        <p className="text-sm text-[#F8F8FF]">Account</p>
                        <div className="flex flex-col space-y-2">
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/auth/signin">Safe Space</a>
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/auth/signup">Favorites</a>
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/auth/signup">Profile</a>
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/auth/signup">Settings</a>
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/auth/signup">Sign Out</a>
                        </div>
                    </div>

                    {/* --- Admin Account --- */}
                    <div className="flex flex-col space-y-6 hidden">
                        <p className="text-sm text-[#F8F8FF]">Admin</p>
                        <div className="flex flex-col space-y-2">
                            <a className="text-xs text-[#777777] hover:text-[#429ABE] visited:text-purple-600" href="/auth/signin">Dashboard</a>
                        </div>
                    </div>

                </div>
                <div className="p-2 w-full flex flex-col items-center">
                    <div className="w-[95%] border-t-1 border-[#F8F8FF]">
                        <p className="p-1 mt-2 font-semibold text-md text-[#F8F8FF]">© OtakuStream</p>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default FooterOS