import { useState } from "react";
import { useFlight } from "../context/Fliightcontext";
import { Link, useNavigate } from "react-router-dom";

function Booking() {
    const { scheduleId, selectedSeats, setScheduleId, setSelectedSeats } = useFlight();
    const navigate = useNavigate();

    const handleCancel = () => {
        setScheduleId(null);
        setSelectedSeats([]);
        navigate("/");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
                Booking for Schedule ID: {scheduleId}
            </h2>
            <button
                onClick={handleCancel}
                className="mb-4 px-4 py-2 bg-[#800000] text-white rounded hover:bg-gray-800"
            >
                Cancel
            </button>

            

            {selectedSeats.map((seat) => (
                <BookingForm
                    key={seat.seat_no}
                    seatNo={seat.seat_no}
                    scheduleId={scheduleId}
                />
            ))}

            <Link to="/receipt">
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Continue
                </button>
            </Link>
        </div>
    );
}

function BookingForm({ seatNo, scheduleId }) {
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "Male",
        dob: "",
        passportNumber: "",
        mobile: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFetchUser = async () => {
        if (!formData.email) return alert("Enter email first.");
        try {
            const res = await fetch(
                `http://localhost:8800/api/user-info?email=${formData.email}`
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Fetch failed");

            const dobDateOnly = data.D_O_B?.split("T")[0];

            setFormData((prev) => ({
                ...prev,
                fullName: data.full_name,
                gender: data.gender,
                dob: dobDateOnly,
                passportNumber: data.passport_number,
                mobile: data.mobile_num,
            }));
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmit = async () => {
        try {
            const endpoint = isRegistered
                ? "http://localhost:8800/api/registered-booking"
                : "http://localhost:8800/api/guest-booking";

            const payload = isRegistered
                ? {
                      p_email: formData.email,
                      p_schedule_id: scheduleId,
                      p_seat_no: seatNo,
                  }
                : {
                      p_full_name: formData.fullName,
                      p_gender: formData.gender,
                      p_D_O_B: formData.dob,
                      p_passport_number: formData.passportNumber,
                      p_mobile_num: formData.mobile,
                      p_schedule_id: scheduleId,
                      p_seat_no: seatNo,
                  };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Booking failed");

            alert(`Booking successful for seat ${seatNo}`);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="bg-white border border-gray-300 rounded p-4 mb-6 shadow-sm">
            <h4 className="text-lg font-semibold text-blue-600 mb-2">Seat: {seatNo}</h4>

            <label className="flex items-center gap-2 mb-4 text-gray-700">
                <input
                    type="checkbox"
                    checked={isRegistered}
                    onChange={() => setIsRegistered(!isRegistered)}
                    className="accent-blue-600"
                />
                Are you a registered user?
            </label>

            <div className="mb-3">
                <label className="block text-sm text-gray-600">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
                {isRegistered && (
                    <button
                        onClick={handleFetchUser}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Fetch Info
                    </button>
                )}
            </div>

            <div className="mb-3">
                <label className="block text-sm text-gray-600">Full Name</label>
                <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm text-gray-600">Gender</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="block text-sm text-gray-600">Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm text-gray-600">Passport No</label>
                <input
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm text-gray-600">Mobile</label>
                <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
                Submit Booking
            </button>
        </div>
    );
}

export default Booking;
