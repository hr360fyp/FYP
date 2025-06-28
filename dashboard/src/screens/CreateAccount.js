import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import CreateAccountMain from "./../components/products/CreateAccountMain";

const CreateAccountProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <CreateAccountMain />
      </main>
    </>
  );
};

export default CreateAccountProduct;