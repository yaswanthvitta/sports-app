/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// First we will import the API_ENDPOINT constant from the `config` folder
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

const UpdatePassword: React.FC = () => {
const token = localStorage.getItem("authToken") ?? "";
  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setPassword] = useState('');
  const navigate = useNavigate() 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      
      console.log(token)
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ current_password, new_password }),
      });

      if (!response.ok) {
        throw new Error('Password update failed');
      }

      console.log('Password update successful');
      
      const data = await response.json();
      console.log(data)

      navigate("/matches");

    } catch (error) {
      console.error('Password update failed:', error);
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
            <label className="block text-gray-700 font-semibold mb-2">current password:</label>
            <input type="text" name="current password" id="current password" value={current_password} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
        </div>
        <div>
            <label className="block text-gray-700 font-semibold mb-2">New Password:</label>
            <input type="password" name="password" id="password" value={new_password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
        </div>
        <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign In</button>
        </form>
    </div>
  );
};

export default UpdatePassword;