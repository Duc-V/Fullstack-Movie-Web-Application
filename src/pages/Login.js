import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    // Function to handle sign up
    const handleLogin = () => {
        // Retrieve existing users from local storage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Find a user with matching email and password
        const loggedInUser = existingUsers.find(user => user.email === email && user.password === password);
        
        if (loggedInUser) {
            setUser(loggedInUser); // set the current user state to the user logged in
            navigate('/Profile');
            alert('Login successful!');
            
          }
        else {
            alert('Login failed. Please check your credentials.');
          }

        // Clear input fields
        setEmail('');
        setPassword('');
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Log in</h2>
                <input
                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300 mb-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300 mb-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
                    onClick={handleLogin}
                >
                    Log in
                </button>
                <p className="text-gray-600 mt-2">
                    Don't have an account? {' '}
                    <Link to="/Signup" className="text-blue-500 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default Login;