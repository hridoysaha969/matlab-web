import { Home, Assignment, NotificationsActive } from "@mui/icons-material";
import classes from "@/styles/navbar.module.css";
import Link from "next/link";
function Navbar() {
  return (
    <nav className={classes.nav__header}>
      <div className="container">
        <div className={classes.nav__menu}>
          <Link href="/">
            <h3>Matlab Web</h3>
          </Link>
          <div className={classes.accounts}>
            <Link href="/">
              <Home />
              <small>Home</small>
            </Link>
            <Link href="/result">
              <Assignment />
              <small>Result</small>
            </Link>
            <Link href="/notice">
              <NotificationsActive />
              <small>Notice</small>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
