import React from 'react';
import AdminNavBar from '../../components/adminNavBar/adminNavBar';
import AddFlightForm from '../../components/addFlight/addFlight';
import './addFlight.css';
import GetFlightNumber from '../../components/getFlightNumber/getFlightNum';

const AddFlightPage = () => {
    const handleFlightAdded = (flightData) => {
        console.log('Flight added successfully:', flightData);
        // You can add additional logic here if needed
        // For example, redirecting to a different page or showing a notification
    };

    return (
        <div className="add-flight-page">
            <AdminNavBar />
            <div className="page-content">
                <div className="page-header">
                    <h1>Flight Management</h1>
                    <p>Add new flights to the system</p>
                </div>
                <GetFlightNumber />
                <AddFlightForm onSubmit={handleFlightAdded} />
            </div>
        </div>
    );
};

export default AddFlightPage;