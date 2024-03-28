import React from 'react'
import { Link } from 'react-router-dom'
export default function Section8() {
  return (
    <div className='bg-gray-100 py-16'>
        <div className="mx-auto bg-white rounded-md container flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0">
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">
                <div className="w-80 sm:w-auto flex flex-col justify-start items-start">
                    <div>
                        <p className="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800">Give Your Ideas !</p>
                    </div>
                    <div className="mt-4 lg:w-4/5 xl:w-3/5">
                        <p className="text-base leading-6 text-gray-600">Send us your ideas and feedbacks about our platform!</p>
                    </div>
                    <div className="mt-16 w-full">

                        <Link to={'/ideas'}>
                            <button className="px-4 bg-blue-500 flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-blue-700">
                                <p className="text-xl font-medium leading-5">Send Now !</p>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.66663 16H25.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 21.3333L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 10.6667L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                    <div>
                        <img className="hidden lg:block" src="https://www.electrochem.org/wp-content/uploads/2017/09/idea.png" alt="sofa" />
                        <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/QvxmJjB/olena-sergienko-gx-KL334b-UK4-unsplash-1-1.png" alt="sofa" />
                    </div>
                    
                </div>
            </div>
        </div>

    </div>
  )
}
