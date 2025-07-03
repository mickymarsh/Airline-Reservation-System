import React, { useState } from 'react';
import './aircraftServiceForm.css';


const AircraftServiceDateForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        last_service_date: ''

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updating Last Service Date', formData);
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Update Last Service Date</h2>
                <div className="input-group">
                    <label>Brand</label>
                    <input type="text" name="brand" placeholder="Enter brand" value={formData.brand} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Model</label>
                    <input type="text" name="model" placeholder="Enter aircraft model" value={formData.model} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Last Service Date</label>
                    <input type="date" name="last_service_date" value={formData.last_service_date} onChange={handleChange} required />
                </div>
                

                <button type="submit" className="add-button">Update</button>
            </form>
        </div>
    );
};

export default AircraftServiceDateForm;
