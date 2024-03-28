import React from "react";

import { BrowserRouter,Link, redirect } from "react-router-dom";
import { useEffect,useState } from "react";
import Pages from "./pages/Pages";

import Check from "./authentication/Check";

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {  signOut } from "firebase/auth";
import {Bars3Icon,} from "@heroicons/react/24/outline";

import LevelUpIcon from "./assets/iconBlack.png"


import Navbar from "./components/Navbar";



function App() {

  /////////////////////////////////////////////  Use this functio to clear console  messages //////////////////////////////////////////////////////////
  // console.clear();




  const [result, setResult] = React.useState(false);


  const [user, setUser] = useState(null);
  const auth = getAuth();


  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSeatchInput, setToggleSeatchInput]=useState('')

  
  const [pathName, setPathName] = useState('')
  const [mode, setMode] = useState("auto");








  
  function checkWindowWith(){
    if(window.innerWidth<=726){
      setToggleSeatchInput('hidden')
    }else(
      setToggleSeatchInput('w-full')
      )
    }
    useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    
    checkWindowWith()
    return () => unsubscribe();
  }, []);
 


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);


  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY>50) {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShow(false); 
      } else { // if scroll up show the navbar
        setShow(true);  
      }
    }else{
      setShow(false)
    }
    

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    // cleanup function
    return () => {
       window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);




  return (
    <div >
<BrowserRouter>

      
      <nav className={`border-b-[5px] border-xl border-blue-500  bg-white z-50 sticky  top-0 ${show && 'hidden'}`} >
        <div className=" mx-auto">
          <div className="flex mx-auto justify-between w-5/6 ">
            {/* Primary menu and logo */}
            <div className="flex items-center gap-16 my-6">
              {/* logo */}
              <div>
                <a
                  href="/"
                  className="flex gap-1 text-2xl font-bold text-blue-500 items-center "
                >
                  <img src={LevelUpIcon} className="md:h-16 text-primary" />
                  {/* <span>LEVEL UP</span> */}
                </a>
              </div>
              {/* primary */}
              <div className="hidden lg:flex gap-8 xl:ml-52 ">
              <form className={toggleSeatchInput}>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                    <div className="relative w-96">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block  w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Courses, Videos . . ." required />
                        
                    </div>
                </form>
              </div>
            </div>
            {/* secondary */}
            <div className="flex gap-6">
              <div className=" flex items-center justify-center gap-10">
                <div>
                  <div className="">
                    
                  

                  </div>
                </div>
              </div>
              <div className=" flex items-center justify-center gap-10">
                <div>
                
                  {user?(
                      <Link to={'/dashboard'}  className="rounded-xl border-solid border-2  border-blue-300 py-2 px-4 hover:bg-blue-700 hover:text-gray-100 transition duration-500">
                      Dashboard
                    </Link>
                    ):(
                      <div className="space-x-4">
                      <Link to={'/login'} className='bg-blue-500 rounded-xl px-6 py-3 text-white hover:bg-blue-400 transition duration-300'>Login</Link>
                      <Link to={'/register'} className='bg-purple-500 rounded-xl px-6 py-3 text-white hover:bg-purple-400 transition duration-300'>Register</Link>
                      </div>
                    )}
                </div>
              </div>
              {/* Mobile navigation toggle */}
              <div className=" flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col  gap-12  origin-top duration-700 ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 font-bold tracking-wider mt-6">
              
              


                      <Link onClick={() => setToggleMenu(!toggleMenu)} className={window.location.pathname=='/'?("border-l-4 border-blue-600 hover:text-xl transition-all hover:text-blue-500"):(" border-blue-600 hover:text-xl transition-all hover:text-blue-500")} to={'/'}>Main</Link>
                      <Link onClick={() => setToggleMenu(!toggleMenu)} className={window.location.pathname=='/about'?("border-l-4 border-blue-600 hover:text-xl transition-all hover:text-blue-500"):(" border-blue-600 hover:text-xl transition-all hover:text-blue-500")} to={'/about'}>About</Link>
                      <Link onClick={() => setToggleMenu(!toggleMenu)} className={window.location.pathname=='/courses'?("border-l-4 border-blue-600 hover:text-xl transition-all hover:text-blue-500"):(" border-blue-600 hover:text-xl transition-all hover:text-blue-500")} to={'/courses'}>Courses</Link>
                      <Link onClick={() => setToggleMenu(!toggleMenu)} className={window.location.pathname=='/sponsors'?("border-l-4 border-blue-600 hover:text-xl transition-all hover:text-blue-500"):(" border-blue-600 hover:text-xl transition-all hover:text-blue-500")} to={'/sponsors'}>Sponsors</Link>
                      <Link onClick={() => setToggleMenu(!toggleMenu)} className={window.location.pathname=='/members' ?("border-l-4 border-blue-600 hover:text-xl transition-all hover:text-blue-500"):(" border-blue-600 hover:text-xl transition-all hover:text-blue-500")} to={'/members'}>Team Members</Link>
                      <Link onClick={() => setToggleMenu(!toggleMenu)} className={window.location.pathname=='/ideas'?("border-l-4 border-blue-600 hover:text-xl transition-all hover:text-blue-500"):(" border-blue-600 hover:text-xl transition-all hover:text-blue-500")} to={'/ideas'}>Your Ideas !</Link>
                      <Link onClick={() => setToggleMenu(!toggleMenu)} className={window.location.pathname=='/contact'?("border-l-4 border-blue-600 hover:text-xl transition-all hover:text-blue-500"):(" border-blue-600 hover:text-xl transition-all hover:text-blue-500")}  to={'/contact'}>Contact</Link>
                      
                      {user?(
                        <Link onClick={() => setToggleMenu(!toggleMenu)} className={window.location.pathname=='/logout'?("border-l-4 border-blue-600 hover:text-xl transition-all hover:text-blue-500"):(" border-blue-600 hover:text-xl transition-all hover:text-blue-500")} to={'/logout'}>Log Out</Link>
                    ):(
                      <div className="space-x-4">
                     
                      </div>
                    )}

            </div>
          </div>
        </div>
      </nav>
             
            

            <Pages/>





            <div className="">
            <footer id="footer" className="relative z-10 dark:bg-gray-900 ">
                <div className=" border-t border-b border-gray-200 dark:border-gray-700 py-16 bg-blue-600 text-white">
                    <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
                        <div className="lg:flex">
                            <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li>
                                            <Link href="#">
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand font-bold dark:text-gray-50">USEFUL LINKS</span>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to={'/'}>
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">Home</span>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to={'/about'}>
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">About</span>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to={'/sponsors'}>
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">Sponsors</span>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to={'/members'}>
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">Team Members</span>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to={'/ideas'}>
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">New Ideas !</span>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to={'/contact'}>
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">Contact Us</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li>
                                            <Link href="#">
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand font-bold  dark:text-gray-50">Popular Courses</span>
                                            </Link>
                                        </li>

                                        <li className="mt-6">
                                            <Link href="#">
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">Law</span>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link href="#">
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">Computer Science</span>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link href="#">
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">History</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 flex">
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li>
                                            <Link href="#" className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">
                                                Privacy policy
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link href="#">
                                                <span className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand  dark:text-gray-50">Terms of service</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                                    <div className="flex items-center mb-6">
                                        <a href="#">
                                            <div className=" dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand ">
                                                <svg className="footer-icon feather feather-github" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <div className="pl-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                                              <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M25,3c-12.13844,0 -22,9.86156 -22,22c0,11.01913 8.12753,20.13835 18.71289,21.72852l1.14844,0.17383v-17.33594h-5.19727v-3.51953h5.19727v-4.67383c0,-2.87808 0.69065,-4.77363 1.83398,-5.96289c1.14334,-1.18926 2.83269,-1.78906 5.18359,-1.78906c1.87981,0 2.61112,0.1139 3.30664,0.19922v2.88086h-2.44727c-1.38858,0 -2.52783,0.77473 -3.11914,1.80664c-0.59131,1.03191 -0.77539,2.264 -0.77539,3.51953v4.01758h6.12305l-0.54492,3.51953h-5.57812v17.36523l1.13477,-0.1543c10.73582,-1.45602 19.02148,-10.64855 19.02148,-21.77539c0,-12.13844 -9.86156,-22 -22,-22zM25,5c11.05756,0 20,8.94244 20,20c0,9.72979 -6.9642,17.7318 -16.15625,19.5332v-12.96875h5.29297l1.16211,-7.51953h-6.45508v-2.01758c0,-1.03747 0.18982,-1.96705 0.50977,-2.52539c0.31994,-0.55834 0.62835,-0.80078 1.38477,-0.80078h4.44727v-6.69141l-0.86719,-0.11719c-0.59979,-0.08116 -1.96916,-0.27148 -4.43945,-0.27148c-2.7031,0 -5.02334,0.73635 -6.625,2.40234c-1.60166,1.66599 -2.39258,4.14669 -2.39258,7.34961v2.67383h-5.19727v7.51953h5.19727v12.9043c-9.04433,-1.91589 -15.86133,-9.84626 -15.86133,-19.4707c0,-11.05756 8.94244,-20 20,-20z"></path></g></g>
                                            </svg>
                                            </div>
                                        </a>
                                        <a href="#" className="ml-3 mt-1">
                                          <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 64 64">
                                          <path fill="#FFFFFF" d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 44.15 19.85 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 41.941 41.941 50 32 50 C 22.059 50 14 41.941 14 32 C 14 22.059 22.059 14 32 14 z M 41.041016 23.337891 C 40.533078 23.279297 39.894891 23.418531 39.181641 23.675781 C 37.878641 24.145781 21.223719 31.217953 20.261719 31.626953 C 19.350719 32.014953 18.487328 32.437828 18.486328 33.048828 C 18.486328 33.478828 18.741312 33.721656 19.445312 33.972656 C 20.177313 34.234656 22.023281 34.79275 23.113281 35.09375 C 24.163281 35.38275 25.357344 35.130844 26.027344 34.714844 C 26.736344 34.273844 34.928625 28.7925 35.515625 28.3125 C 36.102625 27.8325 36.571797 28.448688 36.091797 28.929688 C 35.611797 29.410688 29.988094 34.865094 29.246094 35.621094 C 28.346094 36.539094 28.985844 37.490094 29.589844 37.871094 C 30.278844 38.306094 35.239328 41.632016 35.986328 42.166016 C 36.733328 42.700016 37.489594 42.941406 38.183594 42.941406 C 38.877594 42.941406 39.242891 42.026797 39.587891 40.966797 C 39.992891 39.725797 41.890047 27.352062 42.123047 24.914062 C 42.194047 24.175062 41.960906 23.683844 41.503906 23.464844 C 41.365656 23.398594 41.210328 23.357422 41.041016 23.337891 z"></path>
                                          </svg>
                                        </a>
                                        <a href="#" className="ml-3 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                        <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                                        </svg>
                                        </a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="py-16 flex flex-col justify-center items-center">
                    <Link href="javascript:void(0)">
                        <a>
                            <img src={LevelUpIcon} alt="" />
                        </a>
                    </Link>
                    <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">2024 Level Up. All Rights Reserved.</p>
                </div> */}
            </footer>
        </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
