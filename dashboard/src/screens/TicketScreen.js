import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Ticket from "../components/tickets/Ticket";

const TicketScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Ticket/>
      </main>
    </>
  );
};

export default TicketScreen;
