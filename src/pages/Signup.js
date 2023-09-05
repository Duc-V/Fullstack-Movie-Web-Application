import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    // State to hold user input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    // Function to handle sign up
    const handleSignUp = () => {
        
        // Simple email and name validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z][a-zA-Z ]*$/;
        if (!nameRegex.test(name)) {
            alert('Please enter a valid name.');
            return;
        }
        else if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Remove leading and trailing whitespace from input fields
        const cleanedName = name.trim();
        const cleanedEmail = email.trim().toLowerCase();

        // Retrieve existing users from local storage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if user already has an account
        const existingUser = existingUsers.find(user => user.email === cleanedEmail);
        if (existingUser) {
            alert('An account with this email already exists.');
            return;
        }

        // Password validation: at least 6 characters, including uppercase, lowercase, and numbers
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 6 characters and include both uppercase, lowercase letters, and numbers.');
            return;
        }

        // Record signup date
        const signUpDate = new Date();

        // Create a new user object
        const newUser = {
            name: cleanedName,
            email: cleanedEmail,
            password,
            signUpDate: signUpDate.toDateString(),
        };

        // Add the new user to the existing users array
        const updatedUsers = [...existingUsers, newUser];

        // Save the updated users array to local storage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Clear input fields
        setName('');
        setEmail('');
        setPassword('');

        // Alert user of success and redirect
        navigate('/Login');
        alert('Signup successful! Please log in with your new account.');
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Sign up</h2>
                <input
                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300 mb-2"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    onClick={handleSignUp}
                >
                    Sign up
                </button>
                <p className="text-gray-600 mt-2">
                    Already have an account?{' '}
                    <Link to="/Login" className="text-blue-500 hover:underline">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;