import { AppBar, Toolbar } from "@mui/material"
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
    const auth = useAuth();
    
    return <AppBar sx={{bgcolor:"transparent", position: "static", boxShadow: "none"}}>
        <Toolbar sx={{display:"flex"}}>
            <Logo />
            <div>
                {auth?.isLoggedIn ? (
                    <>
                      <NavigationLink bg="#ffffff" to="/chat" text="Go to Chat" textColor="#117ed6"/>
                      <NavigationLink bg="#ffffff" to="/" text="Logout" textColor="#117ed6" onClick={auth.logout}/>
                    </>
                ) : (<>
                       <NavigationLink bg="#ffffff" to="/login" text="Login" textColor="#117ed6"/>
                       <NavigationLink bg="#ffffff" to="/signup" text="SignUp" textColor="#117ed6" />
                    </>)}

            </div>
        </Toolbar>
    </AppBar>;
};

export default Header;