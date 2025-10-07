import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import Header from "../pages/Navbar";

const Layout = () => {
  return (
    <>
    <Header />
    <main className="p-4">
      <Outlet />
    </main>
    <Footer />
  </>
  )
};

export default Layout;
