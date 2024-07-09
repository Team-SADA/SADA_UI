import Email from "../components/email";
import classes from "./email_page.module.scss";

const EmailPage = () => {
  return (
    <>
      <header></header>
      <main className={classes.main}>
        <Email />
      </main>
      <footer></footer>
    </>
  );
};

export default EmailPage;
