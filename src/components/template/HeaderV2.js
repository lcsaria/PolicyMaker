import React from "react";
import { useState } from "react";
import { Sidebardata } from "./Sidebardata";

function HeaderV2() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h3 className="text-gray-300 mt-2">PolicyMaker</h3>
              </div>
            </div>
            <div className="hidden md:block text-white">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  style={{ textDecoration: "none" }}
                  aria-current="page"
                >
                  About
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="px-3 inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setOpen(!isOpen)}
              >
                <span>
                  {isOpen === false ? (
                    <i className="fa-solid fa-bars fa-2x" />
                  ) : (
                    <i className="fa-solid fa-xmark fa-2x" />
                  )}
                </span>
              </button>
            </div>
          </div>

          <div className="md:hidden" id="mobile-menu">
            {isOpen === false ? null : (
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {Sidebardata.map((val, key) => {
                  return (
                    <a
                      href={val.link}
                      key={key}
                      className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      aria-current="page"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="p-3">{val.icon}</span>
                      <span>{val.title}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HeaderV2;
