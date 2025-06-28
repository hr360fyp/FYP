import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [experience, setExperience] = useState(0);
  const [image, setImage] = useState("");
  const [salary, setSalary] = useState(0);
  const [designation, setDesignation] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setName(filteredValue);
  };

  const handleDeptChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setDept(filteredValue);
  };

  const handleDesignationChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setDesignation(filteredValue);
  };

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Employee Updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setEmail(product.email);
        setDept(product.dept);
        setDesignation(product.designation);
        setSalary(product.salary);
        setImage(product.image);
        setExperience(product.experience);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        email,
        dept,
        experience,
        designation,
        image,
        salary,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to People
            </Link>
            <h2 className="content-title">Update Employee</h2>
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
                        <label htmlFor="employee_title" className="form-label">
                          Employee Name (Maximum 40 characters)
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="employee_title"
                          required
                          value={name}
                          onChange={handleNameChange} // Use the custom handler to filter non-alphabet characters
                          maxLength="40" // Set the maximum length to 40 characters
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="employee_email" className="form-label">
                          Employee Email (Maximum 40 characters)
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="employee_email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          maxLength="40" // Set the maximum length to 40 characters
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="employee_department"
                          className="form-label"
                        >
                          Employee Department (Maximum 40 characters)
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="employee_department"
                          required
                          value={dept}
                          onChange={handleDeptChange} // Use the custom handler to filter non-alphabet characters
                          maxLength="40" // Set the maximum length to 40 characters
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="employee_experience"
                          className="form-label"
                        >
                          Experience (Maximum 2 characters)
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="employee_experience"
                          required
                          value={experience}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const filteredValue = inputValue.slice(0, 2); // Limit to maximum 2 characters
                            setExperience(filteredValue);
                          }}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="employee_salary" className="form-label">
                          Salary (Maximum 7 characters)
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="employee_salary"
                          required
                          value={salary}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const filteredValue = inputValue.slice(0, 7); // Limit to maximum 7 characters
                            setSalary(filteredValue);
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">
                          Job Designation (Maximum 40 characters)
                        </label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={designation}
                          onChange={handleDesignationChange} // Use the custom handler to filter non-alphabet characters
                          maxLength="40" // Set the maximum length to 40 characters
                        ></textarea>
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

export default EditProductMain;
