import '../tailwind.css'

function LinksTitle({titleName})
{
    return (
        <p className="text-[8px]  md:text-sm text-[#F8F8FF]">{titleName}</p>
    )
}

function Link({linkName, href})
{
    return (
        <a className="text-[6px] md:text-xs text-[#777777] hover:text-[#429ABE] active:text-[#429ABE] visited:text-purple-600" href={href}>{linkName}</a>
    )
}

function LinkTab({titleName, links})
{
    return (
        <div className="flex flex-col space-y-3 md:space-y-6">
            <LinksTitle titleName={titleName}/>
            <div className="flex flex-col space-y-1 md:space-y-2">
                { links.map((link) => { return ( <Link linkName={link.name} href={link.href} /> ) }  ) }
             </div>
        </div>
    )
}

function FooterOS()
{
    return (
        <>
        <footer id="footerOS" className="mt-36 md:mt-48 min-h-[100vh] flex flex-col justify-end items-center">
            <div className="bg-linear-to-b from-transparent to-[#429bbe5d] w-full h-64 flex flex-col justify-end items-center">
                <div className="flex flex-row space-x-2 md:space-x-16 mb-16 md:mb-18">
                    <LinkTab titleName="Navigation" links={[{name: "Go Home", href:"/"}, {name: "Categories", href:"#"}]} />
                    <LinkTab titleName="Socials" links={[{name: "Twitter", href:"#"}]} />
                    <LinkTab titleName="OtakuStream" links={[{name: "About Us", href:"#"}]} />
                    <LinkTab titleName="General" links={[{name: "Support", href:"#"}]} />
                    <LinkTab titleName="Socials" links={[{name: "Twitter", href:"#"}]} />

                    {/* --- Guest Account --- */}
                    <LinkTab titleName="Account" links={[{name: "Sign In", href:"/auth/signin"}, {name: "Sign Up", href:"/auth/signup"}]} />

                    {/* --- Member Account --- */}
                    <div className="hidden">
                        <LinkTab titleName="Account" links={[
                            {name: "Safe Space", href:"#"}, 
                            {name: "Favorites", href:"#"},
                            {name: "Profile", href:"#"},
                            {name: "Settings", href:"#"},
                            {name: "Sign Out", href:"/auth/signout"},
                        ]}/>
                    </div>

                    {/* --- Admin Account --- */}
                    <div className="hidden">
                        <LinkTab titleName="Admin" links={[
                            {name: "Dashboard", href:"#"},
                        ]}/>
                    </div>

                </div>
                <div className="p-2 w-full flex flex-col items-center">
                    <div className="w-[95%] border-t-1 border-[#F8F8FF]">
                        <p className="p-1 mt-2 font-semibold text-xs md:text-md text-[#F8F8FF]">© OtakuStream</p>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default FooterOS