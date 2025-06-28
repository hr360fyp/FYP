import React from "react";

const PrintComponent = React.forwardRef(({ products }, ref) => {
  return (
    <div ref={ref}>
      <h1>Print Component</h1>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.email}</td>
              <td>{product.dept}</td>
              <td>{product.designation}</td>
              <td>{product.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PrintComponent;