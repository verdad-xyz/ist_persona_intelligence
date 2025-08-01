import React from "react";
import Sidebar from "./Sidebar";
import NavigationBar from "./NavigationBar";
import SidebarItem from "./SidebarItem";
import {
  LuHouse,
  LuUserCog,
  LuFingerprint,
  LuGitPullRequestArrow,
} from "react-icons/lu";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar>
        <SidebarItem
          icon={<LuHouse size={25} />}
          text="Dashboard"
          to="/dashboard"
        />
        <SidebarItem icon={<LuUserCog size={25} />} text="Users" to="/users" />
        <SidebarItem
          icon={<LuFingerprint size={25} />}
          text="Names"
          to="/fraudnames"
        />
        <SidebarItem
          icon={<LuGitPullRequestArrow size={25} />}
          text="Categories"
          to="/fraudcategories"
        />
      </Sidebar>
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
