import React, { useState } from "react";
import "../../assets/css/sidebar.css";
import { Sidebardata } from "./Sidebardata";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div
      className={
        showNav
          ? "sidebars hidden lg:block"
          : "sidebars collapsed hidden lg:block"
      }
    >
      <ul className="sidebarlist">
        <div className="meow row">
          {showNav ? (
            <>
              <div className="col-10">PolicyMaker</div>
              <div
                className="col-2"
                onClick={() => {
                  setShowNav(!showNav);
                }}
              >
                <i className="fas fa-bars sidebar-icon" />
              </div>
            </>
          ) : (
            <>
              <div
                className="text-center"
                onClick={() => {
                  setShowNav(!showNav);
                }}
              >
                <i className="fas fa-bars " />
              </div>
            </>
          )}
        </div>
        {Sidebardata.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
              id={window.location.pathname === val.link ? "active" : ""}
            >
              {showNav ? (
                <>
                  <div id="icon">{val.icon}</div>
                  <div id="title">
                    <b>{val.title}</b>
                  </div>
                </>
              ) : (
                <>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>{val.title}</Tooltip>}
                  >
                    <div id="icon">{val.icon}</div>
                  </OverlayTrigger>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
