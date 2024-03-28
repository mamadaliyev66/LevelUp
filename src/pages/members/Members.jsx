
import { db, auth ,firestore} from "../../firebase/config";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc} from "firebase/firestore";


import { Link } from 'react-router-dom'




export default function Section6() {



    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const collectionRef = firestore.collection('members');
            const snapshot  = await collectionRef.get();
            const fetchedData = snapshot.docs.map(doc => doc.data());
            setData(fetchedData);
    
    
    
          } catch (error) {
            console.error('Error fetching data from Firestore:', error);
          }
        };
    
        fetchData();
    
    
      }, []);
    
  return (
    <div>
        
        <div className="container flex justify-center mx-auto pt-16">
                    <div>
                        <p className="text-gray-500 dark:text-gray-200 text-lg text-center font-normal pb-3">OUR TEAM</p>
                        <h1 className="xl:text-4xl text-3xl text-center text-gray-800 dark:text-white font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">Meet our team</h1>
                    </div>
                </div>
                <div className="w-full  dark:bg-gray-800 px-10 pt-10">
                    <div className="container mx-auto">
                        <div role="list" aria-label="Behind the scenes People " className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                            
                            
                    {data?(data.map((member,i)=>{
                           return(         
                            <div key={member.member_id} role="listitem" className="xl:w-1/3 hover:shadow-2xl transition-all duration-300 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                <div className="rounded overflow-hidden shadow-md bg-white dark:bg-gray-900">
                                    <div className="absolute -mt-20 w-full flex justify-center">
                                        <div className="h-32 w-32">
                                            <img src={member.member_image_url} alt="member_image" role="img" className="rounded-full object-cover h-full w-full shadow-md" />
                                        </div>
                                    </div>
                                    <div className="px-6 mt-16">
                                        <h1 className="text-center font-semibold pb-2 text-lg">{member.member_job}</h1>

                                        <Link to={''+member.member_id}>
                                            <h1 className="font-bold dark:text-white text-3xl text-center mb-1">{member.member_name}</h1>
                                        </Link>
                                        <p className="py-3 mx-auto">
                                            {member.member_about}
                                        </p>
                                        <div className="text-gray-800 dark:text-white text-sm text-center">
                                            
                                            <div className='space-x-1 space-y-1'>
                                            {member?(member.tags.map((tag,i)=>{
                                                                return(
                                                                    <span key={i}>
                                                                        <button className='bg-blue-500 text-white p-2 rounded-lg'>
                                                                        <span className='px-1'>#</span>    
                                                                        {tag}  
                                                                        
                                                                        </button>
                                                                        
                                                                    </span>
                                                                )
                                                            })):(<>No Tags Found</>)}
                                            </div>
                                            
                                        </div>
                                        <div className="w-full flex justify-center pt-5 pb-5">
                                            <a href={member.member_facebook} className="mx-5" target="_blank">
                                                <div aria-label="Github" role="img">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
                                                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                                </svg>
                                                    
                                                </div>
                                            </a>
                                            <a href={member.member_telegram} className="mx-5"target="_blank">
                                                <div aria-label="Twitter" role="img">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
                                                    <path fill="#29b6f6" d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"></path><path fill="#fff" d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"></path><path fill="#b0bec5" d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"></path><path fill="#cfd8dc" d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"></path>
                                                </svg>
                                                </div>
                                            </a>
                                            <a href={member.member_instagram} className="mx-5"target="_blank">
                                                <div aria-label="Instagram" role="img">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
                                                <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fd5"></stop><stop offset=".328" stopColor="#ff543f"></stop><stop offset=".348" stopColor="#fc5245"></stop><stop offset=".504" stopColor="#e64771"></stop><stop offset=".643" stopColor="#d53e91"></stop><stop offset=".761" stopColor="#cc39a4"></stop><stop offset=".841" stopColor="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9"></stop><stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                                                </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                           )})):(<>Not Found !</>)}




                            
                        </div>
                    </div>
                </div>
            
    </div>
  )
}
