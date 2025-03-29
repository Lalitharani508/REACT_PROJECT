import React ,{useState,useEffect} from "react";
import Navbar1 from "./components/navbar/navbar";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import { onAuthStateChanged } from "firebase/auth";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
// import {Navigate} from 'react-router-dom'
import Dashboard from "./components/dashboard/dashboard";
import { author } from "./firebaseconfig";
// import Landingpage from "./components/landingpage/landingpage";
// import {AddItem} from './components/additem/additem'
// import {AddItem} from './components/additem/additem'



const App = () => {
  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(true)
  useEffect(() => {
    const userloggin = onAuthStateChanged(author, (cuurentuser) => {
      setuser(cuurentuser)
      setloading(false)


    })
    return () => userloggin
  }, [])
  console.log(user)
  if (loading) {
    return <h1>loading...</h1>
  }


  return (
    <div>

      <Navbar1 />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/dashboard' element={user?<Dashboard/>:<Navigate to="/login"/>}></Route>
        {/* <Route path="/giftideas" element={<AddItem/>}></Route> */}
      </Routes>
      {/* <Landingpage/> */}


    </div>

  )
}
export default App;