import React from "react";
import BookingForm from "./BookingForm/page";
import BookingList from "./BookingList/page";

export default function Home() {
  return (
    <div >
      <BookingList/>
      <BookingForm/>
    </div>
  );
}
