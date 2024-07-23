import { useContext, useEffect, useState } from "react";
import classes from "./email_page.module.scss";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../components/context/context";
import { useNotification } from "../components/notification/NotificationProvider";

const json: any = require("../components/context/data.json");

const original_3rd_grade_list = [
  "강덕윤",
  "강민후",
  "강준호",
  "강현민",
  "공진",
  "곽경욱",
  "김경린",
  "김규림",
  "김규현",
  "김동혁",
  "김두영",
  "김민구",
  "김민규",
  "김민석",
  "김민재",
  "김서호",
  "김세현",
  "김승연",
  "김시우",
  "김연준",
  "김윤",
  "김은수",
  "김정헌",
  "김주윤",
  "김주한",
  "김주해",
  "김지원",
  "김지한",
  "김청아",
  "김하루",
  "김현민",
  "김형원",
  "노경민",
  "라진우",
  "문정원",
  "문찬희",
  "박건욱",
  "박건희",
  "박선용",
  "박성현",
  "박세웅",
  "박세준",
  "박승규",
  "박연우",
  "박종현",
  "박종현",
  "박준하",
  "박준혁",
  "박혜원",
  "서명원",
  "서윤아",
  "송민준",
  "송하엘",
  "신주원",
  "신주현",
  "신희찬",
  "안재형",
  "오태양",
  "오현택",
  "우현욱",
  "이동욱",
  "이동혁",
  "이명제",
  "이상현",
  "이서준",
  "이성준",
  "이세환",
  "이승민",
  "이윤수",
  "이윤호",
  "이재아",
  "이종현",
  "이주형",
  "이한진",
  "이현석",
  "이형준",
  "임휘묵",
  "장서영",
  "장연수",
  "장차웅",
  "전서한",
  "정용환",
  "정우영",
  "정우재",
  "정준상",
  "정지훈",
  "조민서",
  "조민정",
  "조민혁",
  "차민재",
  "최서원",
  "최영빈",
  "최정우",
  "최진혁",
  "최현규",
  "한예원",
  "함성준",
  "홍세호",
  "황보철준",
  "황의찬",
];

const shuffle = (str: string) =>
  str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

const shuffleTime = 60;

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
    }, 5000);
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
    const num =
      studentNumber[0] === "3"
        ? original_3rd_grade_list.indexOf(json[studentNumber])
        : Object.keys(json)
            .filter((x) => x[0] === studentNumber[0])
            .indexOf(studentNumber);

    const correctEmail = `gbs.s2${(
      5 - parseInt(studentNumber[0])
    ).toString()}00${num + 1}@ggh.goe.go.kr`;

    if (savedText + email === correctEmail || savedText + email === "p") {
      navigate("/dorm-room");
      localStorage.setItem("email", correctEmail);
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
