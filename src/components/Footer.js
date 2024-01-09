import { CopyrightOutlined } from "@mui/icons-material";
import Link from "next/link";
import classes from "@/styles/footer.module.css";
function Footer() {
  return (
    <footer className={classes.footer__section}>
      <p>
        <CopyrightOutlined /> All copyright reserved by{" "}
        <Link href="https://www.facebook.com/hridoysaha.official">
          Hridoy Saha
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
