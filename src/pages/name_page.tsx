import classes from "./name_page.module.scss";
import Name from "../components/name";

const NamePage = () => {
  return (
    <>
      <header></header>
      <main className={classes.main}>
          <Name />
      </main>
      <footer></footer>
    </>
  );
};

export default NamePage;
