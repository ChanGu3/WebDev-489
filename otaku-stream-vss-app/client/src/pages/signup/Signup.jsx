import '../../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../../components/NavbarOS.jsx'
import FooterOS from '../../components/FooterOS.jsx';

function ValidateSignup()
{
    document.getElementById("error").classList.remove('hidden');
}

function Signup()
{
    useEffect(() => {
        document.title = "SignIn - OtakuStream";
    }, []);

    return (
        <>
        <NavbarOS />
            <div className="flex flex-col items-center justify-center mt-20 space-y-20">
                <p className="font-bold text-3xl text-os-blue-primary">Otaku Stream</p>
                <div className="flex flex-col justify-center items-center space-y-6 w-65 md:w-100">
                    <div className="flex flex-col items-center space-y-1 w-full">
                        <p className="text-os-white font-semibold text-xl">Create An Account</p>
                        <p className="md:w-[65%] text-center text-os-white font-thin text-sm">Enter your email and create a password by typing it in twice to sign up as a Otaku Stream Member!</p>
                    </div>
                    <form id="signinForm" name="signinForm" className="w-full flex flex-col space-y-4 items-center justify-center"  onSubmit={(e) =>  { e.preventDefault(); ValidateSignup();}} method="post">
                        <input id="email" name="password" className="w-full border-os-blue-tertiary border-2 rounded-sm px-2 py-1 text-os-white placeholder:text-os-white/80  placeholder:font-thin" type="text" placeholder="Email"/>
                        <input id="password" name="password" className="w-full border-os-blue-tertiary border-2 rounded-sm px-2 py-1 text-os-white placeholder:text-os-white/80 placeholder:font-thin" type="password" placeholder="Password"/>
                        <input id="passwordagain" name="passwordagain" className="w-full border-os-blue-tertiary border-2 rounded-sm px-2 py-1 text-os-white placeholder:text-os-white/80  placeholder:font-thin" type="password" placeholder="Password Again"/>
                        <button className="w-full bg-os-blue-primary hover:bg-os-blue-tertiary active:bg-os-blue-secondary rounded-sm p-1.5 font-semibold cursor-pointer" type="submit">Sign Up</button>
                    </form>

                    {/* Error Catching Placement */}
                    <p id="error" className="text-os-error-hot-pink font-semibold text-sm hidden">Error - Not Implemented</p>


                    <div className="flex flex-row w-full items-center justify-center">
                        <div className="w-[10%] mt-0.5 border-b-1 border-os-white"></div>
                            <p className="px-2 text-os-dark-secondary text-xs">already have an account?</p>
                        <div className="w-[10%] mt-0.5 border-b-1 border-os-white"></div>
                    </div>
                    <a className="text-os-blue-secondary hover:text-os-blue-tertiary active:text-os-blue-tertiary text-sm" href="/auth/signin">Sign In?</a>
                    <p className="md:w-[70%] text-xs text-center text-os-white " href="/auth/signin">By clicking Sign up, you agree to our <a className="text-os-dark-secondary hover:underline cursor-pointer" href="#">Terms of Service</a> and <a className="text-os-dark-secondary hover:underline cursor-pointer" href="#">Privacy Policy</a></p>
                </div>
            </div>
        <FooterOS />
        </>
    );
}

export default Signup