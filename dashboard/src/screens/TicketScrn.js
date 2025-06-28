import React from "react";
import ClientSidebar from "../components/ClientSidebar";
import ClientHeader from "../components/ClientHeader";
import Ticket from "../components/Ticket/ClientTicket";

const TicketScrn = () => {
  return (
    <>
      <ClientSidebar />
      <main className="main-wrap">
        <ClientHeader />
        <Ticket/>
      </main>
    </>
  );
};

export default TicketScrn;
