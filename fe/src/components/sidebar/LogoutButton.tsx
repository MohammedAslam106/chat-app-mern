import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

interface LogoutButtonProps{
    
}

export default function LogoutButton({}:LogoutButtonProps ){
    const {loading,logout} = useLogout()
    return(
        <div className=' mt-auto'>
            {!loading ?
                <BiLogOut onClick={logout} className=" w-6 h-6 cursor-pointer text-white"/>
                : 
                <span className=" loading loading-spinner">
                    
                </span>
            }
        </div>
    )
}