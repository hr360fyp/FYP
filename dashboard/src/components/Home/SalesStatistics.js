import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sales statistics</h5>
          <iframe title="Sales statistics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px",
            }} 
            src="https://charts.mongodb.com/charts-project-0-ykfvw/embed/charts?id=645649d7-2258-4fe0-809d-94bbe0c86788&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
          
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
