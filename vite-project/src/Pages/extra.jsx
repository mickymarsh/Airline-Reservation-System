import React from 'react';
import { useFlight } from "../context/Fliightcontext";  // Adjust path

import { useState, useEffect } from 'react';

const Seat = () => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { flightId, scheduleId } = useFlight();

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/seatlist?schedule_id=${scheduleId}`);
                if (!response.ok) throw new Error('Failed to fetch seats');
                const data = await response.json();
                setSeats(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSeats();
    }, [scheduleId]);

    const handleSeatClick = (seat) => {
        if (seat.seat_status !== 'Available') return;

        const isSelected = selectedSeats.some(s => s.seat_no === seat.seat_no);
        
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter(s => s.seat_no !== seat.seat_no));
        } else {
            if (selectedSeats.length >= 3) {
                alert('You can select a maximum of 3 seats');
                return;
            }
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    if (loading) return <div className="text-center py-8">Loading seats...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">
                Seat Selection - Schedule #{scheduleId}
            </h1>
            
            <div className="mb-4 text-center">
                <p className="text-lg">
                    Maximum <span className="font-bold">3 seats</span> can be selected per person
                </p>
                {selectedSeats.length > 0 && (
                    <p className="text-blue-600 mt-2">
                        Selected: {selectedSeats.map(s => s.seat_no).join(', ')}
                    </p>
                )}
            </div>

            {/* Seat Legend */}
            <div className="flex justify-center gap-6 mb-8">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 mr-2"></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-500 mr-2"></div>
                    <span>Occupied</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-yellow-500 mr-2"></div>
                    <span>Pending</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 mr-2 border-2 border-blue-700"></div>
                    <span>Selected</span>
                </div>
            </div>

            {/* Seat Grid */}
            <div className="grid grid-cols-10 gap-3 justify-center">
                {seats.map(seat => {
                    let bgColor = '';
                    let cursor = 'cursor-pointer';
                    
                    if (seat.seat_status === 'Available') {
                        bgColor = selectedSeats.some(s => s.seat_no === seat.seat_no) 
                            ? 'bg-blue-500 border-2 border-blue-700' 
                            : 'bg-green-500 hover:bg-green-600';
                    } else if (seat.seat_status === 'Occupied') {
                        bgColor = 'bg-red-500';
                        cursor = 'cursor-not-allowed';
                    } else if (seat.seat_status === 'Pending') {
                        bgColor = 'bg-yellow-500';
                        cursor = 'cursor-not-allowed';
                    }

                    return (
                        <div
                            key={`${seat.schedule_id}-${seat.seat_no}`}
                            className={`w-12 h-12 flex items-center justify-center rounded-md text-white font-medium ${bgColor} ${cursor} transition-colors shadow-md`}
                            onClick={() => handleSeatClick(seat)}
                        >
                            {seat.seat_no}
                        </div>
                    );
                })}
            </div>

            {/* Seat Types */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Seat Types</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-medium text-purple-700">Platinum</h3>
                        <p className="text-gray-600">Premium seating with extra space</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-medium text-blue-700">Business</h3>
                        <p className="text-gray-600">Comfortable seating</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-medium text-green-700">Economy</h3>
                        <p className="text-gray-600">Standard seating</p>
                    </div>
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="mt-8 text-center">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Proceed to Payment ({selectedSeats.length} seats selected)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Seat;