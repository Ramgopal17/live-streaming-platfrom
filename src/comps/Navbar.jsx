import { useState } from 'react';
import '../App.css'
import AccountCircle from "@mui/icons-material/AccountCircle";

function Navebar({expandAcMenuState,setexpandAcMenuState}) {

    const expandAcMenu = () => {
        console.log(expandAcMenuState)
        setexpandAcMenuState(!expandAcMenuState)
    
    }

    return (
        <>
        <div className="navbar">
            <div className="navItem navLogo" onClick={(e)=>{window.location.href = "/";}}>
                MyStream
            </div>        

            <div className="navItem" onClick={expandAcMenu}>
                <AccountCircle/>
            </div>
                

        </div>
        {expandAcMenuState &&
        <div id="accountMenu">
            
                <li>Sign in</li>
                <li>About Us</li>
                <li>Help</li>
                <li>Settings</li>
            
        </div>
        }
        
        </>

    )
}

export default Navebar