import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../Redux/Actions/OrderActions";

const Order = (props) => {
  const { orders } = props;
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteOrder(id));
    }
  };

  const getPstatusBadge = (pstatus) => {
    if (pstatus === "Paid") {
      return <span className="badge btn-success">Paid</span>;
    } else {
      return <span className="badge btn-dark">Not Paid</span>;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Dept Name</th>
            <th scope="col">Dept Head</th>
            <th scope="col">Total Employees</th>
            <th scope="col">Total Project Done</th>
            <th scope="col">Total Sales</th>
            <th scope="col">Remaining Amount</th>
            <th scope="col">Paid Status</th>
            <th scope="col">Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td style={{ wordWrap: "break-word", maxWidth: "150px" }}>{order.name}</td>
              <td>{order.head}</td>
              <td>{order.temp}</td>
              <td>{order.tpd}</td>
              <td>Rs. {order.tsales}</td>
              <td>Rs. {order.rem}</td>
              <td>{getPstatusBadge(order.pstatus)}</td>
              <td>
                <Link
                  to={`/order/${order._id}/edit`}
                  className="btn btn-sm btn-outline-success p-2 pb-4 col-md-4"
                  style={{ width: "35px", height: "23px" }}
                >
                  <i className="fas fa-pen" style={{ width: "18px", height: "40px" }}></i>
                </Link>

                <Link
                  to="#"
                  onClick={() => deleteHandler(order._id)}
                  className="btn btn-sm btn-outline-danger p-2 pb-4 col-md-4"
                  style={{ width: "35px", height: "23px" }}
                >
                  <i className="fas fa-trash-alt" style={{ width: "15px", height: "40px" }}></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
