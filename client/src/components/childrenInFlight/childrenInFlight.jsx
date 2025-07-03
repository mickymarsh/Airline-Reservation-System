import React, { useState } from 'react';
import './childrenInFlight.css';

const ChildrenInFlight = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [childrenData, setChildrenData] = useState(null);
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
        setChildrenData(null);

        try {
            console.log('Fetching children data for flight:', flightNumber);

            const response = await fetch('http://localhost:4000/backend/statistics/flight_children_ids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ flight_number: flightNumber })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            setChildrenData(data);

        } catch (err) {
            console.error('Error fetching children data:', err);
            setError('Failed to fetch children passenger data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFlightNumber('');
        setChildrenData(null);
        setError('');
    };

    return (
        <div className="children-flight-container">
            <div className="children-flight-card">
                <h2>Children Passengers in Flight</h2>
                <p>Enter a flight number to view child passengers (under 18 years)</p>

                <form onSubmit={handleSubmit} className="flight-form">
                    <div className="form-group">
                        <label htmlFor="flightNumber">Flight Number:</label>
                        <input
                            type="text"
                            id="flightNumber"
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value)}
                            placeholder="e.g., FL003"
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
                            {loading ? 'Loading...' : 'Get Children Data'}
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

                {childrenData && (
                    <div className="children-results">
                        <div className="results-header">
                            <h3>Flight {flightNumber} - Children Passengers</h3>
                        </div>

                        <div className="summary-card">
                            <div className="summary-icon">👶</div>
                            <div className="summary-content">
                                <h4>Total Children</h4>
                                <div className="total-count">{childrenData.total_children}</div>
                                <p>Passengers under 18 years</p>
                            </div>
                        </div>

                        {childrenData.children_passenger_ids && childrenData.children_passenger_ids.length > 0 ? (
                            <div className="passenger-ids-section">
                                <h4>Child Passenger IDs</h4>
                                <div className="passenger-ids-grid">
                                    {childrenData.children_passenger_ids.map((passengerId, index) => (
                                        <div key={passengerId} className="passenger-id-card">
                                            <div className="passenger-number">#{index + 1}</div>
                                            <div className="passenger-id">ID: {passengerId}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="no-children-message">
                                <div className="no-children-icon">😊</div>
                                <h4>No Children Passengers</h4>
                                <p>This flight has no passengers under 18 years of age.</p>
                            </div>
                        )}

                        <div className="additional-info">
                            <div className="info-item">
                                <span className="info-label">Flight Number:</span>
                                <span className="info-value">{flightNumber}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Child Passengers:</span>
                                <span className="info-value">{childrenData.total_children} found</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Age Criteria:</span>
                                <span className="info-value">Under 18 years</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChildrenInFlight;