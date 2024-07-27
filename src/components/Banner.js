import classes from "@/styles/banner.module.css";
import slide1 from "../../public/slide-1.png";
import slide2 from "../../public/slide-2.png";
import Image from "next/image";

function Banner() {
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <h2>
              <span>Web</span> Development
            </h2>
            <h4>Her Power Project, Matlab</h4>
            <p>
              Make yourself self-reliant.Be patient & struggle more with
              yourself, You can do it.{" "}
            </p>
            <button className={classes.btn__header}>Read More</button>
          </div>
          <div className={classes.right}>
            <Image
              src={slide2}
              width={200}
              alt="Hridoy Saha Developer"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Banner;
