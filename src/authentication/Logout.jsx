import React, { useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  signOut } from "firebase/auth";
import { Link } from 'react-router-dom';

export default function Logout() {
    const auth = getAuth();
    const [shadow,setShadow] = useState("border-2 shadow-2xl  h-96 w-full mt-20 ml-6 mr-6 lg:ml-72 lg:mr-72 rounded-xl ")

    const LogOut = async() => {

        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });

      }

    const redShadow= () => {
        setShadow("border-2 shadow-2xl shadow-rose-500 h-96 w-full mt-20 ml-6 mr-6 lg:ml-72 lg:mr-72 rounded-xl ")
    }
    const greenShadow= () => {
        setShadow("border-2 shadow-2xl shadow-blue-500 h-96 w-full mt-20 ml-6 mr-6 lg:ml-72 lg:mr-72 rounded-xl ")
    }
    const mouseLeave=()=>{
        setShadow("border-2 shadow-2xl  h-96 w-full mt-20 ml-6 mr-6 lg:ml-72 lg:mr-72 rounded-xl")
    }
  return (
    <div className='flex items-center justify-center'>
        <div className={shadow}>
        <div className='text-3xl md:text-4xl font-bold mt-9 text-center text-gray-600'>
            Log Out
        </div>
        <div className='text-xl md:text-2xl  mt-6 font-bold  text-center text-gray-600'>
            Are You Sure? Do you want to log out ?
        </div>
        <div className='space-x-6 text-center mt-20'>
            <Link onMouseEnter={greenShadow} onMouseLeave={mouseLeave} className='bg-blue-500 rounded-xl px-6 py-3 text-white hover:bg-blue-400 transition duration-300'>
                No 
            </Link>
            <Link to={'/'} onClick={LogOut} onMouseEnter={redShadow} onMouseLeave={mouseLeave} className='bg-rose-500 rounded-xl px-6 py-3 text-white hover:bg-rose-400 transition duration-300'>
                Yes, I'm sure!
            </Link>

        </div>
        </div>
    </div>
  )
}
