import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddOrderMain from "./../components/orders/AddOrderMain";

const AddOrder = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddOrderMain />
      </main>
    </>
  );
};

export default AddOrder;
