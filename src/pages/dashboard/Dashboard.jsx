
import { auth } from "../../firebase/config";
import { useNavigate } from 'react-router-dom';

import LevelUpIcon from "../../assets/iconWhite.png"
import React from "react";
import {  useEffect, useState } from "react";
import {signOut} from "firebase/auth"
import { Spinner } from "@material-tailwind/react";
import { signInWithEmailAndPassword,  onAuthStateChanged,} from "firebase/auth";
import {AiOutlineSetting,AiOutlineLogout} from "react-icons/ai"
import {collection,addDoc,doc,query, where, getDocs} from "firebase/firestore"
import Statistics from "./Statistics";
import MyCourses from "./MyCourses";
import Settings from "./Settings";

import Ranking from "./Ranking";

export default function Dashboard() {
  const navigate = useNavigate();

  if (!auth.currentUser) {
    navigate('/login')
  }else{
    console.log(auth.currentUser);
  }



  const [isLoading, setIsLoading] = useState(false);
 
  const [openSec,SetOpenSec]=useState("dashboard")


  const [open, setOpen] = React.useState(0);
  
  const [sidebar, SetSidebar] = useState();
  const [userMenu,SetUserMenu]=useState(false)



  const SectionManager=()=>{
    if (openSec=='dashboard') {
        return(<Statistics user_id={auth?.currentUser?.uid} />)
    }else if(openSec=='mycourses'){
            return (<MyCourses user_id={auth?.currentUser?.uid} />)
    }else if(openSec=='ranking'){
      return (<Ranking user_id={auth?.currentUser?.uid} />)
    }else if(openSec=='settings'){
      return (<Settings user_id={auth?.currentUser?.uid} />)
    } else{
        return(<div><Statistics/></div>)
    }
}

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const CheckScreen=()=>{
    window.innerWidth >= 640 && SetSidebar(true);
    window.innerWidth <= 641 && SetSidebar(false);
}
  useEffect(() => {
  
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 640 && SetSidebar(true) ,
          );
          window.addEventListener(
              "resize",
              () => window.innerWidth <= 641 && SetSidebar(false),
            );
        
        CheckScreen();
  }, []);


 
  const OpenCloseSideBar=()=>{
        if (sidebar) {
            SetSidebar(false);SetUserMenu(false)
            
        }else{
            SetSidebar(true);SetUserMenu(false)
        }
  }

  const OpenCloseUserMenu = () =>{
    if (userMenu) {
        SetUserMenu(false)
    } else {
        SetUserMenu(true)

    }

  }
  
   
  return (
    <div>


<div>
            
            {isLoading?(
             <div><Spinner className="h-16 mx-auto my-auto h-screen w-16 text-white/50" />;</div>
            ):(
             <div>
 
     
                                 
                 
 
                 <nav className=" fixed top-30 z-10 w-full bg-gray-800 text-white border-b border-gray-200 ">
                 <div className="px-3 py-3 lg:px-5 lg:pl-3">
                     <div className="flex items-center justify-between">
                     <div className="flex items-center justify-start rtl:justify-end">
                         <button onClick={OpenCloseSideBar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 ">
                             <span className="sr-only">Open sidebar</span>
                             <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                             </svg>
                         </button>
                        
                     </div>
                     <div className="flex items-center">
                         <div className="">
                             <div>
                             <button type="button" onClick={OpenCloseUserMenu} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                 <span className="sr-only">Open user menu</span>
                                 <img className="w-8 h-8 rounded-full" src="https://imgs.search.brave.com/bFF8_xQy_-cBA55VIKAy68h8rgyZDOyvB5FXxL1xR5g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY1LzEwLzQ3/LzM2MF9GXzY1MTA0/NzE4X3gxN2E3Nnd6/V0tJbTNCbGhBNnV5/WVZrRHM5OTgyYzZx/LmpwZw" alt="user photo"/>
                             </button>
                             </div>
                             <div className={userMenu?("z-50 absolute right-6  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"):("z-50 absolute hidden right-6  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600")} id="dropdown-user">
                             <div className="px-4 py-3" role="none">
                                 <p className="text-sm text-white dark:text-white" role="none">
                                
                                 </p>
                                 <p className="text-sm font-medium text-white truncate dark:text-gray-300" role="none">
                                 
                                 </p>
                             </div>
                             <ul className="py-1" role="none">
                                 <li>
                                 <a onClick={(()=>{SetOpenSec("settings");SetUserMenu(false)})} href="#" className="block flex px-4 py-2 text-sm text-gray-700  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white gap-4 " role="menuitem"><AiOutlineSetting className="my-auto"/>Settings</a>
                                 </li>
                                 <li>
                                 <button   className="block flex px-4 py-2 text-sm text-gray-700 w-full dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white gap-4 " role="menuitem"><AiOutlineLogout className="my-auto"/>Log out</button>
 
                                 </li>
                                 
                             </ul>
                             </div>
                         </div>
                         </div>
                     </div>
                 </div>
                 </nav>
 
                 <aside id="logo-sidebar" className={sidebar?(" fixed top-30 left-0 z-10  w-64 h-screen pt-20 transition-transform  bg-gray-800 text-white  translate-x-0 "):("fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-800 text-white ")} aria-label="Sidebar">
                 <div className="h-full text-white px-3 pb-4 overflow-y-auto bg-gray-800  dark:bg-gray-800 ">
                     <ul className="space-y-2 font-medium">
                         <li onClick={(()=>{SetOpenSec("dashboard");SetUserMenu(false)})} className="mt-6">
                             <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  dark:hover:bg-blue-900 dark:hover:text-white group">
                             <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                 <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                 <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                             </svg>
                             <div className="ms-3">Dashboard <span className="bg-blue-500 text-white animate-pulse ml-3 p-1 rounded-xl">Soon</span></div>
                             </a>
                         </li>
                         <li>
                         <hr className="mb-16" />
 
                         </li>
                         <li  onClick={(()=>{SetOpenSec("mycourses");SetUserMenu(false)})}>
                             <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  dark:hover:bg-blue-900 dark:hover:text-white group">
                             <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                 <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                             </svg>
                             <div onClick={(()=>{SetOpenSec("mycourses")})} className="flex-1 ms-3 whitespace-nowrap">My Courses</div>
                             </a>
                         </li>
                         
                         <li onClick={(()=>{SetOpenSec("ranking");SetUserMenu(false)})}>
                             <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  dark:hover:bg-blue-900 dark:hover:text-white group">
                             <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                 <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                             </svg>
                             <div className="flex-1 ms-3 whitespace-nowrap">Ranking <span className="bg-blue-500 text-white animate-pulse ml-3 p-1 rounded-xl">Soon</span></div>
                             </a>
                         </li>
                         <li>
                         <hr className="mb-16" />
                         </li>
                         <li>
                             <a onClick={(()=>{SetOpenSec("settings");SetUserMenu(false)})} href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  dark:hover:bg-blue-900 dark:hover:text-white group">
                                 <AiOutlineSetting className="my-auto"/>
                             <div className="flex-1 ms-3 whitespace-nowrap">Settings</div>
                             </a>
                         </li>
                         <li onClick={(()=>{navigate('/logout')})} >
                             <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  dark:hover:bg-blue-900 dark:hover:text-white group">
                             <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                             </svg>
                             <div className="flex-1 ms-3 whitespace-nowrap">Log Out</div>
                             </a>
                         </li>
                     </ul>
                 </div>
                 </aside>
 
                 <div className="p-4 sm:ml-64">
                 <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
                 {SectionManager()}
                 </div>
                 </div>
 
 
 
 
 
 
 
             </div>
            )}
 
 
              
                     
               
 
 
         </div>
         


    </div>
  )
}
