import { useState } from "react";
import {Bars3Icon,} from "@heroicons/react/24/outline";
import { auth } from "../firebase/config";
import LevelUpIcon from "../assets/icon.png"
import { useEffect } from "react";
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import { Link,BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSeatchInput, setToggleSeatchInput]=useState('')

  const [user, setUser] = useState(null);
  const auth = getAuth();
  
  const [pathName, setPathName] = useState('')







  console.log(pathName);
  
  function checkWindowWith(){
    if(window.innerWidth<=726){
      setToggleSeatchInput('hidden')
    }else(
      setToggleSeatchInput('w-full')
      )
    }
    useEffect(() => {
    setPathName(window.location.pathname)
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    
    checkWindowWith()
    return () => unsubscribe();
  }, []);
  const LogOut = async() => {

    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  // const location = useLocation();
  // useEffect(() => {
  //   console.log(location);
  // }, [location.pathname]);
  


  



  
  console.log(user);
  return (
   <></>
  );
}

export default Navbar;