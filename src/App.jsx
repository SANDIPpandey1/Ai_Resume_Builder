import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Headers from './components/ui/custom/header'


function App() {

  //sign in

  const {user, isSignedIn,  isLoaded} = useUser();
  if(!isSignedIn&&isLoaded){
    return <Navigate to = {'auth/sign-in'}/>
  }


  return (
    <>
    <Headers/>
    <Outlet/>
  
    </>
  )
}

export default App
