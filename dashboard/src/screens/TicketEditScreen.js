import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditTicketMain from "./../components/tickets/EditTicketMain";

const TicketEditScreen = ({ match }) => {
  const ticketId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditTicketMain ticketId={ticketId} />
      </main>
    </>
  );
};
export default TicketEditScreen;
