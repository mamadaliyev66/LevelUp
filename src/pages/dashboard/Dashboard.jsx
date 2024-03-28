import React from 'react'
import { auth } from "../../firebase/config";
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
  const navigate = useNavigate();

  if (!auth.currentUser) {
    navigate('/login')
  }else{
    console.log(auth.currentUser);
  }

  return (
    <div>Dashboard</div>
  )
}
