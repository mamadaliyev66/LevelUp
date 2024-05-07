import React, { useState,useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db, auth ,firestore} from "../firebase/config";
import { doc,getDoc ,onSnapshot} from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from 'react-router-dom';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { query,where,getCountFromServer } from 'firebase/firestore';


import { createUserWithEmailAndPassword } from "firebase/auth";

import { Timestamp,FieldValue,serverTimestamp } from 'firebase/firestore';





export default function Register() {
  const navigate = useNavigate();

  const [fname,setFname]=useState()
  const [lname,setLname]=useState()
  const [age,setAge]=useState()
  const [birth,setBirth]=useState()
  const [address,setAddress]=useState()
  const [job,setJob]=useState()
  const [otherjob,setOtherJob]=useState(false)
  const [otherjobclass,setOtherJobclass]=useState('hidden')

  const [email,setEmail]=useState()
  const [password,setPassword] = useState()
  const [secondPassword,setSecondPassword] = useState()
  
  const [loading,setLoading]=useState(false)

  const [lnameClass,setLnameClass]=useState()
  const [ageClass,setAgeClass]=useState()
  const [bithClass,setBirthClass]=useState()
  const [addressClass,setAddressClass]=useState()

  const [emailClass,setEmailClass]=useState()
  const [jobClass,setJobClass]=useState('hidden')
  const [passwordClass,setPasswordClass] = useState()
  const [secondPasswordClass,setSecondPasswordClass] = useState()
  

  const [success,setSuccess]=useState(false)

  const [validateEmail,setValidateEmail] = useState()
  
  const [user,setUser] = useState()


  const [isVerified, setIsVerified] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderRef = React.createRef();

  const [users,setUsers] = useState()


  const [nwPlatfroms,setNwPlatfroms] = useState(false)

  console.clear()
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

  const handleSliderChange = (event) => {
    const newPosition = event.target.value;
    setSliderPosition(newPosition);

    // Adjust this threshold based on your design and requirements
    const verificationThreshold = 90;

    if (newPosition >= verificationThreshold) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };



    const provider = new GoogleAuthProvider();
    const SignInwithGoogle=()=>{

      try {
        
        signInWithPopup(auth, provider)
            .then(async(result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;


          
            const coll = collection(firestore, "users");
            const q = query(coll, where("email", "==", user.email));
            const snapshot = await getCountFromServer(q);
            
            
            
            if (snapshot.data()) {
              if (snapshot.data().count) {
              
                
                
              
  
              // Delete user from Firestore
              // await userRef.delete();
            
              // Handle pending operations



              }else if(!snapshot.data.count){

                const docRef = await addDoc(collection(firestore, "users"), {
                  email: user.email,
                  address: '',
                  age: '',
                  birth: '',
                  date_joined: new Date(),
                  fname: user.displayName,  
                  lname: '',
                  password: '',
                  profession:'',
                  uid:user.uid,
                  r_courses:[{}],
                  f_courses:[{}]


                })

              }}



            // result.user.delete()  ///// this function deletes the user from database userlist if it already exists 


            // IdP data available using getAdditionalUserInfo(result)
            setInterval(async() => {
              
              
              },[1500])
            // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            });
        
            
      } catch (error) {
        console.log(error.message);
      }
        }

 
  function getEmailFromInput(email) {
    setEmail(email.target.value)
    setJobClass('')
    const validation=email.target.value.includes('@')
    
      if (validation) {
        setValidateEmail('')
      }else{
        setValidateEmail('Please enter a valid email !')
      }
      
    
  }
  function getFname(e) {
    setFname(e.target.value)
    
      setLnameClass('')
    
  }

  function getJob(e) {
    if (e=='other') {
      setOtherJob(true)
      setOtherJobclass('w-full bg-gray-100 rounded-lg py-2 px-2 ring-1 ring-blue-500')
    }else{
      setJob(e)
    setPasswordClass('')
    setOtherJobclass('hidden')
    }
    
    
  }

  function getOtherJob(e) {
    setJob(e.target.value)
    setPasswordClass('')
    
  }






  function getLname(e) {
    setLname(e.target.value)
    setAgeClass('')

  }
  function getAge(e) {
    setAge(e.target.value)
    setBirthClass('')

  }
  function getDateofBirth(e) {
    setBirth(e.target.value)
    setAddressClass('')

  }
  function getAddress(e) {
    setAddress(e.target.value)
    setEmailClass('')

  }
  function getSecondPassword(e) {
    setSecondPassword(e.target.value)
  }
  function getPasswordFromInput(pass) {
    
    setPassword(pass.target.value)
    setSecondPasswordClass('')
  }

  function SubmitEmailPass(){
    RegisterNewUser();
  }
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      
      
    });
    setLnameClass('hidden')
    setAgeClass('hidden')
    setBirthClass('hidden')
    setAddressClass('hidden')
    setEmailClass('hidden')
    setPasswordClass('hidden')
    setSecondPasswordClass('hidden')

    return () => unsubscribe();
  }, []);
  const addNewUser = async (e) => {
    
    
  }
  if (user) {
    
    navigate('/dashboard');

  }else{

  }
  
// console.log(fname,lname,age,bith,address,email,password,secondPassword);






  const RegisterNewUser=async()=>{
    if (fname) {
      if(lname){
        if (age) {
          if (birth) {
            if (address) {
              if (email) {
                if (job) {
                  if (password) {
                    if (secondPassword) {
                      if (password==secondPassword) {
                        if (password.length>5 && password.length<17) {
                          // workspace
                            try {
                              
                              const coll = collection(firestore, "users");
                              const q = query(coll, where("email", "==", email));
                              const snapshot = await getCountFromServer(q);
                              
                              if (snapshot.data()) {
                                if (snapshot.data().count) {
                                 
                                  setSuccess(true)
    
    
                                }else if(!snapshot.data.count){
                                  setLoading(true)
                                  setSuccess(false)
                                  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    
                                  let autoId = ''
    
                                  for (let i = 0; i < 20; i++) {
                                    autoId += CHARS.charAt(
                                      Math.floor(Math.random() * CHARS.length)
                                    )
                                  }
                                  const auth = getAuth();
                                  createUserWithEmailAndPassword(auth, email, password)
                                    .then(async(userCredential) => {
                                      // Signed up 
                                      const user = userCredential.user;
                                      // ...
                                      const docRef = await addDoc(collection(firestore, "users"), {
                                        email: email,
                                        address: address,
                                        age:age,
                                        birth: birth,
                                        date_joined: new Date(),
                                        fname: fname,
                                        lname: lname,
                                        password: password,
                                        profession:job,
                                        uid:user.uid,
                                        r_courses:[{}],
                                        f_courses:[{}]
        
        
                                      });


                                      // console.log(docRef.id);
                                      // const registered_courses_ref = collection(db, `users/${docRef.id}/registered_courses`);
                                      // const registered = await addDoc(registered_courses_ref, {
                                        
                                      // });


                                      // const finished_courses_ref = collection(db, `users/${docRef.id}/registered_courses`);
                                      // const finished = await addDoc(finished_courses_ref, {
                                        
                                      // });
                                    })
                                    .catch((error) => {
                                      const errorCode = error.code;
                                      const errorMessage = error.message;
                                      // ..
                                    });


                                 
                                  
                                  
                                 
                                  
    
                                }
                                
                              }else{
                                alert("Something We Went Wrong Please Try Again Later !")
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          


                          







                          // workspace end
                        }else{
                          window.alert('Password Must Contain at least 6 characters')
                        }
                      }else{
                        alert('Please Enter a Same Valid Password For Two Password Fields!')
                      }
                    }
                  }else{
                    setPasswordClass('bg-rose-500 text-white  ')
                    
                  }
                }else{
                  setJobClass('bg-rose-500 text-white')
                }
                
              }else{
                setEmailClass('bg-rose-500 text-white  ')
                getEmailFromInput(email)
                
              }
            }else{
              setAddress('bg-rose-500 text-white  ')
              
            }
          }else{
            setBirthClass('bg-rose-500 text-white  ')
            
          }
        }else{
          setAgeClass('bg-rose-500 text-white  ')
          
        }
      }else{
        setLnameClass('bg-rose-500 text-white  ')
        
      }
    }
  }







  return (
    <>
    <div id="toast-warning" className={nwPlatfroms?"flex w-fit ml-auto items-center mt-6 mr-3 transition-all duration-1000 animate-bounce  p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800":"hidden w-fit ml-auto items-center mt-6 mr-3 transition-all duration-1000 animate-bounce  p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"} role="alert">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
          </svg>
          <span className="sr-only">This Site Is Working On Demo Mode !</span>
      </div>
      <div className="ms-3 text-sm font-bold">This Site Is Working On Demo Mode !</div>
      <div className="ms-3 text-sm font-normal">Please Register Using <strong className='font-extrabold'>Google</strong> or  <strong className='font-extrabold'>Email</strong>.</div>
      <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
      </button>
    </div>
    
      <div className={success?("bg-rose-100  border-t-4 my-9 mx-9 border-rose-500 rounded-b text-rose-900 px-4 py-3 shadow-md"):("bg-rose-100 hidden border-t-4 my-9 mx-9 border-rose-500 rounded-b text-rose-900 px-4 py-3 shadow-md")} role="alert">
              <div className="flex">
                          <div className="py-1"><svg className="fill-current h-6 w-6 text-rose-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                          <div>
                            <p className="font-bold">This Email Is Already Registered!</p>
                            <p className="text-sm">Please use another email to create new account in our platform !</p>
                          </div>
             <div  >
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-rose-500 rounded-lg focus:ring-2 focus:ring-rose-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
              </button>
            </div>
              </div>
    </div>


    


    <section className="my-32 scroll-m-8 ml-20 mr-20">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              {/* <!--Sign in section--> */}
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg">Sign up with</p>

                {/* <!-- Facebook button--> */}
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    onClick={nwpClick}
                    className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {/* <!-- Facebook --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 48 48">
                    <path fill="#3f51b5" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M29.368,24H26v12h-5V24h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H30v4h-2.287 C26.104,16,26,16.6,26,17.723V20h4L29.368,24z"></path>
                    </svg>
                  </button>
                </TERipple>

                {/* <!-- google button --> */}
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    onClick={SignInwithGoogle}
                    className="mx-1 h-9 w-9 rounded-full  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {/* <!-- google --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                  </button>
                </TERipple>

                {/* <!-- github button --> */}
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    onClick={nwpClick}
                    className="mx-1 h-9 w-9 rounded-full  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {/* <!-- github --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
<linearGradient id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1" x1="4" x2="44" y1="23.508" y2="23.508" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4c4c4c"></stop><stop offset="1" stopColor="#343434"></stop></linearGradient><path fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)" d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"></path><path d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z" opacity=".05"></path><path d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z" opacity=".07"></path><path fill="#fff" d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"></path>
</svg>
                  </button>
                </TERipple>
              </div>

              {/* <!-- Separator between social media sign in and email/password sign in --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  OR
                </p>
              </div>

               {/* <!-- First Name input --> */}
             <div className=''> 
              <TEInput
                type="text"
                label="First Name"
                size="lg"
                className="mb-6 " 
                required
                onChange={((e)=>{getFname(e)})}
                >

                </TEInput>
                
                </div>

              {/* <!-- Last Name input --> */}
              <div className={lnameClass}> 
                          <TEInput
                            type="text"
                            label="Last Name"
                            size="lg"
                            className="mb-6 transition-all duration-300" 
                            required
                            onChange={((e)=>{getLname(e)})}
                            >

                            </TEInput>
                            
                            </div>
                    {/* <!-- Age input --> */}
                    <div className={ageClass}> 
                    <TEInput
                      type="number"
                      label="Age"
                      size="lg"
                      className="mb-6 " 
                      required
                      onChange={((e)=>{getAge(e)})}
                      >

                      </TEInput>
                      
                      </div>
                        {/* <!-- Date of birth input --> */}
              <div className={bithClass}> 
                          <TEInput
                            type="date"
                            label="Date of birth"
                            size="lg"
                            className="mb-6  text-white focus:text-black" 
                            required
                            onChange={((e)=>{getDateofBirth(e)})}

                            >

                            </TEInput>
                            
                            </div>
                        {/* <!-- Address input --> */}

                            <div className={addressClass}> 
                          <TEInput
                            type="text"
                            label="Address"
                            size="lg"
                            className="mb-6  text-white focus:text-black" 
                            required
                            onChange={((e)=>{getAddress(e)})}

                            >

                            </TEInput>
                            
                            </div>
                         

              {/* <!-- Email input --> */}
             <div className={emailClass}> 
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6 " 
                required
                onChange={((e)=>{getEmailFromInput(e)})}
                >

                </TEInput>
                <h1 className='text-rose-500 mb-6'>{validateEmail}</h1>
                </div>
              {/* job input */}


              <div className={jobClass}>
                                                        
                            {/* <label htmlFor="jobs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your Profession</label>
                            <select id="jobs" onChange={((e)=>{getJob(e)})} className  ="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option className='disabled' defaultValue>Profession</option>
                              <option value="teacher">Teacher</option>
                              <option value="student_u">University Student</option>
                              <option value="student_s">School Student</option>
                              <option value="unemployed">Unemployed</option>
                              <option value="other">Other</option>
                            </select> */}
    <div className="border rounded-md p-4 w-full mx-auto max-w-2xl my-9">
    <h4 className="text-xl lg:text-2xl font-semibold">
        Select Your Profession 
    </h4>

    <div>
        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
             <input type="radio" name="jobs" onChange={()=>getJob('teacher')}/>
             <i className="pl-2">Teacher</i>
        </label>

        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
            <input type="radio" name="jobs" onChange={()=>getJob('student_u')}/>
            <i className="pl-2">University Student</i>
        </label>

        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
              <input type="radio" name="jobs" onChange={()=>getJob('student_s')}/>
              <i className="pl-2">School Student</i>
         </label>
         <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
              <input type="radio" name="jobs" onChange={()=>getJob('unemployed')}/>
              <i className="pl-2">Unemployed</i>
         </label>
        <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
              <input type="radio" name="jobs"  onChange={()=>getJob('other')}/>
              <i className="pl-2">Other</i>
        </label>


        <input  className={otherjobclass} required={true} onChange={(e)=>getOtherJob(e)} placeholder='Job'  type="text" />

    </div>
</div>
              </div>
              
    


               {/* <!--Password input--> */}
             <div className={passwordClass}>
             
             <div className='mb-6  '> <TEInput
                type="password"
                label="Password"
                className=""
                required
                onChange={((e)=>{getPasswordFromInput(e)})}
                size="lg"
                >

              </TEInput>
              </div>
                </div>
                             <div className={secondPasswordClass}>
              <div className='mb-6  '> <TEInput
                type="password"
                label="Re-enter Password"
                className=""
                required
                onChange={((e)=>{getSecondPassword(e)})}
                size="lg"
              >

              </TEInput>
              </div>
                              </div>




                              


              <div className="mb-6 flex items-center justify-between">
                {/* <!-- Remember me checkbox --> */}
                <div className="mb-[0.125rem] block min-h-[1.5rem]">
                Have an account?
                </div>




                

                {/* <!--Forgot password link--> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  {" "}
                  <Link
                    to={'/login'}
                    
                    className="text-danger transition text-lg duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700"
                  >
                    Login
                  </Link>
                </p>
              </div>
{/*               
              <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
      <label className="block text-gray-700 mb-2">Slide to Verify:</label>

      <div className="relative overflow-hidden">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="appearance-none w-full h-6 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 outline-none focus:outline-none transition-all duration-300"
          ref={sliderRef}
        />

        <div
          className={`absolute h-6 w-6 bg-white rounded-full cursor-pointer transition-all duration-300 transform translate-x-${
            isVerified ? 'full' : '0'
          }`}
        />
      </div>

      <p className="mt-2 text-gray-600">
        {isVerified ? 'Verification successful! You are not a robot.' : 'Slide to verify.'}
      </p>
    </div> */}
              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">

               {loading?(
                <>
                 
                 <button
                disabled
                type="button"
                className=" disabled:bg-blue-900 inline-block py-auto rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                <div className="inline-block  h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
              </div>
                Loading . . .
              </button>
              </>
               ):(
                <button
                onClick={SubmitEmailPass}
                type="button"
                className="inline-block  rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Register
              </button>
            
               )}
                 
                
                </TERipple>

                {/* <!-- Register link --> */}
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
