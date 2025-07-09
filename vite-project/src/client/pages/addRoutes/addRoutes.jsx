import React from 'react';
import AdminNavBar from "../../components/adminNavBar/adminNavBar";
import "./addRoutes.css";
import { useState, useEffect } from 'react';
import RouteAddForm from '../../components/addRouteAdmin/addRoute';

const AddRoutesPage = () => {
    const [adminName, setAdminName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the currently logged-in user's details
        const fetchAdminName = async () => {
            try {
                console.log("Token:", localStorage.getItem('token'));

                const response = await fetch('http://localhost:8800/backend/user/getUserName', {
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

    const handleAddRoute = async (routeData) => {
        try {
            const response = await fetch('http://localhost:8800/backend/routes/addRoute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(routeData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add route');
            }

            const data = await response.json();
            console.log('Route added successfully:', data);
            alert('Route added successfully!'); // Simple success notification
        } catch (err) {
            console.error('Error adding route:', err);
            alert(`Error: ${err.message}`); // Simple error notification
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <>
            <AdminNavBar adminName={adminName} />
            <RouteAddForm onSubmit={handleAddRoute} />
        </>
    )
}

export default AddRoutesPage;