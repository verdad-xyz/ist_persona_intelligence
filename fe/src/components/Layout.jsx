import React from "react";
import Sidebar from "./Sidebar";
import NavigationBar from "./NavigationBar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <NavigationBar />
        <div className="flex-1 justify-between items-center px-6 pt-4">
          <main className="flex-1 px-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
