import classes from "@/styles/update.module.css";

function page({ params }) {
  return (
    <section className={classes.update_section}>
      <div className="container">
        <div className={classes.wrapper}>
          <h1>Hello {params.update}</h1>
        </div>
      </div>
    </section>
  );
}

export default page;
