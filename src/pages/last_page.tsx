import classes from "./last_page.module.scss";

const json: any = require("../components/context/score.json");

const sortDictionaryByValue = (dict: any) => {
  // Convert dictionary to an array of [key, value] pairs
  const items = Object.entries(dict);

  // Sort the array based on the value
  items.sort((a, b) => (a[1] as number) - (b[1] as number));

  return items;
};

const secondsToMMSS = (seconds: number) => {
  // Calculate the minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad the remaining seconds with a leading zero if necessary
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  // Return the formatted time
  return `${minutes}:${paddedSeconds}`;
};

const LastPage = () => {
  return (
    <main style={{ paddingTop: "6rem" }}>
      <ul className={classes.list}>
        {sortDictionaryByValue(Object(json)).map((item) => (
          <li>
            <span>{item[0]}</span>
            <span>{secondsToMMSS(item[1] as number)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default LastPage;
