import React from 'react';
import AdminNavBar from "../../components/adminNavBar/adminNavBar";
import "./addAircraft.css";
import { useState, useEffect } from 'react';
import AircraftAddForm from '../../components/addAircraft/addAircraft';

const AddAircraftPage = () => {
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

    const handleAddAircraft = async (aircraftData) => {
        try {
            const response = await fetch('http://localhost:8800/backend/admin/addAircraft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(aircraftData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add aircraft');
            }

            const data = await response.json();
            console.log('Aircraft added successfully:', data);
            alert('Aircraft added successfully!'); // Simple success notification
        } catch (err) {
            console.error('Error adding aircraft:', err);
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
            <AircraftAddForm onSubmit={handleAddAircraft} />
        </>
    )
}

export default AddAircraftPage;