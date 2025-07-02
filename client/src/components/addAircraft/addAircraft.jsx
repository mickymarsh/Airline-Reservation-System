import React, { useState } from 'react';
import './addAircraft.css';


const AircraftAddForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        last_service_date: '',
        purchase_date: '',
        manufactured_date: ''

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Adding aircraft', formData);
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Add New Aircraft</h2>
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
                <div className="input-group">
                    <label>Purchase Date</label>
                    <input type="date" name="purchase_date" value={formData.purchase_date} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Manufactured Date</label>
                    <input type="date" name="manufactured_date" value={formData.manufactured_date} onChange={handleChange} required />
                </div>

                <button type="submit" className="add-button">Add Aircraft</button>
            </form>
        </div>
    );
};

export default AircraftAddForm;
