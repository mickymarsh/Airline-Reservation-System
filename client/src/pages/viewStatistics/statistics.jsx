import React from 'react';
import AdminNavBar from '../../components/adminNavBar/adminNavBar';
import ClassCounts from '../../components/classCountsGivenFlightNum/classCounts';
import './statistics.css';

const Statistics = () => {
    return (
        <div className="statistics-page">
            <AdminNavBar />
            <div className="statistics-content">
                <div className="page-header">
                    <h1>Flight Statistics</h1>
                    <p>View detailed passenger statistics for specific flights</p>
                </div>
                <ClassCounts />
            </div>
        </div>
    );
};

export default Statistics;