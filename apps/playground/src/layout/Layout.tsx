import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="pg-shell">
      <Sidebar />
      <Header />
      <main className="pg-content">
        <Outlet />
      </main>
    </div>
  );
}
