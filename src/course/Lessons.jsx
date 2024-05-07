import {  useParams,Navigate,useNavigate} from 'react-router-dom';
import React, { useState,useEffect } from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { db, auth ,firestore} from "../firebase/config";
import { useRef } from 'react';
import { addDoc, limit } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { collection,getDoc, getDocs, doc, onSnapshot,updateDoc,query,orderBy  } from 'firebase/firestore'; // Assuming you're using Firebase v9
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { where,getCountFromServer } from 'firebase/firestore';

export default function Lessons() {
  const id=useParams('id').id;
  const navigate = useNavigate();
  
  const [user,setUser]= useState()
  const [loading,setLoading] =useState(true)
  const [coursesData, setCoursesData] = useState([]);
  const [lessonData,SetLessonData] = useState()
  const [rUsers,setRusers] = useState()

  const [upcomingLessons,setUpcomingLessons] = useState()

  const [sidebar,setSidebar] = useState()

  const [currentLesson,setCurrentLesson] = useState(1)

  const [loadingLesson,setLoadingLesson] = useState()


  

  useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
        
        
      });
      
      
          setTimeout(() => {
            
            if (auth?.currentUser?.uid) {
              setLoading(false);
            
            }else{
              navigate('/register');
          
            }
          }, 5000);
          
 
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
    console.log(courseSnapshot.data());
    if (!courseSnapshot.exists) {
      // console.error("Course document not found");
      return;
    }
  
    const lessonsRef = collection(courseRef, "lessons");
    setTimeout(async() => {
      
      // Order lessons by 'lesson_order' field in ascending order
      const q = query(lessonsRef,  where('lesson_order','==',String(currentLesson))); // Adjust 'asc' for descending order
    
      const lessonsSnapshot = await getDocs(q);
      const lessons = lessonsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      SetLessonData(lessons)
     
    }, 3000);
    const q1 = query(lessonsRef, orderBy('lesson_order', 'asc')); // Adjust 'asc' for descending order
  
    const lessonsSnapshot1 = await getDocs(q1);
    const lessons1 = lessonsSnapshot1.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUpcomingLessons(lessons1)
  
    
  
  
  
    
  };
  
  const getRegisteredUsers = async (id) => {
    const courseRef = doc(collection(firestore, 'regular_courses'), id);
    const courseSnapshot = await getDoc(courseRef);
  
    if (!courseSnapshot.exists) {
      // console.error("Course document not found");
      return;
    }
    
    
    const rusersRef = collection(courseRef, "registered_users");
    const qa = query(rusersRef,where('uid','==',auth?.currentUser?.uid)); // Adjust 'asc' for descending order
    const ruserSnapshot = await getDocs(qa);
    const rusers = ruserSnapshot.docs.map((doc) =>{
      // console.log(doc.data());
      return {
        id: doc.id,
       ...doc.data(),
      };
      
    })
    setRusers(rusers[0])
  }


  getRegisteredUsers(id)

  getLessonsForCourse(id);  
  
   getCourseById(id);
      return () => unsubscribe();
    }, []);
  console.log(upcomingLessons);

    const SideBarMenu=()=>{
      if (sidebar) {
        setSidebar(false);
      }else{
        setSidebar(true);
      }
    }

    const getLessonsForCourse = async (courseId) => {
      const courseRef = doc(collection(firestore, 'regular_courses'), courseId);
      const courseSnapshot = await getDoc(courseRef);
      console.log(courseSnapshot.data());
      if (!courseSnapshot.exists) {
        // console.error("Course document not found");
        return;
      }
    
      const lessonsRef = collection(courseRef, "lessons");
      setTimeout(async() => {
        
        // Order lessons by 'lesson_order' field in ascending order
        const q = query(lessonsRef,  where('lesson_order','==',String(currentLesson))); // Adjust 'asc' for descending order
      
        const lessonsSnapshot = await getDocs(q);
        const lessons = lessonsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        SetLessonData(lessons)
       
      }, 3000);
      const q1 = query(lessonsRef, orderBy('lesson_order', 'asc')); // Adjust 'asc' for descending order
    
      const lessonsSnapshot1 = await getDocs(q1);
      const lessons1 = lessonsSnapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUpcomingLessons(lessons1)
    
    
      
    };
  
    async function  SetCL(lo){
      setCurrentLesson(lo)
      setLoadingLesson(true)
      try {
        const courseRef = doc(collection(firestore, 'regular_courses'), id);
        const courseSnapshot = await getDoc(courseRef);
        console.log(courseSnapshot.data());
        if (!courseSnapshot.exists) {
          // console.error("Course document not found");
          return;
        }
      
        const lessonsRef = collection(courseRef, "lessons");
        setTimeout(async() => {
          
          // Order lessons by 'lesson_order' field in ascending order
          const q = query(lessonsRef,  where('lesson_order','==',lo)); // Adjust 'asc' for descending order
        
          const lessonsSnapshot = await getDocs(q);
          const lessons = lessonsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          SetLessonData(lessons)
         
        }, 3000);
        const q1 = query(lessonsRef, orderBy('lesson_order', 'asc')); // Adjust 'asc' for descending order
      
        const lessonsSnapshot1 = await getDocs(q1);
        
        const lessons1 = lessonsSnapshot1.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpcomingLessons(lessons1)
      
      

      } catch (error) {
        
      }finally {

        setTimeout(() => {
          setLoadingLesson(false)
        }, 5000);
        
      }
    }




    // Done 

    const Done= async()=>{

      if((videoRef.current.duration/4)*3.5<videoRef.current.currentTime){
        console.log(true);
// 

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
      const q = query(r_users_ref,where('uid','==',auth.currentUser.uid)); // Adjust 'asc' for descending order
    
      const r_users_snapshot = await getDocs(q);
      const r_users = r_users_snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(r_users);

      // const r_users_ref_2 = collection(courseRef, "registered_users").doc('cNkkuj4F3qAWNI8PX8hE');
     
//       const subcollectionRef =collection(firestore,'regular_courses').doc(id).collection('registered_users');
// const documentRef = subcollectionRef.doc('cNkkuj4F3qAWNI8PX8hE');
// documentRef.set({
//   lesson_process:1,
  
// });
//       // doc(collection(r_users_ref, "registered_users"))
      // await setDoc({lesson_process:rUsers.lesson_process+1});

      // updateDoc(examcollref,{
      //   title:title,
      // } ).then(response => {
      //   alert("updated")
      // }).catch(error =>{
      //   console.log(error.message)
      // })
      
      
      
    
    
      
      // try {
      //   if(auth?.currentUser?.uid !==registeredUsers?.uid ){
          
      //     console.log(false);
      //     const docRef = await addDoc(collection(courseRef, "registered_users"), {
      //     lesson_process: '0',
      //     registered_at: new Date().toISOString(),
      //     uid: auth.currentUser.uid,
      //   })

      //   window.location.reload();
        
    
      //   }else{
      //     console.log(registeredUsers);
      //   }
      // } catch (error) {
      //   console.log(error);
    
      // }
    };
    getLessonsForCourse(id)
  }else{
  navigate('/login')

  }
}


// 
      }else{
        console.log(false);
  
      }
    }



    // video player 


    const videoRef = useRef();



    

    
  return (
    <div>
     {loading?(
       <div className=' text-center my-96'>
       <div
     className="inline-block h-16 w-16 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-blue-500 align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
     role="status">
               <span
                 className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
               >
                 Loading...
               
               </span>
   </div>
</div>
     ):(
      <div>
        <div className='w-full grid grid-cols-2 sm:hidden bg-blue-500 text-right text-white'>
          <div className='text-center m-2 p-2 text-lg'>
            Lessons
          </div>
          <div>
            <button onClick={SideBarMenu} className='bg-purple-600 p-2 m-2 rounded-lg mr-3'>
              Menu
            </button>
          </div>
        </div>
      <div className='sm:flex'>
          <aside id="logo-sidebar" className={sidebar?("z-40     w-64  transition-transform -translate-x-full sm:translate-x-0"):("z-40   h-screen relative w-64  transition-transform  sm:translate-x-0")} aria-label="Sidebar">
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
                  
                  <ul className="space-y-4 font-medium" id='1111'>
                  {upcomingLessons.map((ulesson,i)=>{
                    return(
                      
                      <li  key={i} onClick={(()=>{if(rUsers.lesson_process>=ulesson.lesson_order){SetCL(ulesson.lesson_order)}})} className= {rUsers.lesson_process>=ulesson.lesson_order?(ulesson.lesson_order==currentLesson?('bg-gray-200 p-2 transition-all cursor-pointer duration-150'):('hover:bg-gray-200 p-2  cursor-pointer transition-all duration-150')):(ulesson.lesson_order==currentLesson?('bg-gray-200  p-2 transition-all cursor-pointer duration-150'):('hover:bg-gray-200 p-2 opacity-65  cursor-pointer transition-all duration-150'))}>
                           {rUsers.lesson_process>=ulesson.lesson_order?(<></>):(<>
                         <svg className='h-9 w-9 inline bg-blue-500 p-1 rounded-md' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#fff"  version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve">
                                <g id="XMLID_509_">
                                  <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85   S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15   s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25   C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"/>
                                </g>
                          </svg>
                           </>)}
                          <span className='bg-blue-500 text-white p-1 m-1 rounded-full'>#{ulesson.lesson_order}</span> 
                          {ulesson.title}
                          
                         
                      </li>
                    )
                  })}
                  
                    
                  </ul>
              </div>
            </aside>
            <div className={sidebar?('border-2  w-full sm:relative  sm:top-0 top-56 z-10 left-0'):('border-2  w-full sm:relative absolute sm:top-0 top-56 z-10 left-0')}>
              {loadingLesson?(<>
                <div className=' text-center my-96'>
       <div
     className="inline-block h-16 w-16 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-blue-500 align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
     role="status">
               <span
                 className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
               >
                 Loading...
               
               </span>
   </div>
</div>
              </>):(<>
              
              {lessonData.map((lesson)=>{
                return(
                  <div key={lesson.id} className='my-6 '>
                    <h1 className='text-xl sm:text-3xl ml-2 md:ml-20 mt-9'>Lesson: # {lesson.lesson_order}</h1>
                    <div className='flex justify-between items-center'>

                      <div className='w-full block  mx-2 md:mx-20  mt-16 '>
                          <div className=' '>

                            <video value={10000}  ref={videoRef} controls  className='w-full relative  rounded-xl '  width="70%" >
                            <source src={lesson.video_url} type='video/mp4'></source>
                            </video>
                                  
                          </div>
                        <div>
                        
                    
                        </div>

                      </div>
                      
                      {/* <div className='flex items-center'>
                        <img src={lesson.image} alt={lesson.title} className='w-10 h-10 rounded-full' />
                        <div className='ml-2'>
                        <h3 className='text-lg font-bold'>{lesson.title}</h3>
                        <p className='text-sm text-gray-500'>{lesson.description}</p>
                        </div>
                      </div> */}
                      
                    </div>
                    <div className='bg-gray-100 mt-9 space-y-6 sm:p-9 p-3 rounded-xl sm:mx-20 mx-2'>

                            <div>
                                  <h1 className='sm:text-3xl text-xl'>{lesson.title}</h1>
                            </div>
                            <div>
                              <p className='text-lg'>
                                {lesson.description}
                              </p>
                            </div>
                          {rUsers.lesson_process<=lesson.lesson_order?(
                            <div onClick={Done} title={'Once you have finished watching the video, click Done Button.'} className='w-[20%] cursor-pointer p-2 text-center font-bold text-white rounded-lg  bg-blue-500'>
                            Done
                          </div>
                          ):(
                            <div>Finished ✅</div>
                          )}
                            
                           
                    </div>

                    
                  </div>
                )
              })}
              </>)}
            </div>
       </div>
       </div>
     )}
    </div>
  )
}
