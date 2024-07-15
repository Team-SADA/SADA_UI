import { useContext, useEffect, useState } from "react";
import classes from "./email_page.module.scss";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../components/context/context";
import { useNotification } from "../components/notification/NotificationProvider";

const json: any = require("../components/context/data.json");

const shuffle = (str: string) =>
  str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

const shuffleTime = 20;

const EmailPage = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [Hangeul, setHangeul] = useState(
    "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*().,"
  );
  const [intervalId, setIntervalId] =
    useState<ReturnType<typeof setInterval>>();
  const [timeLeft, setTimeLeft] = useState(shuffleTime);
  const [savedText, setSavedText] = useState("");

  const { studentNumber } = useContext(GlobalContext);

  const navigate = useNavigate();

  const notice = useNotification();

  const type = (text: string) => {
    if (text === "delete") {
      setEmail("");
    } else {
      setEmail(email + text);
    }
  };

  const clickhandler = (_: any) => {
    setShow(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        setTimeLeft((prevState) => {
          if (prevState === 0) {
            setHangeul((prev) => shuffle(prev));
            return shuffleTime;
          }
          return prevState - 1;
        });
      }, 1000)
    );
  }, [setHangeul, setTimeLeft]);

  const submitHandler = (_: any) => {
    console.log(savedText + email);
    console.log(studentNumber);

    const hakbuns = Object.keys(json).filter((x) => x[0] == studentNumber[0]);

    const correctEmail =
      "gbs.s2400" +
      (hakbuns.indexOf(studentNumber) + 1).toString() +
      "@ggh.goe.go.kr";

    if (savedText + email == correctEmail) {
      navigate("/dorm-room");
      clearInterval(intervalId);
    } else {
      notice({ type: "ERROR", message: "그게 아닐 텐데" });
    }
  };

  return (
    <main>
      <h1>
        <img src="logo.png" alt="" />
        Email
      </h1>
      <div className={classes.text}>
        <span>
          당신의 Email: <span className={classes.highlight}>{savedText}</span>
          {email}
        </span>
        <div>
          <button
            onClick={() => {
              setSavedText((prev) => prev + email);
              setEmail("");
            }}
          >
            고정
          </button>
          <button
            onClick={() => {
              setEmail(savedText + email);
              setSavedText("");
            }}
          >
            고정 풀기
          </button>
        </div>
      </div>
      <p className={classes.time}>
        문자에 마우스를 가져다 대면 글자가 입력됩니다! gbs.s******@ggh.goe.go.kr
        형식으로 입력해 주세요!
        <br></br>
        개발자의 힌트: {timeLeft}초 안에 글자가 섞입니다!<br></br>
        <br></br>
        +개발자의 게으름으로 인해 백스페이스 버튼이 없사오니 실수가 나면
        '지우기' 버튼을 통해 모든 텍스트를 지우셔야 합니다^^
      </p>
      <div className={classes.keyboard}>
        {Hangeul.split("").map((e) => (
          <button type="button" onMouseEnter={() => type(e)} key={e}>
            {e}
          </button>
        ))}
      </div>
      <button
        className={classes.delete}
        type="button"
        onMouseEnter={() => type("delete")}
      >
        지우기
      </button>
      <div className={classes.control}>
        <button
          className={`btn-flat ${classes["first-layer"]} ${
            show ? classes.down : ""
          }`}
          onClick={clickhandler}
        >
          넘어가기
        </button>
        <button
          className={`btn-flat ${classes["second-layer"]}`}
          disabled={isDisabled}
          onClick={submitHandler}
        >
          ㅋㅋㅋㅋ
        </button>
      </div>
    </main>
  );
};

export default EmailPage;
