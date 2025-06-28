import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTicket, updateTicket } from "../../Redux/Actions/TicketActions";
import { TICKET_UPDATE_RESET } from "../../Redux/Constants/TicketConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditTicketMain = (props) => {
  const { ticketId } = props;

  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [crtby, setCreatedBy] = useState("");
  const [asgnto, setAsgnto] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const products = useSelector(({ productList }) => productList.products);
  console.log("products", products);

  const ticketEdit = useSelector((state) => state.ticketEdit);
  const { loading, error, ticket } = ticketEdit;

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setDescription(filteredValue);
  };

  const handlePriorityChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setPriority(filteredValue);
  };

  const handleCreatedByChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setCreatedBy(filteredValue);
  };

  const handleStatusChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setStatus(filteredValue);
  };

  const ticketUpdate = useSelector((state) => state.ticketUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = ticketUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TICKET_UPDATE_RESET });
      toast.success("Ticket Updated", ToastObjects);
    } else {
      if (!ticket || ticket._id !== ticketId) {
        dispatch(editTicket(ticketId));
      } else {
        setDescription(ticket.description);
        setPriority(ticket.priority);
        setCreatedBy(ticket.crtby);
        setAsgnto(ticket.asgnto);
        setDeadline(ticket.deadline);
        setStatus(ticket.status);
      }
    }
  }, [ticket, dispatch, ticketId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTicket({
        _id: ticketId,
        description,
        priority,
        crtby,
        asgnto,
        deadline,
        status,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/tickets" className="btn btn-danger text-white">
              Go to Ticket
            </Link>
            <h2 className="content-title">Update Ticket</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Update now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="ticket_desc" className="form-label">
                          Short Description (Maximum 40 characters)
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="ticket_desc"
                          required
                          value={description}
                          onChange={handleDescriptionChange} // Use the custom handler to filter non-alphabet characters
                          maxLength="40" // Set the maximum length to 40 characters
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="ticket_priority" className="form-label">
                          Priority Level (Maximum 40 characters)
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="ticket_priority"
                          required
                          value={priority}
                          onChange={handlePriorityChange} // Use the custom handler to filter non-alphabet characters
                          maxLength="40" // Set the maximum length to 40 characters
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="ticket_crtby" className="form-label">
                          Created by (Maximum 40 characters)
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="ticket_crtby"
                          required
                          value={crtby}
                          onChange={handleCreatedByChange} // Use the custom handler to filter non-alphabet characters
                          maxLength="40" // Set the maximum length to 40 characters
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="ticket_asgnto" className="form-label">
                          Assigned to
                        </label>
                        <select
                          id="ticket_asgnto"
                          className="form-control2"
                          required
                          value={asgnto}
                          onChange={(e) => setAsgnto(e.target.value)}
                        >
                          <option id="" value="">
                            Select an Employee
                          </option>
                          {products.map((product) => (
                            <option key={product._id} value={product.name}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="ticket_deadline" className="form-label">
                          Deadline
                        </label>
                        <input
                          type="date"
                          placeholder="Type here"
                          className="form-control"
                          id="ticket_deadline"
                          required
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                          min={new Date().toISOString().split("T")[0]} // Set min to the current date
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="ticket_status" className="form-label">
                          Status (Maximum 40 characters)
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="ticket_status"
                          required
                          value={status}
                          onChange={handleStatusChange} // Use the custom handler to filter non-alphabet characters
                          maxLength="40" // Set the maximum length to 40 characters
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditTicketMain;
