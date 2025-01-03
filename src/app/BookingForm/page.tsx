"use client";

import React, { useState } from "react";
// import '../app/globals.css'; // Ensure this path is correct

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      date: formData.date ? "" : "Date is required.",
      time: formData.time ? "" : "Time is required.",
      guests: formData.guests && +formData.guests > 0 ? "" : "Number of guests must be at least 1.",
      name: formData.name ? "" : "Name is required.",
      contact: formData.contact && /^[0-9]{10}$/.test(formData.contact)
        ? ""
        : "Contact must be a valid 10-digit number.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await fetch('http://localhost:5000/api/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert('Reservation successfully submitted!');
          setFormData({
            date: "",
            time: "",
            guests: "",
            name: "",
            contact: "",
          });
        } else {
          // Check if the error is a slot conflict (400 status)
          const errorData = await res.json();
          if (res.status === 400 && errorData.error) {
            alert(errorData.error); // Display slot already booked message
          } else {
            console.error(errorData);
            alert("Error submitting reservation. Please try again later.");
          }
        }
      } catch (error) {
        console.error('Error submitting reservation:', error);
        alert("Error submitting reservation. Please try again later.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 sm:p-8 max-w-lg w-full space-y-6"
    >
      <h1 className="text-2xl font-bold text-center text-gray-900">Book a Table</h1>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className={`mt-1 block w-full border rounded p-2 ${errors.date ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-black">
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          className={`mt-1 block w-full border rounded p-2 ${errors.time ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
          Number of Guests
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleInputChange}
          min="1"
          className={`mt-1 block w-full border rounded p-2 ${errors.guests ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`mt-1 block w-full border rounded p-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
          Contact Number
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          className={`mt-1 block w-full border rounded p-2 ${errors.contact ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 sm:w-auto sm:self-end"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
