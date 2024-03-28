import { db, auth ,firestore} from "./../../firebase/config";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection,getDoc, getDocs, doc, onSnapshot,updateDoc  } from 'firebase/firestore'; // Assuming you're using Firebase v9

export default function Courses() {


  const [data, setData] = useState([]);

  const [coursesData, setCoursesData] = useState([]);

useEffect(() => {
  // Real-time updates for courses
  const unsubscribeCourses = onSnapshot(collection(firestore, 'regular_courses'), (snapshot) => {
    const fetchedData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      lessons: '',
       // Initialize an empty 'lessons' array for each course
     
    }));
    
    setCoursesData(fetchedData);

    snapshot.docs.map((doc) => {
      getLessonsForCourse(doc.id)
    });
  });

  // Cleanup function to unsubscribe when component unmounts
  return () => unsubscribeCourses();
}, [firestore]);

// Function to retrieve lessons for a specific course
const getLessonsForCourse = async (courseId) => {
  const courseRef = doc(collection(firestore, 'regular_courses'), courseId);
  const courseSnapshot = await getDoc(courseRef);

  if (!courseSnapshot.exists) {
    // console.error("Course document not found");
    return;
  }

  const lessonsRef = collection(courseRef, "lessons");
  const lessonsSnapshot = await getDocs(lessonsRef);
  const lessonss = lessonsSnapshot.docs.length
  

  setCoursesData((prevData) =>
    prevData.map((course) =>
      course.id === courseId ? ({...course,lessons: lessonss}) : course
    )
  );




  
};

    
    return (
    <div>
      <h1><div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">

<div className="border-b mb-5 flex justify-between text-sm">
    <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
        <svg className="h-6 mr-3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455.005 455.005"
 xmlSpace="preserve">
            <g>
                <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z"> </path>
                <path d="M353.664,232.676c2.492,0,4.928-1.241,6.354-3.504c2.207-3.505,1.155-8.136-2.35-10.343l-173.3-109.126 c-3.506-2.207-8.136-1.154-10.343,2.35c-2.207,3.505-1.155,8.136,2.35,10.343l173.3,109.126 C350.916,232.303,352.298,232.676,353.664,232.676z"> </path>
                <path d="M323.68,252.58c2.497,0,4.938-1.246,6.361-3.517c2.201-3.509,1.14-8.138-2.37-10.338L254.46,192.82 c-3.511-2.202-8.139-1.139-10.338,2.37c-2.201,3.51-1.14,8.138,2.37,10.338l73.211,45.905 C320.941,252.21,322.318,252.58,323.68,252.58z"> </path>
                <path d="M223.903,212.559c-3.513-2.194-8.14-1.124-10.334,2.39c-2.194,3.514-1.124,8.14,2.39,10.334l73.773,46.062 c1.236,0.771,2.608,1.139,3.965,1.139c2.501,0,4.947-1.251,6.369-3.529c2.194-3.514,1.124-8.14-2.39-10.334L223.903,212.559z"> </path>
                <path d="M145.209,129.33l-62.33,39.254c-2.187,1.377-3.511,3.783-3.503,6.368s1.345,4.983,3.54,6.348l74.335,46.219 c1.213,0.754,2.586,1.131,3.96,1.131c1.417,0,2.833-0.401,4.071-1.201l16.556-10.7c3.479-2.249,4.476-6.891,2.228-10.37 c-2.248-3.479-6.891-4.475-10.37-2.228l-12.562,8.119l-60.119-37.38l48.2-30.355l59.244,37.147l-6.907,4.464 c-3.479,2.249-4.476,6.891-2.228,10.37c2.249,3.479,6.894,4.476,10.37,2.228l16.8-10.859c2.153-1.392,3.446-3.787,3.429-6.351 c-0.018-2.563-1.344-4.94-3.516-6.302l-73.218-45.909C150.749,127.792,147.647,127.795,145.209,129.33z"> </path>
                <path d="M270.089,288.846c2.187-3.518,1.109-8.142-2.409-10.329l-74.337-46.221c-3.518-2.188-8.143-1.109-10.329,2.409 c-2.187,3.518-1.109,8.142,2.409,10.329l74.337,46.221c1.232,0.767,2.601,1.132,3.953,1.132 C266.219,292.387,268.669,291.131,270.089,288.846z"> </path>
                <path d="M53.527,192.864c-2.187,3.518-1.109,8.142,2.409,10.329l183.478,114.081c1.232,0.767,2.601,1.132,3.953,1.132 c2.506,0,4.956-1.256,6.376-3.541c2.187-3.518,1.109-8.142-2.409-10.329L63.856,190.455 C60.338,188.266,55.714,189.346,53.527,192.864z"> </path>
            </g>
        </svg>
        <a href="#" className="font-semibold inline-block">Regular Courses For Everyone</a>
    </div>
    
    <a href="#">See All</a>
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

    {/* <!-- CARD 1 --> */}
    {coursesData?(coursesData.map((course)=>{

      return(
        <div key={course.id} className="rounded overflow-hidden shadow-lg flex flex-col">
        <a href="#"></a>
        <div className="relative">
          <Link to={'course/'+course.id}>
                <img className="w-full"
                    src={course.course_image}
                    alt="Sunset in the mountains"/>
                <div
                    className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                </div>
            </Link>
            <a href="#!">
                <div
                    className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                    {course.category}
                </div>
            </a>
        </div>
        <div className="px-6 py-4 mb-auto">
        <Link to={'course/'+course.id}>

            <span 
                className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{course.course_name}</span>
          </Link>
            <p className="text-gray-500 text-sm " >

                {course.course_description.slice(0,150)} ...

            </p>
            <button className="bg-blue-500 p-2 text-white ml-[60%] my-2">
              Learn More
            </button>
        </div>
        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                <svg height="13px" width="13px" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
                    y="0px" viewBox="0 0 512 512" 
                    xmlSpace="preserve">
                    <g>
                        <g>
                            <path
                                d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                            </path>
                        </g>
                    </g>
                </svg>
                <span className="ml-1">Lessons: {course.lessons}</span>
            </span>

            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                <h1 className="font-bold text-lg">$</h1>
                <span className="ml-1">{course.course_fee}</span>
            </span>
        </div>
    </div>

        
      )
    })):(<h1>Courses Not Found !</h1>)}
    



</div>

</div></h1>
    </div>
  )
}
