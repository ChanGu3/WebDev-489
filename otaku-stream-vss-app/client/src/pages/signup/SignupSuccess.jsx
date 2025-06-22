import '../../tailwind.css'
import { useEffect } from 'react'
import NavbarOS from '../../components/NavbarOS.jsx'
import FooterOS from '../../components/FooterOS.jsx';

function SignupSuccess()
{
    useEffect(() => {
        document.title = "Sign-Up-Success - OtakuStream";
    }, []);

    return (
        <>
        <NavbarOS />
            <div className="flex flex-col items-center justify-center mt-20 space-y-20">
                <p className="font-bold text-3xl text-[#87CEEB]">Otaku Stream</p>
                <div className="flex flex-col justify-center items-center space-y-6 w-100">
                    <p className="text-center text-[#429ABE] font-bold text-2xl">Account Created Successfully!</p>

                    <div className="flex flex-col items-center space-y-1 w-full">
                        <p className="text-[#F8F8FF] font-semibold text-xl">Join Us As A Premium Member!</p>
                        <p className="w-[65%] text-center text-[#F8F8FF] font-thin text-sm">Watch anime interrupted! ad free!!!</p>
                    </div>

                    <a class="w-full bg-[#87CEEB] hover:bg-[#59CFFF] active:bg-[#429ABE] rounded-sm p-1.5 font-semibold text-center" href="#">Go Premium?</a>
                    <a class="w-full bg-[#87CEEB] hover:bg-[#59CFFF] active:bg-[#429ABE] rounded-sm p-1.5 font-semibold text-center" href="/">Skip</a>
                </div>
            </div>
        <FooterOS />
        </>
    );
}

export default SignupSuccess