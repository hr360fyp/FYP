import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="mb-2 img-wrap">
            <img src={product.image} alt="Employee" />
          </Link>
          <div className="info-wrap">
            <div className="title text-truncate mb-2">Name: {product.name}</div>
            <div className="title text-truncate mb-2">Email: {product.email}</div>
            <div className="title text-truncate mb-2">Department: {product.dept}</div>
            <div className="title text-truncate mb-2">Experience: {product.experience}</div>
            <div className="title text-truncate mb-2">Salary: Rs.{product.salary}</div>
            <div className="title text-truncate mb-4">Job Designation: {product.designation}</div>
            <div className="row">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
