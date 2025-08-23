import { Link } from "react-router";
import logo from "@static/image/logo.jpg";
const Logo = () => {
  return (
    <Link to="/" className="custom-logo-link" rel="home">
      <img
        width="248"
        height="248"
        src={logo}
        className="custom-logo"
        alt="Tuấn"
      />
    </Link>
  );
};

export default Logo;
