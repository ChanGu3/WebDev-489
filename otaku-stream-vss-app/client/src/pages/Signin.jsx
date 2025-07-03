import '../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../components/NavbarOS.jsx'
import FooterOS from '../components/FooterOS.jsx';

function ValidateSignin()
{
    document.getElementById("error").classList.remove('hidden');
}

function Signin()
{
    useEffect(() => {
        document.title = "SignIn - OtakuStream";
    }, []);

    return (
        <>
        <NavbarOS />
            <main className="flex flex-col items-center justify-center mt-20 space-y-20">
                <p className="font-bold text-3xl text-os-blue-primary">Otaku Stream</p>
                <div className="flex flex-col justify-center items-center space-y-6 w-65 md:w-100">
                    <div className="flex flex-col items-center space-y-1 w-full">
                        <p className="text-os-white font-semibold text-xl">Sign In</p>
                        <p className="md:w-[55%] text-center text-os-white font-thin text-sm">Enter Your email and password to access your account!</p>
                    </div>
                    <form id="signinForm" name="signinForm" className="w-full flex flex-col space-y-4 items-center justify-center"  onSubmit={(e) =>  { e.preventDefault(); ValidateSignin();}} method="post">
                        <input id="email" name="email" className="w-full border-os-blue-secondary border-2 rounded-sm px-2 py-1 text-os-white placeholder:text-os-white/80  placeholder:font-thin" type="text" placeholder="Email"/>
                        <input id="password" name="password" className="w-full border-os-blue-secondary border-2 rounded-sm px-2 py-1 text-os-white placeholder:text-os-white/80  placeholder:font-thin" type="password" placeholder="Password"/>
                        <button className="w-full bg-os-blue-primary hover:bg-os-blue-secondary active:bg-os-blue-tertiary rounded-sm p-1.5 font-semibold cursor-pointer" type="submit">Sign In</button>
                    </form>

                    {/* Error Catching Placement */}
                    <p id="error" className="text-os-error-hot-pink font-semibold text-sm hidden">Error - Not Implemented</p>


                    <div className="flex flex-row w-full items-center justify-center">
                        <div className="w-[10%] mt-0.5 border-b-1 border-os-white"></div>
                            <p className="px-2 text-os-dark-secondary text-[10px] md:text-xs">don't have an account or need help?</p>
                        <div className="w-[10%] mt-0.5 border-b-1 border-os-white"></div>
                    </div>
                    <a className="text-os-blue-tertiary hover:text-os-blue-secondary active:text-os-blue-secondary text-sm" href="#">Forgot Password?</a>
                    <a className="text-os-blue-tertiary hover:text-os-blue-secondary active:text-os-blue-secondary text-sm" href="/auth/signup">Sign Up?</a>
                </div>
            </main>
        <FooterOS />
        </>
    );
}

export default Signin