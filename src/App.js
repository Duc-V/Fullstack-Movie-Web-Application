import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Movie from './fragments/Movie';
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Navbar from './fragments/Navbar'
import Profile from './pages/Profile.js'
import Movies from './fragments/data'
import './App.css';
import PrivateRoute from './PrivateRoute';


function App() {



  const [user, setUser] = useState(null);

    // load the movie data into the localstorage
    useEffect(() => {
      localStorage.setItem('movies', JSON.stringify(Movies));
    }, [user])
  console.log('rerender')
  return (
    <Router>
      <div className=" bg-black h-screen">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/movie/:id" element={<Movie user={user}/>}/>
          <Route path="/" element={<Home />} /> { /*change to Home/*/}
          <Route path="/Login" element={<Login setUser={setUser} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route 
            path="/Profile"
            element={
              <PrivateRoute user={user}>
                <Profile user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
