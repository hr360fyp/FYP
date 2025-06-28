import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTickets, } from "../../Redux/Actions/TicketActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ClientTicket = () => {
  const dispatch = useDispatch();

  const products = useSelector(({ productList }) => productList.products);
  console.log("products", products);

  const ticketList = useSelector((state) => state.ticketList);
  const { loading, error, tickets } = ticketList;

  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(listTickets());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTickets(
      tickets.filter((ticket) =>
        ticket.asgnto.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [tickets, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Ticket Management</h2>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control2 p-2"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card2-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-3">
              {filteredTickets.map((ticket) => (
                <div className="col" key={ticket._id}>
                  <div className="card2 card2-user shadow-sm">
                    <div className="card-header">
                      Created by: {ticket.crtby}
                    </div>
                    <div className="card2-body">
                      <h5 className="card-title mt-2">
                        Description: {ticket.description}
                      </h5>
                      <h5 className="card-title mt-2">
                        Priority: {ticket.priority}
                      </h5>
                      <h5 className="card-title mt-2">
                        Assigned to: {ticket.asgnto}
                      </h5>
                      <h5 className="card-title mt-2">
                        Deadline: {ticket.deadline}
                      </h5>
                      <h5 className="card-title mt-2">
                        Status: {ticket.status}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ClientTicket;
