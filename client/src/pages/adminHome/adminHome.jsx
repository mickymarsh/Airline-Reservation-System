import React from 'react';
import AdminNavBar from "../../components/adminNavBar/adminNavBar";
import AdminDashBoard from "../../components/adminDashboard/adminDashboard";
import "./adminHome.css";
import { useState, useEffect } from 'react';

const AdminHome = ()=> {
    const [adminName, setAdminName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
    // Fetch the currently logged-in user's details
        const fetchAdminName = async () => {
            try {
            console.log("Token:", localStorage.getItem('token'));

            const response = await fetch('http://localhost:4000/backend/user/getUserName', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include authentication token if required
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setAdminName(data.first_name); // Assuming the response contains a `firstName` field
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchAdminName();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <>
            <AdminNavBar  />
            <AdminDashBoard />
        </>
    )
}

export default AdminHome;