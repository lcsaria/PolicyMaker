import React from "react";
import Header from "./template/Header";
import Sidebars from "./template/Sidebar";

function Home() {
  return (
    <div>
      <Header />
      <div id="outer-container">
        <div id="sidebar">
          <Sidebars />
        </div>
        <div id="content bg-gray-300">
          <div className="container">
            <div className="p-4 mx-auto">
              <div className="row">
                <div className="col-md-6 col-xl-3 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <span className="text-muted text-uppercase fs-12 fw-bold">
                            Customer Account
                          </span>
                          <h3 className="mb-0">$2100</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <span className="text-muted text-uppercase fs-12 fw-bold">
                            Today Revenue
                          </span>
                          <h3 className="mb-0">$2100</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <span className="text-muted text-uppercase fs-12 fw-bold">
                            Today Revenue
                          </span>
                          <h3 className="mb-0">$2100</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <span className="text-muted text-uppercase fs-12 fw-bold">
                            Today Revenue
                          </span>
                          <h3 className="mb-0">$2100</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
