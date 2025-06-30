import { useFlight } from "../context/Fliightcontext";  // Adjust path



function Booking (){
    const { flightId, scheduleId, selectedSeats, setSelectedSeats } = useFlight();
    
    return(
        <div>Hello this is booking for {scheduleId} - Flight <br></br> 
        AND you are which to book {selectedSeats.map(seat => seat.seat_no).join(', ')}</div>
    )
}

export default Booking