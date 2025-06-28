import React from "react";

const ClientMain = () => {
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Client Dashboard </h2>
        </div>
        <div className="video-player">
        <iframe className="video-player" width="1260" height="540" src="https://www.youtube.com/embed/lH70nx0WP2g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </section>
    </>
  );
};

export default ClientMain;