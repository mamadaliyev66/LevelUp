import { Navigate, useParams } from 'react-router-dom'

import { db, auth ,firestore} from "../../firebase/config";
import { addDoc } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { collection,getDoc, getDocs, doc, onSnapshot,updateDoc,query,orderBy  } from 'firebase/firestore'; // Assuming you're using Firebase v9
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { where,getCountFromServer } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function MyCourses() {
    const navigate = useNavigate();

    
    const [coursesData, setCoursesData] = useState([]);

    const [user,setUser]=useState();


//  useEffect(() => {
 



// const getUser = async (UserId) => {
//     const r_users_ref = collection(firestore, "users");
//         // Order lessons by 'lesson_order' field in ascending order
//         const q = query(r_users_ref,where('uid','==',UserId)); // Adjust 'asc' for descending order
      
//         const r_users_snapshot = await getDocs(q);
//         const r_users = r_users_snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUser(r_users[0])
 

//         // for (let index = 0; index < r_users[0].r_courses.length; index++) {
//         //     console.log(r_users.r_courses[index]);

            
//         // }
//         console.log(r_users.r_courses);
//         r_users[0].r_courses.map((course) =>{
//             console.log(course);
//         })
//         r_users[0].r_courses.forEach(element => {
           
//                 console.log(element);
//                     const getCourseById = async (element) => {
//                         const courseRef = doc(collection(firestore, 'regular_courses'), element);
//                         const courseSnapshot = await getDoc(courseRef);
                        
//                         if (courseSnapshot.exists) {
//                             const fetchedData = {
//                             id: courseSnapshot.id,
//                             ...courseSnapshot.data(),
//                             lessons: [], // Initialize an empty 'lessons' array
//                             };
//                             setCoursesData(fetchedData);
//                         } else {
//                             console.error("Course document not found");
//                         }
//                         };
//                         console.log(coursesData);
            
//         });
    
//     };
    
 

   
    
  

//   return () => getUser(auth?.currentUser?.uid);

// }, [firestore]);




  return (
    <div className='min-h-screen'>

<div className='min-h-screen animate-pulse text-3xl text-center font-bold mt-20'>This Menu Will Be Available Soon !</div>


    </div>
  )
}
