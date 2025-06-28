import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddTicketMain from "./../components/tickets/AddTicketMain";

const AddTicket = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddTicketMain />
      </main>
    </>
  );
};

export default AddTicket;
