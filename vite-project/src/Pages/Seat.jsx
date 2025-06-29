import { useState, useEffect } from 'react';
import { useFlight } from "../context/Fliightcontext";  // Adjust path


const SeatSelection = () => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Add error state

    const { flightId, scheduleId } = useFlight();

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                console.log("scheduleId:", scheduleId);
                const response = await fetch(`http://localhost:8800/api/seatlist?schedule_id=${scheduleId}`);
                if (!response.ok) throw new Error('Failed to fetch seats');
                const data = await response.json();
                console.log("Fetched seat data:", data);
                setSeats(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSeats();  // CALL THE FUNCTION
    }, [scheduleId]);

    if (loading) return <div className="text-center py-8">Loading seats...</div>;
    if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

    console.log(seats)

    const handleSeatClick = (seat) => {
        if (seat.seat_status !== "Available") return;

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

    // Group seats into rows of 8 (4 left, 4 right)
    const groupSeatsIntoRows = (seats) => {
        const rows = [];
        let currentRow = [];
        
        seats.forEach((seat, index) => {
            currentRow.push(seat);
            
            if (currentRow.length === 8 || index === seats.length - 1) {
                rows.push(currentRow);
                currentRow = [];
            }
        });
        
        return rows;
    };

    const seatRows = groupSeatsIntoRows(seats);

    if (loading) return <div className="text-center py-8">Loading seats...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
                Seats Selection - Schedule {scheduleId}
            </h1>
            
            <div className="mb-6 text-center">
                <p className="text-lg font-medium">
                    Select up to <span className="font-bold text-blue-600">3 seats</span>
                </p>
                {selectedSeats.length > 0 && (
                    <p className="text-blue-600 mt-2 font-medium">
                        Selected: {selectedSeats.map(s => s.seat_no).join(', ')}
                    </p>
                )}
            </div>

            {/* Seat Layout */}
            <div className="space-y-8">
                {seatRows.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="flex justify-between">
                        {/* Left section (4 seats) */}
                        <div className="flex space-x-3">
                            {row.slice(0, 4).map(seat => (
                                <SeatBox 
                                    key={seat.seat_no}
                                    seat={seat}
                                    isSelected={selectedSeats.some(s => s.seat_no === seat.seat_no)}
                                    onClick={handleSeatClick}
                                />
                            ))}
                        </div>
                        
                        {/* Right section (4 seats or remaining seats) */}
                        <div className="flex space-x-3">
                            {row.length > 4 ? (
                                row.slice(4, 8).map(seat => (
                                    <SeatBox 
                                        key={seat.seat_no}
                                        seat={seat}
                                        isSelected={selectedSeats.some(s => s.seat_no === seat.seat_no)}
                                        onClick={handleSeatClick}
                                    />
                                ))
                            ) : (
                                // If less than 8 seats, leave empty space on right
                                <div className="w-[168px]"></div> // 4 seats * (36px + 12px spacing)
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-8">
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 mr-2 rounded-sm"></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-red-500 mr-2 rounded-sm"></div>
                    <span>Occupied</span>
                </div>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-blue-500 mr-2 rounded-sm border-2 border-blue-700"></div>
                    <span>Selected</span>
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="mt-8 text-center">
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                        Continue with {selectedSeats.length} Selected Seat{selectedSeats.length !== 1 ? 's' : ''}
                    </button>
                </div>
            )}
        </div>
    );
};

// Separate component for seat box
const SeatBox = ({ seat, isSelected, onClick }) => {
    const isAvailable = seat.seat_status === "Available";

    return (
        <div
            className={`
                w-18 h-18 flex items-center justify-center rounded-md
                text-sm font-medium
                ${isAvailable 
                    ? isSelected
                        ? 'bg-blue-500 border-2 border-blue-700 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                    : 'bg-red-500 text-white cursor-not-allowed'
                }
                transition-all shadow-md
            `}
            onClick={() => onClick(seat)}
            title={`Seat ${seat.seat_no} - ${seat.seat_status}`}
        >
            {seat.seat_no}
        </div>
    );
};

export default SeatSelection;