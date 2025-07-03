import React from 'react';
import AdminNavBar from "../../components/adminNavBar/adminNavBar";
import "./updateServiceDate.css";
import { useState, useEffect } from 'react';
import AircraftServiceDateForm from '../../components/aircraftServiceForm/aircraftServiceForm';

const UpdateAircraftPage = () => {
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

  const handleServiceDate = async (aircraftServiceData) => {
    try {
      const response = await fetch('http://localhost:4000/backend/admin/updateAircraftServiceDate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(aircraftServiceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update Service Date');
      }

      const data = await response.json();
      console.log('Updated Aircraft Service Date:', data);
      alert('Aircraft details updated successfully!'); // Simple success notification
    } catch (err) {
      console.error('Error updating aircraft details:', err);
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
      <AircraftServiceDateForm onSubmit={handleServiceDate} />
    </>
  )
}

export default UpdateAircraftPage;