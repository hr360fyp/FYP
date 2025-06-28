import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import axios from "axios";

const Payroll = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products/")
      .then((res) => {
        console.log("res", res);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  console.log("products", products);

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />

        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Payroll Management</h2>
          </div>
        </section>
        <div className="att-header">
          <table className="table2">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows dynamically with employee data */}
              {products.length ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>{product.dept}</td>
                    <td>{product.designation}</td>
                    <td>Rs. {product.salary}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Payroll;
