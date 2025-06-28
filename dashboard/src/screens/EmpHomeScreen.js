import React from "react";
import EmpHeader from "../components/EmpHeader";
import EmpMain from "../components/EmpHome/EmpMain";
import EmpSidebar from "./../components/EmpSidebar";

const EmpHomeScreen = () => {
  return (
    <>
      <EmpSidebar />
      <main className="main-wrap">
        <EmpHeader />
        <EmpMain />
      </main>
    </>
  );
};

export default EmpHomeScreen;
