import React from "react";
import ClientSidebar from "./../components/ClientSidebar";
import ClientHeader from "./../components/ClientHeader";
import AddTicketMain from "./../components/tickets/AddTicketMain";

const AddTicket = () => {
  return (
    <>
      <ClientSidebar />
      <main className="main-wrap">
        <ClientHeader />
        <AddTicketMain />
      </main>
    </>
  );
};

export default AddTicket;