import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainOrders from "../components/orders/MainOrders";

const OrderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainOrders />
      </main>
    </>
  );
};

export default OrderScreen;

