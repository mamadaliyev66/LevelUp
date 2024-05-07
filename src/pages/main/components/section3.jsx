
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { db, auth ,firestore} from "../../../firebase/config";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs ,getDoc,doc} from "firebase/firestore";

import Courses from "../../courses/Courses";

export default function Section3() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = firestore.collection('courses');
        const snapshot  = await collectionRef.limit(6).get();
        const fetchedData = snapshot.docs.map(doc => doc.data());
        setData(fetchedData);
        setData(fetchedData);
        



      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();


  }, []);


  
  return (
    <div className=" bg-gray-50 pb-20">
        <h1 tabIndex="0" className="focus:outline-none mx-3 sm:mx-20   pt-20 text-4xl lg:text-4xl font-bold  leading-10 text-gray-800 dark:text-white lg:w-5/12 md:w-9/12 ">Our Popular Courses</h1>

        <h2 className="sm:mx-20 mx-3 pt-3 text-xl  sm:text-2xl">Discover our most popular courses! Dive into a curated selection of top-rated classes designed to help you excel. Join us and start your journey to success today!</h2>
        <div className=''>
        {/* {data?(data.map((course,i)=>{
                                     var tdcn="font-normal truncate  opacity-75 hover:text-clip"
                                    
                                    return(
                                      <Card key={i} className="w-96 hover:shadow-2xl hover:scale-90  transition-all duration-300">
                                      <CardHeader shadow={false} floated={false} className="h-96">
                                        <img
                                          src={course.c_image}
                                          alt="card-image"
                                          className="h-full w-full object-cover"
                                        />
                                      </CardHeader>
                                      <CardBody className='p-6'>
                                        <div className="mb-2 flex items-center justify-between">
                                          <Typography color="blue-gray" className="text-xl">
                                          {course.c_name}
                                          </Typography>
                                          <Typography color="blue-gray" className="font-medium text-xl">
                                          ${course.c_fee}
                                          </Typography>
                                        </div>
                                        <Typography
                                          variant="small"
                                          color="gray"
                                          
                                          className={tdcn}
                                      
                                        >
                                         {course.c_desctibtion}
                                        </Typography>
                                      </CardBody>
                                      <CardFooter className="pt-0">
                                        <Button
                                          ripple={false}
                                          fullWidth={true}
                                          className="bg-blue-500 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                        >
                                          Start Now !
                                        </Button>
                                      </CardFooter>
                                    </Card>
                                    )
                                    })):(<>Loading . . . :) </>)
                                }     

             */}

                
                <Courses/>

              </div>
    </div>
  )
}
