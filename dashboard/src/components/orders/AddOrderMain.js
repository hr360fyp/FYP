import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ORDER_CREATE_RESET } from "../../Redux/Constants/OrderConstants";
import { createOrder } from "../../Redux/Actions/OrderActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddOrderMain = () => {
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const [temp, setTemp] = useState(0);
  const [tpd, setTpd] = useState(0);
  const [tsales, setTsales] = useState(0);
  const [rem, setRem] = useState(0);
  const [pstatus, setPstatus] = useState("");

  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, order } = orderCreate;

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    // Allow only alphabets and spaces using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setName(filteredValue);
  };

  const handleHeadChange = (e) => {
    const inputValue = e.target.value;
    // Allow only alphabets and spaces using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setHead(filteredValue);
  };

  const handlePstatusChange = (e) => {
    const inputValue = e.target.value;
    // Allow only alphabets and spaces using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setPstatus(filteredValue);
  };

  useEffect(() => {
    if (order) {
      toast.success("Department Added", ToastObjects);
      dispatch({ type: ORDER_CREATE_RESET });
      setName("");
      setHead("");
      setTemp(0);
      setTpd(0);
      setTsales(0);
      setRem(0);
      setPstatus("");
    }
  }, [order, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder(name, head, temp, tpd, tsales, rem, pstatus));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/orders" className="btn btn-danger text-white">
              Go to Department
            </Link>
            <h2 className="content-title">Add New Department</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Create now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="department_title" className="form-label">
                      Department Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="department_title"
                      required
                      value={name}
                      onChange={handleNameChange} // Use the custom handler to filter non-alphabet characters
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="department_head" className="form-label">
                      Department Head
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="department_head"
                      required
                      value={head}
                      onChange={handleHeadChange} // Use the custom handler to filter non-alphabet characters
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="department_temp" className="form-label">
                      Total Employees
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="department_temp"
                      required
                      value={temp}
                      onChange={(e) => setTemp(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="department_tpd" className="form-label">
                      Total Project Done
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="department_tpd"
                      required
                      value={tpd}
                      onChange={(e) => setTpd(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="department_tsales" className="form-label">
                      Total Sales
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="department_tsales"
                      required
                      value={tsales}
                      onChange={(e) => setTsales(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="department_rem" className="form-label">
                      Remaining Amount
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="department_rem"
                      required
                      value={rem}
                      onChange={(e) => setRem(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="department_status" className="form-label">
                      Paid Status
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="department_status"
                      required
                      value={pstatus}
                      onChange={handlePstatusChange} // Use the custom handler to filter non-alphabet characters
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddOrderMain;
