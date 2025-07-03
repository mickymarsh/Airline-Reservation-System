import React, { useState } from 'react';
import './addFlight.css';

const AddFlightForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        route_id: '',
        aircraft_id: '',
        departure_time: '',
        arrival_time: '',
        status: 'Upcoming', // Default status
        economy_price: '',
        business_price: '',
        platinum_price: '',
        flight_number: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            console.log('Adding flight', formData);

            const response = await fetch('http://localhost:4000/backend/admin/addFlight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess('Flight added successfully!');
                // Reset form
                setFormData({
                    route_id: '',
                    aircraft_id: '',
                    departure_time: '',
                    arrival_time: '',
                    status: 'Upcoming',
                    economy_price: '',
                    business_price: '',
                    platinum_price: '',
                    flight_number: ''
                });

                if (onSubmit) {
                    onSubmit(formData);
                }
            } else {
                setError(data.message || 'Failed to add flight');
            }
        } catch (err) {
            console.error('Error adding flight:', err);
            setError('Failed to add flight. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Add New Flight</h2>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <div className="input-group">
                    <label>Route ID</label>
                    <input
                        type="number"
                        name="route_id"
                        placeholder="Enter route ID"
                        value={formData.route_id}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="input-group">
                    <label>Aircraft ID</label>
                    <input
                        type="number"
                        name="aircraft_id"
                        placeholder="Enter aircraft ID"
                        value={formData.aircraft_id}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="input-group">
                    <label>Flight Number</label>
                    <input
                        type="text"
                        name="flight_number"
                        placeholder="e.g., FL001"
                        value={formData.flight_number}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="input-group">
                    <label>Departure Time</label>
                    <input
                        type="datetime-local"
                        name="departure_time"
                        value={formData.departure_time}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="input-group">
                    <label>Arrival Time</label>
                    <input
                        type="datetime-local"
                        name="arrival_time"
                        value={formData.arrival_time}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="input-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    >
                        <option value="Upcoming">Upcoming</option>
                    </select>
                </div>

                <div className="pricing-section">
                    <h3>Pricing</h3>
                    <div className="price-row">
                        <div className="input-group">
                            <label>Economy Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="economy_price"
                                placeholder="0.00"
                                value={formData.economy_price}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="input-group">
                            <label>Business Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="business_price"
                                placeholder="0.00"
                                value={formData.business_price}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="input-group">
                            <label>Platinum Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="platinum_price"
                                placeholder="0.00"
                                value={formData.platinum_price}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="add-button" disabled={loading}>
                    {loading ? 'Adding Flight...' : 'Add Flight'}
                </button>
            </form>
        </div>
    );
};

export default AddFlightForm;
