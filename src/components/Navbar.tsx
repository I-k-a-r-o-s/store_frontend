import { SquarePlus } from "lucide-react";
import DarkMode from "./Darkmode";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Store</a>
      </div>
      <div className="navbar-end gap-3">
        <button className="btn btn-ghost btn-circle">
          <SquarePlus/>
        </button>
        <button className="btn btn-ghost btn-circle">
          <DarkMode />
        </button>
      </div>
    </div>
  );
};
export default Navbar;
