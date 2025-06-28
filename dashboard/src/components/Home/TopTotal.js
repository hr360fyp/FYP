import React from "react";

const TopTotal = (props) => {
  const { orders } = props;

  // Calculate the sum of total sales, total projects done and total remaning amount of specific organization
  let totalRemAmount = 0;
  let totalSales = 0;
  let totalProjectDone = 0;
  if (orders) {
    orders.forEach((order) => {
      totalSales += order.tsales;
      totalProjectDone += order.tpd;
      totalRemAmount += order.rem;
    });
  }

  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="fas fa-bags-shopping" style={{ color: "#20AE64" }}></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Sales</h6>{" "}
              <span>Rs. {totalSales.toFixed(0)}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="fas fa-solid fa-money-bill" style={{ color: "#eeb406" }}></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Remaining Amount</h6>
              <span>Rs. {totalRemAmount}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="fas fa-solid fa-laptop-code" style={{ color: "#196EE6" }}></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Projects Done</h6>
              <span>{totalProjectDone}</span>
            </div>
          </article>
        </div>
      </div>

    </div>
  );
};

export default TopTotal;
