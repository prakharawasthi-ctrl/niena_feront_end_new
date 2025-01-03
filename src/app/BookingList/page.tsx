"use client"; // Mark this file as a client component

import { useState, useEffect } from "react";
import '../globals.css'; // Import the CSS file
import axios from "axios"; // Import axios for API calls

interface Booking {
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
        const response = await axios.get("https://prismatic-granita-41b36e.netlify.app/api/read");
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

  // Handle deletion of a booking
  const handleDelete = async (name: string, date: string, time: string) => {
    try {
      // Send DELETE request to the backend with name, date, and time for deletion
      await axios.delete("http://localhost:5000/api/delete", {
        data: { name, date, time }, // Send name, date, and time in the request body
      });

      // Remove the deleted booking from the state
      setBookings((prevBookings) =>
        prevBookings.filter(
          (booking) => !(booking.name === name && booking.date === date && booking.time === time)
        )
      );
      setMessage("Booking deleted successfully.");
    } catch (error) {
      setMessage("Error deleting booking: " + error);

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
            {bookings.map((booking, index) => (
              <tr key={booking.name + index}> {/* Using name and index for uniqueness */}
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>{booking.contact}</td>
                <td>
                  <button onClick={() => handleDelete(booking.name, booking.date, booking.time)}>
                    Delete
                  </button>
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
