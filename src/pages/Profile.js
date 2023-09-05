import React, { useState } from 'react';
import { FaUser, FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, setUser }) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState(user.name);
    const [editedEmail, setEditedEmail] = useState(user.email);
    const [editedPassword, setEditedPassword] = useState(user.password);
    const navigate = useNavigate();
    // Simple email and name validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z][a-zA-Z ]*$/;
    // Password validation: at least 6 characters, including uppercase, lowercase, and numbers
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    const handleDelete = () => {
        // Remove user from local storage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = existingUsers.filter(u => u.email !== user.email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        

        // delete all user comments
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const filteredReviews = reviews.filter(review => review.userId !== user.email);
        localStorage.setItem('reviews', JSON.stringify(filteredReviews));

        // Clear user from state and redirect to homepage
        setUser(null);
        alert('Account has been deleted.');
        navigate('/');

    }

    const handleCancelDelete = () => {
        setDeleteConfirm(false);
    }

    const handleSave = () => {
        
        // Validation
        if (!nameRegex.test(editedName)) {
            alert('Please enter a valid name.');
            return;
        }

        else if (!emailRegex.test(editedEmail)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Remove leading and trailing whitespace from input fields
        setEditedName(editedName.trim());
        setEditedEmail(editedEmail.trim().toLowerCase());

        // Retrieve existing users from local storage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if new email user wants to change to already exists, exception is if current user email remains same
        const existingUser = existingUsers.find(user => user.email === editedEmail);
        if (existingUser.email !== user.email) {
            alert('An account with this email already exists.');
            return;
        }
        
        // Check if password is secure
        if (!passwordRegex.test(editedPassword)) {
            alert('Password must be at least 6 characters and include both uppercase, lowercase letters, and numbers.');
            return;
        }

        // Update user details in local storage
        const updatedUsers = existingUsers.map(u => {
            if (u.email === user.email) {
            return { ...u, name: editedName, email: editedEmail, password: editedPassword };
            }
            return u;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Update user details in state
        setUser({ ...user, name: editedName, email: editedEmail, password: editedPassword });
        
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedName(user.name);
        setEditedEmail(user.email);
        setEditedPassword('');
    };
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <div className="text-center">
                    {/*delete pop up*/}
                    {deleteConfirm ? (
                        <div className="mt-4 text-center">
                            <p className="text-red-500">Are you sure you want to delete your account?</p>
                            <div className="mt-2">
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                                <span className="inline-block w-2" />
                                <button
                                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                                    onClick={handleCancelDelete}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : editMode ? (
                        <div className="mt-4 text-center">
                            <p className="text-blue-500">Edit your user details</p>
                            <div className="mt-2">
                                <input
                                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300 mb-2"
                                    type="text"
                                    placeholder='Name'
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                                <input
                                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300 mb-2"
                                    type="email"
                                    placeholder='Email'
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                />
                                <input
                                    className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300 mb-2"
                                    type="password"
                                    placeholder='Password'
                                    value={editedPassword}
                                    onChange={(e) => setEditedPassword(e.target.value)}
                                />

                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <span className="inline-block w-2" />
                                <button
                                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-semibold mb-4">Profile</h1>
                            <div className="flex items-center mb-4">
                                <div className="text-4xl text-blue-500 mr-4">
                                    <FaUser />
                                </div>
                                <div className="flex flex-col">
                                <p className="text-lg font-medium text-left mb-1">{user.name}</p>
                                    <p className="text-gray-600 text-left mb-1">{user.email}</p>
                                    <p className="text-gray-400 text-sm text-left">Joined: {user.signUpDate}</p>
                                </div>
                                <div className="ml-auto">
                                    <FaTrash
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => setDeleteConfirm(true)}
                                    />
                                </div>
                                <div className="ml-auto">
                                    <FaEdit
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => setEditMode(true)}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;