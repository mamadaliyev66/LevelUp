import React, { useState } from 'react'
import { setDoc ,doc} from 'firebase/firestore';
import { db, auth ,firestore} from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore"; 
import firebase from 'firebase/compat/app';
import 'firebase/firestore'


import { getDatabase, ref, set , onValue,child, get} from "firebase/database";


export default function Ideas() {

    const [loading,setLoading] = useState(false)
  

    const [name,setName] = useState()
    const [number,setNumber] = useState()
    const [idea,setIdea] = useState()


    const [hasError,setHasError] = useState(false)

    const [success,setSuccess] = useState(false)

    const Name=(e)=>{
      setName(e.target.value)
    }


    function sendIdea() {
      setHasError(false)
      setLoading(true)

      const dbRef = ref(getDatabase());
      get(child(dbRef, `ideas/`)).then((snapshot) => {
        if (name) {
          if (number) {
            if (idea) {
              if (snapshot.exists()) {
         
                const db = getDatabase();
                set(ref(db, 'ideas/' + snapshot.val().length), {
                  'name': name,
                  'number': '+998'+String(number),
                  'idea' : idea
                });
                
      
                
              } else {
      
              }
            }else{
              setHasError(true)
            }
          }else{
            setHasError(true)
          }
        }else{
          setHasError(true)
        }
      

      }).catch((error) => {
        
      }).finally(() => {
        setLoading(false)

        window.document.getElementById('name').value=''
        window.document.getElementById('phone').value=''
        window.document.getElementById('ideas').value=''
        if (hasError!=true) {
          
          setSuccess(true)
        }else{
          setSuccess(false)
        }


      });



      //
    }
    
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, 5000);
    }



  return (
<>

    <div className={success?("bg-teal-100  border-t-4 my-9 mx-9 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"):("bg-teal-100 hidden border-t-4 my-9 mx-9 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md")} role="alert">
              <div className="flex">
                          <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                          <div>
                            <p className="font-bold">Your Idea has been accepted!</p>
                            <p className="text-sm">We will look into it and get back to you soon. Thank you for your opinion!</p>
                          </div>
             <div  >
                <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
              </button>
            </div>
              </div>
    </div>


    <div className='grid md:grid-cols-2 grid-cols-1   py-24'>
            
      <div className=' mx-auto my-auto'>
                 <div>
                        <p className="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800">Give Your Ideas !</p>
                    </div>
                    <div className="mt-4 w-full">
                        <p className="text-base leading-6 text-gray-600">Send us your ideas and feedbacks about our platform!</p>
                  </div>
      </div>
 
      <div className='w-full px-16'>
      <div className="space-y-12">
        <div className=" pb-12">
          

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name :
              </label>
              <div className="mt-2">
                <div className=" rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                  disabled={loading}
                    type="text"
                    name="fullname"
                    id="name"
                    onChange={(e)=>{setName(e.target.value)}}
                    autoComplete="name"
                    className="block p-6 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="e.x : Ismoil Turdaliyev Hoshimovich"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number 
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center border-r pr-3 pl-3 text-gray-500 sm:text-sm">+998</span>
                  <input
                  disabled={loading}
                    type="number"
                    name="phone"
                    id="phone"
                    onChange={(e)=>{setNumber(e.target.value)}}

                    autoComplete="phone"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="XX XXX XX XX"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="ideas" className="block text-sm font-medium leading-6 text-gray-900">
                Idea
              </label>
              <div className="mt-2">
                <textarea
                disabled={loading}
                  id="ideas"
                  name="ideas"
                  placeholder='Write Your Idea Here'
                  rows={3}
                  onChange={(e)=>{setIdea(e.target.value)}}

                  className="block p-6 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              {hasError?(<h1 className='w-full py-6 font-bold text-rose-500'>You information is not valid. Please try again !</h1>):(<></>)}
              
            </div>


          </div>
        </div>


      </div>

      <button disabled={loading} onClick={sendIdea} className="px-4 bg-blue-500  disabled:bg-blue-900 flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-blue-700">
                                
                                
                               {loading?(<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                                <span
                                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                  >Loading...</span>
                              </div>):(<><p className="text-xl font-medium leading-5">Send Now !</p></>)}
                                
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.66663 16H25.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 21.3333L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 10.6667L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
    </div>
    </div>
    </>)
}
