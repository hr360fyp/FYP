import React from "react";
import EmpSidebar from "../components/EmpSidebar";
import EmpHeader from "../components/EmpHeader";
import Ticket from "../components/Tckt/EmpTicket";

const TcktScreen = () => {
  return (
    <>
      <EmpSidebar />
      <main className="main-wrap">
        <EmpHeader />
        <Ticket/>
      </main>
    </>
  );
};

export default TcktScreen;
