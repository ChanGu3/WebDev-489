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
            <div className="flex flex-col items-center justify-center mt-20 space-y-20">
                <p className="font-bold text-3xl text-[#87CEEB]">Otaku Stream</p>
                <div className="flex flex-col justify-center items-center space-y-6 w-65 md:w-100">
                    <div className="flex flex-col items-center space-y-1 w-full">
                        <p className="text-[#F8F8FF] font-semibold text-xl">Sign In</p>
                        <p className="md:w-[55%] text-center text-[#F8F8FF] font-thin text-sm">Enter Your email and password to access your account!</p>
                    </div>
                    <form id="signinForm" name="signinForm" className="w-full flex flex-col space-y-4 items-center justify-center"  onSubmit={(e) =>  { e.preventDefault(); ValidateSignin();}} method="post">
                        <input id="email" name="password" class="w-full border-[#59CFFF] border-2 rounded-sm px-2 py-1 text-[#F8F8FF] placeholder:text-[#F8F8FF] placeholder:font-thin" type="text" placeholder="Email"/>
                        <input id="password" name="password" class="w-full border-[#59CFFF] border-2 rounded-sm px-2 py-1 text-[#F8F8FF] placeholder:text-[#F8F8FF] placeholder:font-thin" type="password" placeholder="Password"/>
                        <button class="w-full bg-[#87CEEB] hover:bg-[#59CFFF] active:bg-[#429ABE] rounded-sm p-1.5 font-semibold cursor-pointer" type="submit">Sign In</button>
                    </form>

                    {/* Error Catching Placement */}
                    <p id="error" className="text-pink-700 font-semibold text-sm hidden">Error - Not Implemented</p>


                    <div className="flex flex-row w-full items-center justify-center">
                        <div className="w-[10%] mt-0.5 border-b-1 border-[#a3a3a3]"></div>
                            <p className="px-2 text-[#777777] text-[10px] md:text-xs">don't have an account or need help?</p>
                        <div className="w-[10%] mt-0.5 border-b-1 border-[#a3a3a3]"></div>
                    </div>
                    <a className="text-[#429ABE] hover:text-[#59CFFF] text-sm" href="#">Forgot Password?</a>
                    <a className="text-[#429ABE] hover:text-[#59CFFF] text-sm" href="/auth/signup">Sign Up?</a>
                </div>
            </div>
        <FooterOS />
        </>
    );
}

export default Signin