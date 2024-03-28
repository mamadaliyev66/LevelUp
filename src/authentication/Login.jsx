import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/config';
import { doc,getDoc ,onSnapshot} from 'firebase/firestore';
import { db ,firestore} from "../firebase/config";
import { collection, addDoc } from "firebase/firestore"; 
import { query,where,getCountFromServer } from 'firebase/firestore';
import {firebase} from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { getAdditionalUserInfo } from 'firebase/auth';
export default function Login() {
  const navigate = useNavigate();
console.clear()
  const [nwPlatfroms,setNwPlatfroms] = useState(false)

  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [loading,setLoading] = useState(false)
  const [validateEmail,setValidateEmail] = useState('')
  const [isValidLogin,setIsValidLogin] = useState('')
  const nwpClick=()=>{
    setNwPlatfroms(true)
    // setInterval(() => {
      
    // }, 4000);

   
  } 
  if (nwPlatfroms) {
    setTimeout(() => {
      setNwPlatfroms(false)
    }, 5000);
  
  }


  if (auth.currentUser) {
    if (auth.currentUser.email) {
      
      navigate('/dashboard');
    }

  }else{

  }

 
  function getEmailFromInput(email) {
    
    const validation=email.target.value.includes('@')
    
      if (validation) {
        setValidateEmail('')
        setEmail(email.target.value)

      }else{
        setValidateEmail('Please enter a valid email !')
      }
      
    
  }

const SignInWithEmail = async ()=>{
  try {
    setLoading(true)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // setIsValidLogin(errorCode, errorMessage)
        console.log(errorCode);
        if (errorCode=="auth/missing-password") {
          setIsValidLogin("Please enter a valid password !")
          
        }else if(errorCode=="auth/missing-email"){
          setIsValidLogin("Please enter a valid email !")
        }else{
          setIsValidLogin('Email or password is incorrect !')
        }



      }).finally(setLoading(false))
  } catch (error) {
    setLoading(false)
  }       


}

const signinwithGoogle = async ()=>{
  
  // const coll = collection(firestore, "users");
  // const q = query(coll, where("email", "==", email));
  // const snapshot = await getCountFromServer(q);
  
  // console.log(snapshot);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        var isNewUser = getAdditionalUserInfo(result, credential).isNewUser;
        const user = result.user;



        if (isNewUser) {
             //delete the created user
             result.user.delete();
             setIsValidLogin("You are not registered. Please register first ! ")
        } else {
             // your sign in flow
             console.log('user ' + user.email + ' does exist!');
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });


//   firebase.auth().signInWithPopup(provider).then(
//     function (result) {
      
//          var token = result.credential.accessToken;
//          var user = result.user;

//          //this is what you need
//          var isNewUser = result.additionalUserInfo.isNewUser;
//          if (isNewUser) {
//               //delete the created user
//               result.user.delete();
//          } else {
//               // your sign in flow
//               console.log('user ' + user.email + ' does exist!');
//          }
//     }).catch(function (error) {
//     // Handle Errors here.

// });


    }




  return (
    <div>


        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
             
             
             
             
                <div id="toast-warning" className={nwPlatfroms?"flex  w-fit ml-auto items-center mt-6 mr-3 transition-all duration-1000 animate-bounce  p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800":"hidden w-fit ml-auto items-center mt-6 mr-3 transition-all duration-1000 animate-bounce  p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"} role="alert">
              <div className="inline-flex items-center animate-ping  justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                  </svg>
                  <span className="sr-only">This Site Is Working On Demo Mode !</span>
              </div>
              <div className="ms-3 text-sm font-bold">This Site Is Working On Demo Mode !</div>
              <div className="ms-3 text-sm font-normal">Please Sign In Using <strong className='font-extrabold'>Google</strong> or  <strong className='font-extrabold'>Email</strong>.</div>
              <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                  <span className="sr-only">Close</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
              </button>
            </div>




            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Or
                    <Link to="/register" className="font-medium pl-2 text-blue-600 hover:text-blue-500">
                        create an account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input id="email" onChange={(e)=>{getEmailFromInput(e)}} name="email" type="email" autoComplete="email" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email address"/>
                                    <h1 className='text-rose-500 pt-2 text-md font-bold'>{validateEmail}</h1>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" onChange={(e)=>{setPassword(e.target.value)}} name="password" type="password" autoComplete="current-password" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your password"/>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            



                            
               {loading?(
                <>
                 
                
              <button type="submit" disabled
                                className="disabled:bg-blue-900 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
<div className="inline-block mx-2  h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
              </div>
                                Signing in
                </button>
              
              </>
               ):(
                <button type="submit"
                onClick={SignInWithEmail}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                                Sign in
                </button>
            
               )}
                 
                        </div>
                    </div>
                    <div className="mt-6">

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-100 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div onClick={nwpClick}>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                        alt=""/>
                                </a>
                            </div>
                            <div onClick={nwpClick}>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/512317/github-142.svg"
                                        alt=""/>
                                </a>
                            </div>
                            <div onClick={signinwithGoogle}>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                        alt=""/>
                                </a>
                            </div>

                        </div>
                        <h1 className='text-rose-500 pt-2 text-md font-bold'>{isValidLogin}</h1>

                    </div>
                </div>
            </div>
        </div>


    </div>
  )
}
