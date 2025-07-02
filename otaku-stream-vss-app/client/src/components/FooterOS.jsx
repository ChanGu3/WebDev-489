import '../tailwind.css'

function LinksTitle({titleName})
{
    return (
        <p className="text-[8px]  md:text-sm text-os-white">{titleName}</p>
    )
}

function Link({linkName, href})
{
    return (
        <a className="text-[6px] md:text-xs text-os-dark-secondary hover:text-os-blue-tertiary active:text-os-blue-tertiary visited:text-os-visited-purple" href={href}>{linkName}</a>
    )
}

function LinkTab({titleName, links})
{
    return (
        <div className="flex flex-col space-y-3 md:space-y-6">
            <LinksTitle titleName={titleName}/>
            <div className="flex flex-col space-y-1 md:space-y-2">
                { links.map((link) => { return ( <Link key={link.id} linkName={link.name} href={link.href} /> ) }  ) }
             </div>
        </div>
    )
}

function FooterOS()
{
    return (
        <>
        <footer id="footerOS" className="mt-12 md:mt-36 flex flex-col justify-end items-center">
            <div className="bg-linear-to-b from-transparent to-os-blue-tertiary/40 w-full flex flex-col justify-end items-center">
                <div className="flex flex-row space-x-2 md:space-x-16 mb-16 md:mb-18">
                    <LinkTab titleName="Navigation" links={[{id: 1, name: "Go Home", href:"/"}, {id: 2, name: "Genres", href:"/discover/genres"}, {id: 3, name: "Other", href:"/discover/other"}]} />
                    <LinkTab titleName="Socials" links={[{id: 1, name: "Twitter", href:"#"}]} />
                    <LinkTab titleName="OtakuStream" links={[{id: 1, name: "About Us", href:"#"}]} />
                    <LinkTab titleName="General" links={[{id: 1, name: "Support", href:"#"}]} />
                    <LinkTab titleName="Socials" links={[{id: 1, name: "Twitter", href:"#"}]} />

                    {/* --- Guest Account --- */}
                    <LinkTab titleName="Account" links={[{id: 1, name: "Sign In", href:"/auth/signin"}, {id: 2, name: "Sign Up", href:"/auth/signup"}]} />

                    {/* --- Member Account --- */}
                    <div className="hidden">
                        <LinkTab titleName="Account" links={[
                            {id: 1, name: "Safe Space", href:"#"}, 
                            {id: 2, name: "Favorites", href:"#"},
                            {id: 3, name: "Profile", href:"#"},
                            {id: 4, name: "Settings", href:"#"},
                            {id: 5, name: "Sign Out", href:"/auth/signout"},
                        ]}/>
                    </div>

                    {/* --- Admin Account --- */}
                    <div className="hidden">
                        <LinkTab titleName="Admin" links={[
                            {id: 1, name: "Dashboard", href:"#"},
                        ]}/>
                    </div>

                </div>
                <div className="p-2 w-full flex flex-col items-center">
                    <div className="w-[95%] border-t-1 border-os-white">
                        <p className="p-1 mt-2 font-semibold text-xs md:text-md text-os-white">© OtakuStream</p>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default FooterOS