import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditOrderMain from "./../components/orders/EditorderMain";

const OrderEditScreen = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditOrderMain orderId={orderId} />
      </main>
    </>
  );
};
export default OrderEditScreen;
