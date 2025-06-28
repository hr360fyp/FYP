import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainOrders = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { error: errorDelete, success: successDelete } = orderDelete;

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Department Management</h2>
        <div>
          <Link to="/addorder" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <div className="row">
                {/* Filtered Orders */}
                <Order orders={filteredOrders} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainOrders;
