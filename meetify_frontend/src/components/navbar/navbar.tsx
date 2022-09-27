import { NavLink, useNavigate } from "react-router-dom";
import techLogo from "../../assets/images/tech-logo.png";
import LineHeader from "../../assets/images/Line.png";
import { getInitials } from "../../utils/index";
import { useContext } from "react";
import AuthContext from "../../pages/auth/components/auth-provides";

const NavBar = () => {
  const navigate = useNavigate();

  const { auth, setAuth }: any = useContext(AuthContext);

  return (
    <div className="nav-bar">
      <div className="img-links">
        <img id="logo-img" src={techLogo} alt="techquarter-logo" />
        {auth?.access_token && (
          <>
            {" "}
            <img id="line-img" src={LineHeader} alt="techquarter-logo" />
            <NavLink to="/dashboard">DASHBOARD</NavLink>
            <NavLink to="/meeting-rooms">MEETING ROOMS</NavLink>
            <NavLink to="/your-schedule">YOUR SCHEDULE</NavLink>
          </>
        )}
      </div>
      {auth?.access_token && (
        <div className="user-section">
          <div className="icon-user">
            {getInitials(auth?.username || "user")}
          </div>

          <div>
            <h1>{auth?.username || ""}</h1>
            <h2>{auth?.email || ""}</h2>
          </div>
          <button
            className="signout-button"
            onClick={() => {
              navigate("/login");
              setAuth(undefined);
              localStorage.clear();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
