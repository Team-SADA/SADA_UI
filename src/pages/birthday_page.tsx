import { useNavigate } from "react-router";

import "./birthday_page.scss";
import { useState } from "react";
import Portal from "../components/UI/Portal";
import { useNotification } from "../components/notification/NotificationProvider";

type PropsType = {
  nextLink: string;
};

const BirthdayPage = ({ nextLink }: PropsType) => {
  const Rotate_Times1 = 0.5;
  const Rotate_Times2 = 15;
  const Rotate_Times3 = 1;

  const notice = useNotification();

  const navigate = useNavigate();

  let Rotate_CSS_Day = 0;
  let Rotate_CSS_Month = 0;
  let Rotate_CSS_Year = 0;
  let [Earth_Spin_Power, setEarth_Spin_Power] = useState(0);
  let [Moon_Spin_Power, setMoon_Spin_Power] = useState(0);
  let [Sun_Spin_Power, setSun_Spin_Power] = useState(0);
  const rootStyles = window.getComputedStyle(document.documentElement);

  let [Now_Day, setNow_Day] = useState("1");
  let [Now_Month, setNow_Month] = useState("1");
  let [Now_Year, setNow_Year] = useState("1924");

  function Layout1() {
    return (
      <div>
        <p className={"layout"} onMouseOver={MOverAll} />
      </div>
    );
  }

  function Earth() {
    return (
      <img
        src={"../Earth_D.png"}
        alt={"Earth"}
        width={300}
        height={300}
        id={"Earth"}
        className={"Earth"}
      />
    );
  }

  function Sun() {
    return (
      <img
        src={"../Sun_D.png"}
        alt={"Sun"}
        width={3000}
        height={3000}
        id={"Sun"}
        className={"Sun"}
      />
    );
  }

  function Moon() {
    return (
      <img
        src={"../Moon_D.png"}
        alt={"Moon"}
        width={1000}
        height={1000}
        id={"Moon"}
        className={"Moon"}
        onMouseOver={MOverAll}
      />
    );
  }

  //times
  function DayButton() {
    return (
      <p className={"Day_Button"} id={"Day_Button"} onMouseOver={MOverAll}>
        {Now_Day}
      </p>
    );
  }

  function DayText() {
    return (
      <p className={"Day_Text"} id={"Day_Text"} onMouseOver={MOverAll}>
        Day
      </p>
    );
  }

  function MonthButton() {
    return (
      <p className={"Month_Button"} id={"Month_Button"} onMouseOver={MOverAll}>
        {-Now_Month}
      </p>
    );
  }

  function MonthText() {
    return (
      <p className={"Month_Text"} id={"Month_Text"} onMouseOver={MOverAll}>
        Month
      </p>
    );
  }

  function YearButton() {
    return (
      <p className={"Year_Button"} id={"Year_Button"} onMouseOver={MOverAll}>
        {Now_Year}
      </p>
    );
  }

  function YearText() {
    return (
      <p className={"Year_Text"} id={"Year_Text"} onMouseOver={MOverAll}>
        Year
      </p>
    );
  }

  function MOverAll() {
    MOver3();
    Rotate_CSS_Day = parseInt(rootStyles.getPropertyValue("--rotate"));
    Rotate_CSS_Month = parseInt(rootStyles.getPropertyValue("--rotate2"));

    setNow_Month(
      `${
        Math.floor(Rotate_CSS_Month / -360) % 12 !== 0
          ? Math.floor(Rotate_CSS_Month / -360) % 12
          : -12
      }`
    );
    setNow_Day(
      `${
        Math.floor(Rotate_CSS_Day / -360) % 31 !== 0
          ? Math.floor(Rotate_CSS_Day / -360) % 31
          : 31
      }`
    );
    if (Moon_Spin_Power > 1 && Earth_Spin_Power < -1) {
      setMoon_Spin_Power(Moon_Spin_Power - 1);
      document.documentElement.style.setProperty(
        "--rotate2",
        `${Rotate_CSS_Month + Moon_Spin_Power / Rotate_Times2}deg`
      );
      setEarth_Spin_Power(Earth_Spin_Power + 1);
      document.documentElement.style.setProperty(
        "--rotate",
        `${Rotate_CSS_Day + Earth_Spin_Power / Rotate_Times1}deg`
      );
    } else if (Moon_Spin_Power <= 1 && Earth_Spin_Power >= -1) {
      setMoon_Spin_Power(0);
      document.documentElement.style.setProperty(
        "--rotate2",
        `${Rotate_CSS_Month + Moon_Spin_Power / Rotate_Times2}deg`
      );
      setEarth_Spin_Power(0);
      document.documentElement.style.setProperty(
        "--rotate",
        `${Rotate_CSS_Day + Earth_Spin_Power / Rotate_Times1}deg`
      );
    } else if (Moon_Spin_Power > 1 && Earth_Spin_Power >= -1) {
      setMoon_Spin_Power(Moon_Spin_Power - 1);
      document.documentElement.style.setProperty(
        "--rotate2",
        `${Rotate_CSS_Month + Moon_Spin_Power / Rotate_Times2}deg`
      );
      setEarth_Spin_Power(0);
      document.documentElement.style.setProperty(
        "--rotate",
        `${Rotate_CSS_Day + Earth_Spin_Power / Rotate_Times1}deg`
      );
    } else {
      setMoon_Spin_Power(0);
      document.documentElement.style.setProperty(
        "--rotate2",
        `${Rotate_CSS_Month + Moon_Spin_Power / Rotate_Times2}deg`
      );
      setEarth_Spin_Power(Earth_Spin_Power + 1);
      document.documentElement.style.setProperty(
        "--rotate",
        `${Rotate_CSS_Day + Earth_Spin_Power / Rotate_Times1}deg`
      );
    }
  }

  function MOver3() {
    Rotate_CSS_Year = parseInt(rootStyles.getPropertyValue("--rotate3"));
    setNow_Year(
      `${Math.floor(
        Math.floor(Rotate_CSS_Year / 360) % 200 === 0
          ? 1924
          : ((Rotate_CSS_Year / 360) % 200) + 1924
      )}`
    );

    if (Sun_Spin_Power > 1) {
      setSun_Spin_Power(Sun_Spin_Power - 1);
      document.documentElement.style.setProperty(
        "--rotate3",
        `${Rotate_CSS_Year + Sun_Spin_Power / Rotate_Times3}deg`
      );
    } else {
      setSun_Spin_Power(0);
      document.documentElement.style.setProperty(
        "--rotate3",
        `${Rotate_CSS_Year + Sun_Spin_Power / Rotate_Times3}deg`
      );
    }
  }

  //month
  function MOver2() {
    Rotate_CSS_Month = parseInt(rootStyles.getPropertyValue("--rotate2"));
    setNow_Month(
      `${Math.floor(
        Math.floor(Rotate_CSS_Month / -360) % 12 !== 0
          ? Math.floor(Rotate_CSS_Month / -360) % 12
          : -12
      )}`
    );

    if (Moon_Spin_Power > 1) {
      setMoon_Spin_Power(Moon_Spin_Power - 1);
      document.documentElement.style.setProperty(
        "--rotate2",
        `${Rotate_CSS_Month + Moon_Spin_Power / Rotate_Times2}deg`
      );
    } else {
      setMoon_Spin_Power(0);
      document.documentElement.style.setProperty(
        "--rotate2",
        `${Rotate_CSS_Month + Moon_Spin_Power / Rotate_Times2}deg`
      );
    }
  }

  //Day
  function MOver() {
    Rotate_CSS_Day = parseInt(rootStyles.getPropertyValue("--rotate"));
    setNow_Day(
      `${Math.floor(
        Math.floor(Rotate_CSS_Day / -360) % 31 !== 0
          ? Math.floor(Rotate_CSS_Day / -360) % 31
          : 31
      )}`
    );

    if (Earth_Spin_Power < -1) {
      setEarth_Spin_Power(Earth_Spin_Power + 1);
      document.documentElement.style.setProperty(
        "--rotate",
        `${Rotate_CSS_Day + Earth_Spin_Power / Rotate_Times1}deg`
      );
    } else {
      setEarth_Spin_Power(0);
      document.documentElement.style.setProperty(
        "--rotate",
        `${Rotate_CSS_Day + Earth_Spin_Power / Rotate_Times1}deg`
      );
    }
  }

  function UnClickCircle() {
    return <p className={"UnClick_Circle"} onMouseOver={MOverAll} />;
  }

  function CircleDay() {
    return (
      <p
        className={"circle_box"}
        onMouseOver={function () {
          MOver2();
          MOver3();
          Rotate_CSS_Day = parseInt(rootStyles.getPropertyValue("--rotate"));
          setEarth_Spin_Power(Earth_Spin_Power - 1);
          setNow_Day(
            `${Math.floor(
              Math.floor(Rotate_CSS_Day / -360) % 31 !== 0
                ? (Rotate_CSS_Day / -360) % 31
                : 31
            )}`
          );

          return document.documentElement.style.setProperty(
            "--rotate",
            `${Rotate_CSS_Day + Earth_Spin_Power / Rotate_Times1}deg`
          );
        }}
      ></p>
    );
  }

  function CircleMonth() {
    return (
      <p
        className={"circle_box2"}
        onMouseOver={function () {
          MOver();
          MOver3();
          Rotate_CSS_Month = parseInt(rootStyles.getPropertyValue("--rotate2"));
          setMoon_Spin_Power(Moon_Spin_Power + 1);
          setNow_Month(
            `${Math.floor(
              Math.floor(Rotate_CSS_Month / -360) % 12 !== 0
                ? (Rotate_CSS_Month / -360) % 12
                : -12
            )}`
          );

          return document.documentElement.style.setProperty(
            "--rotate2",
            `${Rotate_CSS_Month + Moon_Spin_Power / Rotate_Times2}deg`
          );
        }}
      ></p>
    );
  }

  function CircleYear() {
    return (
      <p
        className={"circle_box3"}
        onMouseOver={function () {
          MOver();
          MOver2();
          Rotate_CSS_Year = parseInt(rootStyles.getPropertyValue("--rotate3"));
          setSun_Spin_Power(Sun_Spin_Power + 1);
          setNow_Year(
            `${Math.floor(
              Math.floor(Rotate_CSS_Year / 360) % 200 === 0
                ? 1924
                : ((Rotate_CSS_Year / 360) % 200) + 1924
            )}`
          );

          return document.documentElement.style.setProperty(
            "--rotate3",
            `${Rotate_CSS_Year + Sun_Spin_Power / Rotate_Times3}deg`
          );
        }}
      ></p>
    );
  }

  //set

  function Times() {
    return (
      <div>
        <DayButton />
        <DayText />
        <MonthButton />
        <MonthText />
        <YearButton />
        <YearText />
      </div>
    );
  }

  function submitHandler() {
    notice({ type: "SUCCESS", message: "생일 입력 성공!" });
    navigate(nextLink);
  }

  return (
    <>
      <div className={"wrapper"}>
        <Sun />
        <Moon />
        <Earth />
        <Layout1 />
        <Times />
        <CircleMonth />
        <UnClickCircle />
        <CircleDay />
        <CircleYear />
      </div>
      <Portal query=".overlays">
        <div className="play" onClick={submitHandler}>
          <span>넘어가기</span>
        </div>
      </Portal>
      <Portal query=".overlays">
        <span className="overlay">
          각 천체에 마우스를 가져다 대 생일을 입력하세요!
          <br />
          태양은 연도, 달은 월, 지구는 일을 변경합니다
          <br />
          Tip: 달은 달 궤도 사이에 마우스를 놓으면 이동합니다!
        </span>
      </Portal>
    </>
  );
};

export default BirthdayPage;
