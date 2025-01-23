import React from "react";
import SideBar from "./_components/Sidebar";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <section>
      <div className="md:2-64 hidden md:block">
        <SideBar />
      </div>

      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </section>
  );
}

export default DashboardLayout;
