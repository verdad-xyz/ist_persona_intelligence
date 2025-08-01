import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LuLogOut, LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import SidebarContext from "./SidebarContext";

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <aside
        className="h-screen"
        style={{
          background: "#OD5E9F",
          background: "linear-gradient(to right, #0077A6, #00B59C)",
        }}
      >
        <nav className="h-full flex flex-col border-r shadow-sm">
          <div
            className={`flex items-center ${
              expanded ? "justify-between px-3" : "justify-center"
            } h-16`}
          >
            <NavLink to={"/dashboard"}>
              <p
                className={`transition-all overflow-hidden text-[#b0e0e6] font-extrabold uppercase ${
                  expanded
                    ? "w-55 h-20 pt-8 p-3 ml-1 underline italic"
                    : "w-0 h-0"
                }`}
              >
                Satuan Anti Fraud
              </p>
            </NavLink>
            <button
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={() => setExpanded((curr) => !curr)}
            >
              {expanded ? <LuPanelLeftClose /> : <LuPanelRightClose />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3 items-center">
            <div className="avatar avatar-placeholder">
              <div className="bg-amber-600 text-neutral-content w-12 rounded-full">
                <img src="/logo_afr.jpg" alt="Logo AFR" />
              </div>
            </div>
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4 text-white">
                <h4 className="font-semibold">Nama User</h4>
                <span className="text-xs text-white/40">Email User</span>
              </div>
              <div
                className="bg-white px-1 py-2 rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                <LuLogOut color="#ff4122" size={20} />
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
