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
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch(getMe());
    }
  }, [dispatch, user, isLoading]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    } else {
      console.log(user);
    }
  }, [isError, navigate, user]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar>
        <legend className="fieldset-legend" style={{ fontSize: ".9em" }}>
          General
        </legend>
        <SidebarItem
          icon={<LuHouse size={25} />}
          text="Dashboard"
          to="/dashboard"
        />
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

        {user && user.role === "admin" && (
          <>
            <legend className="fieldset-legend" style={{ fontSize: ".9em" }}>
              Admin
            </legend>
            <SidebarItem
              icon={<LuUserCog size={25} />}
              text="Users"
              to="/users"
            />
          </>
        )}
      </Sidebar>
      <div className="flex flex-col flex-1 h-screen">
        <NavigationBar />
        <div className="flex flex-1 overflow-auto flex-col">
          <div className="flex-1 justify-between items-center pl-1 pt-2">
            <main className="flex-1 px-6">{children}</main>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
