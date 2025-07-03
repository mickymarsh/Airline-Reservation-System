import React, { useState, useEffect } from 'react';
import './getFlightNum.css';

const GetFlightNumber = () => {
    const [flightCount, setFlightCount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchFlightCount = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('Fetching flight count from API...');

            const response = await fetch('http://localhost:8800/backend/admin/getFlightCount', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                setFlightCount(data.count || data.flight_count || 0);
            } else {
                setError(data.message || 'Failed to fetch flight count');
            }

        } catch (err) {
            console.error('Error fetching flight count:', err);
            setError('Failed to fetch flight count. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch flight count on component mount
    useEffect(() => {
        fetchFlightCount();
    }, []);

    const handleRefresh = () => {
        fetchFlightCount();
    };

    return (
        <div className="flight-count-container">
            <div className="flight-count-card">
                <h2>Current Flight Count</h2>
                <p>Total number of flights in the system</p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="count-display">
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <div className="count-value">
                            <div className="count-icon">✈️</div>
                            <div className="count-number">{flightCount !== null ? flightCount : '--'}</div>
                            <div className="count-label">Total Flights</div>
                        </div>
                    )}
                </div>

                <div className="action-buttons">
                    <button
                        onClick={handleRefresh}
                        className="refresh-btn"
                        disabled={loading}
                    >
                        {loading ? 'Refreshing...' : '🔄 Refresh Count'}
                    </button>
                </div>

                {flightCount !== null && !loading && (
                    <div className="additional-info">
                        <div className="info-item">
                            <span className="info-label">Last Updated:</span>
                            <span className="info-value">{new Date().toLocaleTimeString()}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Status:</span>
                            <span className="info-value status-active">✓ Active</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetFlightNumber;