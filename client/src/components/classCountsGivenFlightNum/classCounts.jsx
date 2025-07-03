import React, { useState } from 'react';
import './classCounts.css';

const ClassCounts = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [classDetails, setClassDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!flightNumber.trim()) {
            setError('Please enter a flight number');
            return;
        }

        setLoading(true);
        setError('');
        setClassDetails(null);

        try {
            const response = await fetch('http://localhost:4000/backend/statistics/flight_class_details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming JWT token is stored in localStorage
                },
                body: JSON.stringify({ flight_number: flightNumber })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setClassDetails(data.class_details);
            } else {
                setError(data.message || 'Failed to fetch flight class details');
            }
        } catch (err) {
            console.error('Error fetching flight class details:', err);
            setError('Failed to fetch flight class details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFlightNumber('');
        setClassDetails(null);
        setError('');
    };

    return (
        <div className="class-counts-container">
            <div className="class-counts-card">
                <h2>Flight Class Details</h2>
                <p>Enter a flight number to view seat availability by class</p>

                <form onSubmit={handleSubmit} className="flight-form">
                    <div className="form-group">
                        <label htmlFor="flightNumber">Flight Number:</label>
                        <input
                            type="text"
                            id="flightNumber"
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value)}
                            placeholder="e.g., FL001"
                            className="flight-input"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-buttons">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Get Class Details'}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="reset-btn"
                            disabled={loading}
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {classDetails && (
                    <div className="class-details-results">
                        <h3>Flight {flightNumber} - Class Seat Details</h3>
                        <div className="class-cards">
                            <div className="class-card economy">
                                <div className="class-icon">✈️</div>
                                <h4>Economy Class</h4>
                                <div className="seat-count">{classDetails.economy_class_seats}</div>
                                <p>Available Seats</p>
                            </div>

                            <div className="class-card business">
                                <div className="class-icon">🥂</div>
                                <h4>Business Class</h4>
                                <div className="seat-count">{classDetails.business_class_seats}</div>
                                <p>Available Seats</p>
                            </div>

                            <div className="class-card platinum">
                                <div className="class-icon">👑</div>
                                <h4>Platinum Class</h4>
                                <div className="seat-count">{classDetails.platinum_class_seats}</div>
                                <p>Available Seats</p>
                            </div>
                        </div>

                        <div className="total-seats">
                            <strong>
                                Total Seats: {
                                    classDetails.economy_class_seats +
                                    classDetails.business_class_seats +
                                    classDetails.platinum_class_seats
                                }
                            </strong>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassCounts;