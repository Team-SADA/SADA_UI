import { useContext, useEffect } from "react";
import classes from "./last_page.module.scss";
import GlobalContext from "../components/context/context";

const json: any = require("../components/context/score.json");

const sortDictionaryByValue = (dict: any) => {
  const items = Object.entries(dict);

  items.sort((a, b) => (a[1] as number) - (b[1] as number));

  return items;
};

const secondsToMMSS = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
};

const LastPage = () => {
  const { stopTime, goBack } = useContext(GlobalContext);

  useEffect(() => {
    stopTime();

    return () => {
      goBack();
    };
  }, [stopTime, goBack]);

  return (
    <main style={{ paddingTop: "6rem" }}>
      <ul className={classes.list}>
        {sortDictionaryByValue(Object(json)).map((item, i) => (
          <li key={i}>
            <span>{item[0]}</span>
            <span>{secondsToMMSS(item[1] as number)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default LastPage;
