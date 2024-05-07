import { Navigate, useParams } from 'react-router-dom'

import { db, auth ,firestore} from "../firebase/config";
import { addDoc } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { collection,getDoc, getDocs, doc, onSnapshot,updateDoc,query,orderBy  } from 'firebase/firestore'; // Assuming you're using Firebase v9
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { where,getCountFromServer } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function Course() {
  const navigate = useNavigate();
    const id=useParams('id').id;


    const [animationParent] = useAutoAnimate()



    const [lessonData,SetLessonData] = useState()
    const [coursesData, setCoursesData] = useState([]);


    const [fUsers,setFusers] = useState()
    const [rUsers,setRusers] = useState()


     const [registeringProccess,setRegisteringProccess] = useState(false)


    const [isRegistered,setIsRegistered] = useState(false)
    const [checkRegistration,setCheckRegistration] = useState(0)
    const [registeredUsers,setRegisteredUsers] = useState()
    useEffect(() => {
 
 
    const getCourseById = async (courseId) => {
      const courseRef = doc(collection(firestore, 'regular_courses'), courseId);
      const courseSnapshot = await getDoc(courseRef);
    
      if (courseSnapshot.exists) {
        const fetchedData = {
          id: courseSnapshot.id,
          ...courseSnapshot.data(),
          lessons: [], // Initialize an empty 'lessons' array
        };
        setCoursesData(fetchedData);
      } else {
        console.error("Course document not found");
      }
    };
    
 

  const getLessonsForCourse = async (courseId) => {
    const courseRef = doc(collection(firestore, 'regular_courses'), courseId);
    const courseSnapshot = await getDoc(courseRef);
  
    if (!courseSnapshot.exists) {
      // console.error("Course document not found");
      return;
    }
  

    const lessonsRef = collection(courseRef, "lessons");
    // Order lessons by 'lesson_order' field in ascending order
    const q = query(lessonsRef, orderBy('lesson_order', 'asc')); // Adjust 'asc' for descending order
  
    const lessonsSnapshot = await getDocs(q);
    const lessons = lessonsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    SetLessonData(lessons)
  
    
  
  
  
    
  };
  
  const getFinishedUsers = async (id) => {
    const courseRef = doc(collection(firestore, 'regular_courses'), id);
    const courseSnapshot = await getDoc(courseRef);
  
    if (!courseSnapshot.exists) {
      // console.error("Course document not found");
      return;
    }
  
    const fusersRef = collection(courseRef, "finished_users");
    const fuserSnapshot = await getDocs(fusersRef);
    const fusers = fuserSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setFusers(fusers.length)
  
    
  
  
  
    
  };


  const getRegisteredUsers = async (id) => {
    const courseRef = doc(collection(firestore, 'regular_courses'), id);
    const courseSnapshot = await getDoc(courseRef);
  
    if (!courseSnapshot.exists) {
      // console.error("Course document not found");
      return;
    }
  
    const rusersRef = collection(courseRef, "registered_users");
    const ruserSnapshot = await getDocs(rusersRef);
    const rusers = ruserSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    
    
    rusers.forEach(user=>{
      if(user.uid===auth?.currentUser?.uid){
        setIsRegistered(true)
        
        setRegisteredUsers(user)
      }else{
        
      }
    })

    setRusers(rusers.length)
  
    
  
  
  
    
  };
  getLessonsForCourse(id);  
  getFinishedUsers(id)
  getRegisteredUsers(id)
  return () => getCourseById(id);

}, [firestore]);






const RegisterForThisCourse=async()=>{


  
  try {
    setCheckRegistration(0);

  setRegisteringProccess(true);
if(!isRegistered){
  if(auth.currentUser){
    if (auth.currentUser.email) {
        
      const getLessonsForCourse = async (courseId) => {
        const courseRef = doc(collection(firestore, 'regular_courses'), courseId);
        const courseSnapshot = await getDoc(courseRef);
      
        if (!courseSnapshot.exists) {
          // console.error("Course document not found");
          return;
        }
      
    
        const r_users_ref = collection(courseRef, "registered_users");
        // Order lessons by 'lesson_order' field in ascending order
        const q = query(r_users_ref, orderBy('registered_at', 'asc')); // Adjust 'asc' for descending order
      
        const r_users_snapshot = await getDocs(q);
        const r_users = r_users_snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
       
        
        
        
      
      
        
        try {
          if(auth?.currentUser?.uid !==registeredUsers?.uid ){
            
            console.log(false);
            const docRef = await addDoc(collection(courseRef, "registered_users"), {
            lesson_process: '0',
            registered_at: new Date().toISOString(),
            uid: auth.currentUser.uid,
          })

          window.location.reload();
          
      
          }else{
            console.log(registeredUsers);
          }
        } catch (error) {
          console.log(error);
      
        }
      };
      getLessonsForCourse(id)
    }else{
    navigate('/login')

    }
  }else{
    navigate('/login')
  }

}else{
    alert('You are already registered ! ! !')
}

  } catch (error) {
    
  }finally{
  setRegisteringProccess(false);

  }


}





  return (
    <div ref={animationParent}>

        <div className='xl:flex mt-20 mb-20 mx-3 md:mx-20 transition-all duration-1000 ease-in-out'  >

                  <div className='w-[90%]  transition-all duration-1000 ease-in-out'>
                          <div>
                            <div className='flex space-x-3'>

                                <h1 className= 'transition-all duration-1000 ease-in-out bg-blue-500 text-white p-3 my-auto  hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-2'>{coursesData.category}</h1>
                                <h1 className=' transition-all duration-1000 ease-in-out bg-purple-500 text-white p-3 my-auto  hover:bg-white hover:text-purple-600 hover:border-purple-600 hover:border-2'> <span className='font-bold'>${coursesData.course_fee}</span></h1>
                            </div>

                            <h1 className='sm:text-4xl text-2xl my-9 font-bold  transition-all duration-1000 ease-in-out'>{coursesData.course_name}</h1>
                          </div>
                          <div>

                            <div className='flex my-6 space-x-3 transition-all duration-1000 ease-in-out'>
                              <h1 className='flex bg-blue-700 p-3 text-white transition-all duration-1000 ease-in-out'>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="25" width="25" version="1.1" id="Capa_1" viewBox="0 0 60.671 60.671" xmlSpace="preserve">
                                  <g>
                                    <g>
                                      <ellipse  fill='#fff' cx="30.336" cy="12.097" rx="11.997" ry="12.097"/>
                                      <path  fill='#fff'd="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9    C48.354,35.818,42.661,30.079,35.64,30.079z"/>
                                    </g>
                                  </g>
                                </svg>
                                 
                                 <span className='my-auto mt-1 transition-all duration-1000 ease-in-out'> Registered Users : <span className='font-bold'>{rUsers}</span></span>
                              </h1>



                              <h1 className='flex bg-blue-700 p-3 text-white transition-all duration-1000 ease-in-out'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#ffffff">

                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                                        <g id="SVGRepo_iconCarrier"> <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z" fill="#ffffff"/> <path d="M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z" fill="#ffffff"/> </g>

                              </svg>
                                 
                                 <span className='my-auto mt-1 transition-all duration-1000 ease-in-out'> Finished Users : <span className='font-bold'>{fUsers}</span></span>
                              </h1>



                              
                            </div>
                            <p className='font-serif mb-16  transition-all duration-1000 ease-in-out'>
                              {coursesData.course_description}
                            </p>

                          {auth?.currentUser?.email?(<>
                            
                              {isRegistered?(<>
                                <div className='mb-16' >
                                  <Link to={'/courses/course/lessons/'+coursesData.id}>
                                <button 
                                    className="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-white text-sm font-bold bg-blue-500 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1">
                                      Lessons
                                    <span className="ml-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
                                        </svg>
                                    </span>
                                </button>
                                </Link>
                              {/* <button className='text-xl transition-all duration-1000 ease-in-out bg-purple-500 text-white p-3 rounded-lg hover:bg-white hover:text-purple-600 hover:border-purple-600 border-2'>Register for <span className='font-bold'>${coursesData.course_fee}</span></button> */}
                            </div>
                              </>):(<>
                                <div className='mb-16' onClick={RegisterForThisCourse}>
                                <button disabled={registeringProccess}
                                    className={registeringProccess?("flex disabled disabled:bg-blue-800 flex-row items-center justify-center w-full px-4 py-4 mb-4 text-white text-sm font-bold bg-blue-500 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1"):("flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-white text-sm font-bold bg-blue-500 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1")}>
                                    Register Now
                                    <span className="ml-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
                                        </svg>
                                    </span>
                                </button>
                              {/* <button className='text-xl transition-all duration-1000 ease-in-out bg-purple-500 text-white p-3 rounded-lg hover:bg-white hover:text-purple-600 hover:border-purple-600 border-2'>Register for <span className='font-bold'>${coursesData.course_fee}</span></button> */}
                            </div>
                              </>)}
                          </>):(<>
                                <div>
                                   <h1 className='my-6 animate-pulse  hover:animate-none'>Login is required to register for this course. Please click the login button below to go to the login page !</h1>
                                  <Link to={'/login'}>
                                   <div 
                                    className="   inline w-full px-4 py-4 mb-4 text-white font-bold bg-blue-500 leading-6 text-sm md:text-lg capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1">Login 
                                    {/* <svg className='inline' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff" height="25px" width="25px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve" stroke="#ffffff">

                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                                    <g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"/> </g>

                                    </svg> */}
                                    </div>
                                    </Link>
                                    
                                </div>
                          
                          </>)}
                            

                          </div>



                  </div>
                  <div className='xl:w-[50%] xl:ml-16  transition-all duration-1000 ease-in-out'>
                    <img src={coursesData.course_image} alt="" />
                    
                  
                  </div>




        </div>

        <h1 className='text-3xl text-center ml-2 md:ml-16 ' >Lessons</h1>
        <div className="grid gap-2 xl:grid-cols-3 md:grid-cols-2 lg:gap-12 p-6 md:p-10 mt-12">
    
    {lessonData?lessonData.map((lesson,i)=>{
      return(
        <div key={i} 
        className="flex flex-col p-6 space-y-6 transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6 w-fit">
        <div
            className="flex items-center justify-center w-16 h-16 bg-green-100 border border-green-200 rounded-full shadow-inner lg:h-20 lg:w-20">
            <h1 className='text-xl '>#{i+1}</h1>
        </div>
        <div className="flex-1">
            <h5 className="mb-3 text-xl font-bold lg:text-2xl">{lesson.title}</h5>
            <p className="mb-6 text-lg text-gray-600">{lesson.description}</p>
            <span className="flex items-baseline text-lg font-bold text-indigo-600">
              Watch Now 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
        </div>
    </div>
      )
    }):(<>Nothing Found !</>)}
    
</div>
      




    












    </div>
    
  )
}
