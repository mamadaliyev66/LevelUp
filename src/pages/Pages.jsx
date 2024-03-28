import Main from "./main/Main";
import About from "./about/About";
import Courses from "./courses/Courses";
import Members from "./members/Members";
import Sponsors from "./sponsors/Sponsors";
import Contact from "./contact/Contact";
import Ideas from "./ideas/Ideas";
import Member from "./member/Member";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Logout from "../authentication/Logout";
import Dashboard from "./dashboard/Dashboard";
import Course from "../course/course";

import { AnimatePresence } from 'framer-motion'
import { Routes,Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from 'react'

export default function Pages() {
    const location= useLocation()

    return (
    <AnimatePresence >
    <Routes location={location}>
      <Route path="/" element={<Main/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/courses" element={<Courses/>} />
      <Route path="courses/course/:id" element={<Course/>} />
      <Route path="/sponsors" element={<Sponsors/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/ideas" element={<Ideas/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/members" element={<Members/>} />
      <Route path="/members/:id" element={<Member/>} />
    </Routes>
    </AnimatePresence>
  )
}




