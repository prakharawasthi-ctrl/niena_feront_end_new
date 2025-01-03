"use client"; // Mark this file as a client component

import { useState, useEffect } from "react";
import '../globals.css'; // Import the CSS file
import axios from "axios"; // Import axios for API calls

interface Booking {
  _id: string;  // Assuming you are using MongoDB and each booking has an "_id"
  name: string;
  date: string;
  time: string;
  guests: number;
  contact: string;
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch data from the backend API
        const response = await axios.get("http://localhost:5000/api/read");
        setBookings(response.data); // Set fetched data into the bookings state
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage("Error fetching bookings: " + error.response?.data?.error || "Something went wrong.");
        } else {
          setMessage("Something went wrong.");
        }
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // Send a delete request to the backend API
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      // Filter out the deleted booking from the state
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id)); 
      setMessage("Booking deleted successfully.");
    } catch (error) {
      setMessage("Error deleting booking: " + (error.response?.data?.error || "Something went wrong."));
    }
  };

  return (
    <div className="booking-list">
      <h2>Bookings</h2>
      {message && <p>{message}</p>}
      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}> {/* Keep the existing key */}
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>{booking.contact}</td>
                <td>
                  <button onClick={() => handleDelete(booking._id)}>Delete</button> {/* Added delete button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingList;
