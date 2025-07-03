import { AuthContext } from "../context/Authcontext";
import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import image from "../assets/1.jpeg"


function History() {
    const { currentUser } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/history?email=${currentUser.user.email}`);
                setBookings(res.data);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        };

        if (currentUser?.user?.email) {
            fetchBookings();
        }
    }, [currentUser]);
    
    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed relative" 
             style={{
                 backgroundImage: image,
             }}>
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6"> {/* z-10 to place above the overlay */}
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                    {currentUser.user.first_name} {currentUser.user.last_name}'s booking history :
                </h2>

                {bookings.length > 0 ? (
                    <ul className="space-y-2">
                        {bookings.map((booking, index) => (
                            <li key={index} className="bg-white shadow p-4 rounded">
                                <p><strong>Date:</strong> {booking.booking_date}</p>
                                <p><strong>Schedule ID:</strong> {booking.schedule_id}</p>
                                <p><strong>Seat No:</strong> {booking.seat_no}</p>
                                <p><strong>Price:</strong> {booking.ticket_price}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found.</p>
                )}

                <button className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default History;