import React , { useState } from 'react'
import {AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link, useNavigate} from 'react-router-dom';

const Navbar = ({user, setUser}) => {
    const [nav, setNav] = useState(true);
    const navigate = useNavigate();

    const handleNav = () => {
        setNav(!nav);
    }

    const handleLogout = () => {
        setUser(null); // Clear the user from the state
        navigate('/'); // Redirect to the homepage or another appropriate page
        alert('You have been logged out.');
    }

    return (
        <div >
            <div className='text-white flex justify-between items-center h-24 mx-auto p-4 max-w-7xl font-mono font-medium text-lg'>
                <h1 className="w-full text-3xl font-bold "><Link to="/">Loop Web</Link></h1>
                <ul className='hidden md:flex'>
                    <li className="p-4"><Link to="/">Home</Link></li>
                    <li className="p-4">About</li>
                    {user ? (
                        <>
                            {/* Logged In */}
                            <li className="p-4 whitespace-nowrap"><Link to="/Profile">My Profile</Link></li>
                            <li className="p-4"><button onClick={handleLogout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            {/* Not Logged In */}
                            <li className="p-4"><Link to="/Signup">Signup</Link></li>
                            <li className="p-4"><Link to="/Login">Login</Link></li>
                        </>
                    )}
                </ul>
                <div onClick={handleNav} className='block md:hidden'>
                    {!nav ? <AiOutlineClose size={30}/> : <AiOutlineMenu size={30}/>}
                </div>
            </div>
            <div className={!nav ? 'text-white fixed left-0 top-0 w-[80%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'w-[80%] top-0 ease-in-out duration-1000 text-white h-full border-r border-r-gray-900 bg-[#000300] fixed left-[-100%]'}>
                <ul className='flex flex-col'>
                    <li className = "p-4 border-b border-gray-600">Home</li>
                    <li className = "p-4 border-b border-gray-600">About</li>
                    <li className = "p-4 border-b border-gray-600">Signup</li>
                    <li className = "p-4 border-b border-gray-600">Login</li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar