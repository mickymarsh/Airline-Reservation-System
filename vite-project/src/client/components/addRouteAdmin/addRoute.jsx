import React, { useState } from 'react';
import './addRoute.css';


const RouteAddForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        source_code: '',
        destination_code: '',
        duration: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Adding route', formData);
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Add New Route</h2>
                <div className="input-group">
                    <label>Source Airport Code</label>
                    <input type="text" name="source_code" placeholder="Enter source code (e.g., JFK)" value={formData.source_code} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Destination Airport Code</label>
                    <input type="text" name="destination_code" placeholder="Enter destination code (e.g., LAX)" value={formData.destination_code} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Flight Duration (minutes)</label>
                    <input type="number" name="duration" placeholder="Enter flight duration in minutes" value={formData.duration} onChange={handleChange} required />
                </div>

                <button type="submit" className="add-button">Add Route</button>
            </form>
        </div>
    );
};

export default RouteAddForm;
