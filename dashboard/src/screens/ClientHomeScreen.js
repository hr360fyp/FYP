import React from "react";
import ClientHeader from "../components/ClientHeader";
import ClientMain from "../components/ClientHome/ClientMain";
import ClientSidebar from "./../components/ClientSidebar";

const ClientHomeScreen = () => {
  return (
    <>
      <ClientSidebar />
      <main className="main-wrap">
        <ClientHeader />
        <ClientMain />
      </main>
    </>
  );
};

export default ClientHomeScreen; 
