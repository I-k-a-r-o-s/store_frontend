import { SquarePlus } from "lucide-react";
import DarkMode from "./Darkmode";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to={"/"}>
          <a className="btn btn-ghost text-xl">Store</a>
        </Link>
      </div>
      <div className="navbar-end gap-3">
        <Link to={"/create"}>
          <button className="btn btn-ghost btn-circle">
            <SquarePlus />
          </button>
        </Link>
        <button className="btn btn-ghost btn-circle">
          <DarkMode />
        </button>
      </div>
    </div>
  );
};
export default Navbar;
