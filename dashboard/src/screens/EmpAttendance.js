import React, { useState, useEffect } from "react";
import EmpSidebar from "../components/EmpSidebar";
import EmpHeader from "../components/EmpHeader";
import { useSelector } from "react-redux";
import axios from "axios";

const Attendance = () => {
  const products = useSelector(({ productList }) => productList.products);
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    axios
      .get("/api/attendance")
      .then((res) => {
        setAttendances(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // Calculate the sum of attendance for each unique email address
  const calculateAttendanceSum = (email) => {
    const attendanceList = attendances.filter(
      (attendance) => attendance.employeeEmail === email
    );
    const attendanceSum = attendanceList.reduce(
      (sum, attendance) => sum + attendance.attendance,
      0
    );
    return attendanceSum;
  };

  return (
    <>
      <EmpSidebar />
      <main className="main-wrap">
        <EmpHeader />

        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Attendance</h2> 
          </div>
        </section>
        <div className="att-header">
          <table className="table2">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Absents</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows dynamically with employee data */}
              {products.length ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>{calculateAttendanceSum(product.email)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No data</td>
                </tr>
              )}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Attendance;