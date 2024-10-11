import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen z-10">
      <Navbar />
      <main className="flex-grow container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
