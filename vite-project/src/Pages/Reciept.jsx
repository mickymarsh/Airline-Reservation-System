import { useFlight } from "../context/Fliightcontext"; 

import { useNavigate } from "react-router-dom";

function Reciept() {
  const { scheduleId, selectedSeats, setScheduleId, setSelectedSeats } = useFlight();
  const navigate = useNavigate();

  const handleCancel = () => {
    setScheduleId(null);
    setSelectedSeats([]);
    navigate("/"); // go back to homepage
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Booking for Schedule ID: {scheduleId}
      </h2>

      {selectedSeats.map((seat) => (
        <BookingReceipt
          key={seat.seat_no}
          seatNo={seat.seat_no}
          scheduleId={scheduleId}
        />
      ))}

      <button
        onClick={handleCancel}
        className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go Back
      </button>
    </div>
  );
}




import React, { useEffect, useState } from "react";

function BookingReceipt({ scheduleId, seatNo }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBooking() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8800/api/bookings?scheduleId=${scheduleId}&seatNo=${seatNo}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch booking data");
        }

        const data = await response.json();
        setBooking(data || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getBooking();
  }, [scheduleId, seatNo]);

  if (loading)
    return (
      <p className="text-gray-600">Loading booking details for seat {seatNo}...</p>
    );

  if (error)
    return (
      <p className="text-red-600 font-semibold">Error: {error}</p>
    );

  if (!booking) {
    return (
      <div className="bg-white shadow p-4 rounded border border-gray-300 mb-4">
        <p className="text-black">
          You have reserved seat <strong>{seatNo}</strong>, but there is no
          booking yet.
        </p>
        <p className="text-gray-700 mt-2">
          If you don’t want to book this seat, no worries—reservation will be
          cancelled. If you want to book, please book again for this seat.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-blue-300 shadow-md rounded p-4 mb-4">
      <h4 className="text-xl font-bold text-black mb-2">Seat Number: {seatNo}</h4>
      <p><span className="text-gray-700 font-semibold">Schedule ID:</span> {booking.schedule_id}</p>
      <p><span className="text-gray-700 font-semibold">Passenger ID:</span> {booking.passenger_id}</p>
      <p><span className="text-gray-700 font-semibold">Ticket Price:</span> ${booking.ticket_price}</p>
      <p><span className="text-gray-700 font-semibold">Booking Date:</span> {new Date(booking.booking_date).toLocaleString()}</p>
    </div>
  );
}





export default Reciept