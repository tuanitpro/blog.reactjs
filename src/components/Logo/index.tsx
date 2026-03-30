import { Link } from "react-router";
import logo from "@static/image/logo.jpg";

const Logo = () => {
  return (
    <Link to="/" rel="home" className="block shrink-0">
      <img
        width="248"
        height="248"
        src={logo}
        className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
        alt="Tuấn"
      />
    </Link>
  );
};

export default Logo;
