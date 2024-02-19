import classes from "@/styles/update.module.css";
import confetti from "../../../../public/confetti.png";
import Image from "next/image";

function page() {
  return (
    <section className={classes.update_section}>
      <div className="container">
        <div className={classes.wrapper}>
          <Image src={confetti} className={classes.confetti} />
          <h2>Congratulations! Someone</h2>
          <p>
            I'm glad to share you that you are eligible to have a resource
            package of Web Development. Here is your Summery
          </p>
          <button className={classes.download_btn}>Download Now</button>
        </div>
      </div>
    </section>
  );
}

export default page;
